/**
 * API fetch wrapper that automatically injects the authentication token.
 * The token is expected to be stored in localStorage under the key 'authToken'.
 */

interface ApiFetchOptions extends RequestInit {
  /** Optional token to override the one from storage */
  token?: string;
}

/**
 * Wrapper around fetch that injects the Authorization header.
 *
 * @param input - The URL or Request object.
 * @param init - Optional fetch options. If a token is provided in `init.token`,
 *   it will be used; otherwise the token from localStorage is used.
 * @returns A Promise that resolves to the Response.
 */
export async function apiFetch(input: RequestInfo | URL, init: ApiFetchOptions = {}): Promise<Response> {
  const { token: providedToken, ...fetchOptions } = init;

  // Retrieve token from storage if not provided explicitly
  const token = providedToken ?? (typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null);

  // Prepare headers
  const headers = new Headers(fetchOptions.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Ensure we send JSON by default if Content-Type not set and body is an object
  if (fetchOptions.body && typeof fetchOptions.body === 'object' && !(fetchOptions.body instanceof FormData)) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  const options: RequestInit = {
    ...fetchOptions,
    headers,
  };

  return fetch(input, options);
}

/**
 * Helper to set the auth token in localStorage.
 */
export function setAuthToken(token: string | null): void {
  if (typeof localStorage !== 'undefined') {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }
}

/**
 * Helper to get the current auth token.
 */
export function getAuthToken(): string | null {
  return typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
}