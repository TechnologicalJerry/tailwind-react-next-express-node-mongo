const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

interface RequestOptions<BodyType = unknown> {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: BodyType;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<TResponse, TBody = unknown>(
    endpoint: string,
    options: RequestOptions<TBody> = {}
  ): Promise<TResponse> {
    const { method = "GET", headers = {}, body } = options;

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body !== undefined) {
      config.body = JSON.stringify(body);
    }

    // Attach token from cookie (browser only)
    if (typeof window !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth-token="))
        ?.split("=")[1];

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, config);

    if (!response.ok) {
      let message = "An error occurred";

      try {
        const errorJson = (await response.json()) as { message?: string };
        if (errorJson?.message) message = errorJson.message;
      } catch {
        // ignore json parse errors
      }

      throw new Error(message);
    }

    return (await response.json()) as TResponse;
  }

  async get<TResponse>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    return this.request<TResponse>(endpoint, { method: "GET", headers });
  }

  async post<TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>(endpoint, {
      method: "POST",
      body,
      headers,
    });
  }

  async put<TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>(endpoint, {
      method: "PUT",
      body,
      headers,
    });
  }

  async patch<TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>(endpoint, {
      method: "PATCH",
      body,
      headers,
    });
  }

  async delete<TResponse>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    return this.request<TResponse>(endpoint, { method: "DELETE", headers });
  }
}

export const apiService = new ApiService(API_BASE_URL);
