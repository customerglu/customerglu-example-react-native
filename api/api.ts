interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  let response: HttpResponse<T>;
  try {
    response = await fetch(request);
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1)
      response.parsedBody = await response.json();
  } catch (ex) {
    throw new Error("Error Occurred");
  }
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export async function post<T>(
  path: string,
  body: any,
  token?: string
): Promise<HttpResponse<T>> {
  let args: RequestInit = {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    args.headers = { authorization: `Bearer ${token}`, ...args.headers };
  }
  return await http<T>(new Request(path, args));
}

export async function get<T>(
  path: string,
  token?: string
): Promise<HttpResponse<T>> {
  const args: RequestInit = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    args.headers = { authorization: `Bearer ${token}`, ...args.headers };
  }
  return await http<T>(new Request(path, args));
}
