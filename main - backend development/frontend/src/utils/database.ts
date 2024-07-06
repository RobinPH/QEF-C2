import axios from "axios";
import { SanitizedUser } from "../types";

export const instance = axios.create({
  baseURL: "http://localhost:5050",
  timeout: 10 * 1000,
});

export const getAllUsers = async () => {
  const response = await instance.get<SanitizedUser[]>("/users");

  return response.data;
};
