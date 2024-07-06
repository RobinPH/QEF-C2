import requests
from bs4 import BeautifulSoup
import json
from tqdm import tqdm


def main():
    news = []
    for page in tqdm(range(1, 18 + 1)):
        response = requests.get(
            f"https://www.sciencenews.org/topic/quantum-physics/page/{page}"
        )

        soup = BeautifulSoup(response.content, "html.parser")

        items = soup.select(".river-with-sidebar__list___5dLsp > li")

        for item in items:
            container = item.select_one(".post-item-river__content___ueKx3")
            title = container.select_one(".post-item-river__title___vyz1w").text.strip()
            url = container.select_one(".post-item-river__title___vyz1w a").attrs[
                "href"
            ]
            if description := container.select_one(".post-item-river__excerpt___SWLb7"):
                description = description.text.strip()
            else:
                description = ""
            author = container.select_one(
                ".post-item-river__byline___rf4-j.author.vcard"
            ).text.strip()
            published_at = container.select_one(
                ".post-item-river__date___9SCxt.entry-date.published"
            ).text.strip()

            news.append(
                {
                    "title": title,
                    "description": description,
                    "author": author,
                    "publicationTime": published_at,
                    "url": url,
                }
            )

        with open("./news.json", encoding="utf-8", mode="w") as f:
            f.write(json.dumps(news, indent=2))


if __name__ == "__main__":
    main()
