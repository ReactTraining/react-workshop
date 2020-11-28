import { post, get } from "./utils";
import { UserNoId, User } from "YesterTech/types";

export async function registerUser(data: UserNoId): Promise<User> {
  return await post<User>(`/users`, data);
}

export function getUser(userId: number): Promise<User> {
  return get(`/users/${userId}`);
}
