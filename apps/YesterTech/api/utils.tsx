// Database API served by `json-server`
const baseURL = "http://localhost:3333";

export async function get<T = any>(path: string): Promise<T> {
  const res = await fetch(`${baseURL}${path}`);
  return await res.json();
}

export async function getRaw(path: string): Promise<Response> {
  return await fetch(`${baseURL}${path}`);
}

export async function post<T>(path: string, data: any): Promise<T> {
  const res = await fetch(`${baseURL}${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}
