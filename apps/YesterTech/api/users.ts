import { post, get } from "./utils";
import { UserNoId, User } from "YesterTech/types";

export function registerUser(data: UserNoId) {
  return post(`/users`, data);
}

export function getUser(userId: number): Promise<User> {
  return get(`/users/${userId}`);
}
