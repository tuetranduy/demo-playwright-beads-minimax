import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { apiConfig } from '../config/config';

export interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

/**
 * API Helper - Utilities for REST API testing
 */
export class APIHelper {
  private requestContext: APIRequestContext;
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = apiConfig.baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(apiConfig.apiKey && { Authorization: `Bearer ${apiConfig.apiKey}` }),
    };
  }

  /**
   * Create request context
   */
  async createContext(): Promise<void> {
    this.requestContext = await request.newContext({
      baseURL: this.baseURL,
      timeout: apiConfig.timeout,
    });
  }

  /**
   * Dispose request context
   */
  async disposeContext(): Promise<void> {
    if (this.requestContext) {
      await this.requestContext.dispose();
    }
  }

  /**
   * Get request context
   */
  getContext(): APIRequestContext {
    return this.requestContext;
  }

  /**
   * Execute API request
   */
  async executeRequest({
    method,
    endpoint,
    body,
    headers,
    params,
  }: RequestOptions): Promise<APIResponse> {
    const response = await this.requestContext[method.toLowerCase()](endpoint, {
      data: body,
      headers: { ...this.defaultHeaders, ...headers },
      params,
    });

    return response;
  }

  /**
   * GET request
   */
  async get(endpoint: string, params?: Record<string, string | number | boolean>): Promise<APIResponse> {
    return this.executeRequest({ method: 'GET', endpoint, params });
  }

  /**
   * POST request
   */
  async post(endpoint: string, body?: Record<string, unknown>): Promise<APIResponse> {
    return this.executeRequest({ method: 'POST', endpoint, body });
  }

  /**
   * PUT request
   */
  async put(endpoint: string, body?: Record<string, unknown>): Promise<APIResponse> {
    return this.executeRequest({ method: 'PUT', endpoint, body });
  }

  /**
   * PATCH request
   */
  async patch(endpoint: string, body?: Record<string, unknown>): Promise<APIResponse> {
    return this.executeRequest({ method: 'PATCH', endpoint, body });
  }

  /**
   * DELETE request
   */
  async delete(endpoint: string): Promise<APIResponse> {
    return this.executeRequest({ method: 'DELETE', endpoint });
  }

  /**
   * Verify response status
   */
  static verifyStatusCode(response: APIResponse, expectedStatus: number): void {
    expect(response.status()).toBe(expectedStatus);
  }

  /**
   * Verify response is successful (2xx)
   */
  static verifySuccess(response: APIResponse): void {
    expect(response.ok()).toBeTruthy();
  }

  /**
   * Verify response is client error (4xx)
   */
  static verifyClientError(response: APIResponse): void {
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
  }

  /**
   * Verify response is server error (5xx)
   */
  static verifyServerError(response: APIResponse): void {
    expect(response.status()).toBeGreaterThanOrEqual(500);
    expect(response.status()).toBeLessThan(600);
  }

  /**
   * Get response body as JSON
   */
  static async getResponseBody<T>(response: APIResponse): Promise<T> {
    return (await response.json()) as T;
  }

  /**
   * Get response headers
   */
  static getResponseHeaders(response: APIResponse): Record<string, string> {
    return response.headers();
  }

  /**
   * Get response time in milliseconds
   */
  static getResponseTime(response: APIResponse): number {
    return response.time();
  }

  /**
   * Verify response time is within limit
   */
  static verifyResponseTime(response: APIResponse, maxTime: number): void {
    expect(response.time()).toBeLessThanOrEqual(maxTime);
  }

  /**
   * Verify response contains specific field
   */
  static async verifyFieldInResponse<T>(
    response: APIResponse,
    field: string
  ): Promise<void> {
    const body = await this.getResponseBody<T>(response);
    expect(body).toHaveProperty(field);
  }

  /**
   * Verify response does not contain specific field
   */
  static async verifyFieldNotInResponse<T>(
    response: APIResponse,
    field: string
  ): Promise<void> {
    const body = await this.getResponseBody<T>(response);
    expect(body).not.toHaveProperty(field);
  }
}
