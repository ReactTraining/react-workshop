import { get } from "./utils";
import * as storage from "YesterTech/localStorage";

// We use local storage to simulate the fact that these promise-based
// function calls would really be talking to a server that would probably
// set a session or JWT

export async function login(username: string, password: string): Promise<any> {
  const results = await get(`/users?username=${username}&password=${password}`);
  if (results.length > 0) {
    const user = results[0];
    delete user.password;
    storage.login(user);
    return user;
  } else {
    return Promise.reject("User not found");
  }
}

export function getAuthenticatedUser(): Promise<any> {
  // In real life this would talk to the server
  const user = storage.getAuthenticatedUser();
  return Promise.resolve(user);
}

export function logout(): Promise<any> {
  // In real life this would talk to the server
  storage.logout();
  return Promise.resolve();
}

export async function getGitHubUser(username: string): Promise<any> {
  const res = await fetch(`https://api.github.com/users/${username}`);
  return await res.json();
}
