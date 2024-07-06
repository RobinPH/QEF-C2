import dotenv from "dotenv";
import express, { type Request } from "express";
import { LRUCache } from "lru-cache";
import path from "node:path";

type News = {
  title: string;
  description: string;
  author: string;
  publicationTime: string;
  url: string;
};

const news = require("./news.json") as News[];

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const PUBLIC_DIST = "./public";

app.use(express.static(PUBLIC_DIST));

app.get("/", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIST, "index.html"));
});

const cache = new LRUCache<string, News[]>({
  max: 1024,
});

app.get(
  "/search",
  async (
    req: Request<
      {},
      {},
      {},
      {
        keyword?: string;
      }
    >,
    res
  ) => {
    const { keyword } = req.query;

    if (keyword == null) {
      return res.status(400).json({
        success: false,
        message: `Parameter "keyword" not found in the query string`,
      });
    }

    if (typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: `Invalid type of query parameter "keyword"`,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        news: search(keyword),
      },
    });
  }
);

const search = (keyword: string) => {
  const key = keyword.toLowerCase();

  if (cache.has(key)) {
    return cache.get(key);
  }

  const matcher = (text: string) => {
    return text.toLowerCase().includes(key);
  };

  const matchedNews = news.filter(
    (news) =>
      matcher(news.title) || matcher(news.description) || matcher(news.author)
  );

  cache.set(key, matchedNews);

  return matchedNews;
};

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
