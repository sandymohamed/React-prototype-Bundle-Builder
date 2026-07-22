// src/api/client.ts
import type { ApiResponse, ApiError, HttpMethod } from '../types/api';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;

  constructor(baseUrl: string = '/api', defaultTimeout: number = 5000) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = defaultTimeout;
  }

  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', body, headers = {}, timeout = this.defaultTimeout } = options;

    // Simulate network delay
    await this.simulateDelay(300);

    // Get mock data
    try {
      const data = await this.getMockData<T>(endpoint, method, body);
      
      return {
        data,
        status: 200,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private async getMockData<T>(
    endpoint: string,
    method: HttpMethod,
    body?: unknown,
  ): Promise<T> {
    // Map endpoints to mock data modules
    const endpointMap: Record<string, () => Promise<unknown>> = {
      "GET /products": () =>
        import("./endpoints/products").then((m) => m.getProducts()),
      "GET /products/category": () =>
        import("./endpoints/products").then((m) =>
          m.getProductsByCategory('') // Pass empty string as default
        ),
      "GET /bundle/state": () =>
        import("./endpoints/bundle").then((m) => m.getBundleState()),
      "POST /bundle/save": () =>
        import("./endpoints/bundle").then((m) =>
          m.saveBundleState({ currentStep: 1, selectedItems: [] }) // Provide default state
        ),
    };

    // For dynamic endpoints with query params
    const baseEndpoint = endpoint.split('?')[0];
    const key = `${method} ${baseEndpoint}`;
    let handler = endpointMap[key];

    // If no exact match, try to find a pattern match
    if (!handler) {
      // Handle GET /products/category/xxx pattern
      if (method === 'GET' && baseEndpoint.startsWith('/products/category/')) {
        const category = baseEndpoint.split('/').pop() || '';
        handler = () =>
          import("./endpoints/products").then((m) =>
            m.getProductsByCategory(category)
          );
      }
    }

    if (!handler) {
      throw new Error(`No mock handler found for ${method} ${endpoint}`);
    }

    return (await handler()) as T;
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        code: 'API_ERROR',
        message: error.message,
        status: 500,
      };
    }
    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred',
      status: 500,
    };
  }

  // Convenience methods
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  async patch<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();