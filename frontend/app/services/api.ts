/**
 * API Service
 * 
 * This file contains functions for interacting with the Strapi API.
 */
import { 
  getStrapiUrl, 
  getContentTypeEndpoint, 
  getDefaultQueryParams, 
  getAuthHeaders,
  formatStrapiResponse,
  STRAPI_CONFIG
} from '../config/strapi';

// Cache for API responses
const apiCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Content type mapping
export type ContentType = keyof typeof STRAPI_CONFIG.contentTypes;

/**
 * Fetch data from the Strapi API
 * @param endpoint API endpoint
 * @param options Fetch options
 * @returns Response data
 */
export async function fetchAPI(
  endpoint: string,
  options: RequestInit = {},
  useCache = true,
  cacheDuration = CACHE_DURATION
): Promise<any> {
  // Check cache first if caching is enabled
  const cacheKey = `${endpoint}:${JSON.stringify(options)}`;
  if (useCache) {
    const cached = apiCache.get(cacheKey);
    const now = Date.now();
    if (cached && now - cached.timestamp < cacheDuration) {
      return cached.data;
    }
  }

  // Prepare URL and options
  const url = getStrapiUrl(endpoint);
  const mergedOptions = {
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  };

  try {
    // Make the API request
    const response = await fetch(url, mergedOptions);
    
    // Handle response status
    if (!response.ok) {
      // Try to get error details from response
      let errorDetails = '';
      try {
        const errorData = await response.json();
        errorDetails = errorData.error?.message || JSON.stringify(errorData);
      } catch (e) {
        errorDetails = `Status: ${response.status} ${response.statusText}`;
      }
      
      throw new Error(`API error: ${errorDetails}`);
    }

    // Parse response data
    const data = await response.json();
    const formattedData = formatStrapiResponse(data);
    
    // Cache the response if caching is enabled
    if (useCache) {
      apiCache.set(cacheKey, { data: formattedData, timestamp: Date.now() });
    }
    
    return formattedData;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Fetch a collection type from Strapi
 * @param type Content type
 * @param params Query parameters
 * @returns Collection data
 */
export async function fetchCollection<T = any>(
  type: ContentType,
  params: Record<string, any> = {},
  useCache = true
): Promise<T[]> {
  // Try each possible content type name in order
  const contentTypes = STRAPI_CONFIG.contentTypes[type];
  let lastError: Error | null = null;
  
  for (let i = 0; i < contentTypes.length; i++) {
    try {
      const endpoint = getContentTypeEndpoint(type, i);
      const defaultParams = getDefaultQueryParams(type);
      const queryParams = new URLSearchParams({
        ...defaultParams,
        ...params,
      });
      
      const fullEndpoint = `${endpoint}?${queryParams.toString()}`;
      return await fetchAPI(fullEndpoint, {}, useCache);
    } catch (error) {
      lastError = error as Error;
      // Continue to the next content type if this one failed
      continue;
    }
  }
  
  // If we've tried all content types and none worked, throw the last error
  throw lastError || new Error(`Failed to fetch collection: ${type}`);
}

/**
 * Fetch a single type from Strapi
 * @param type Content type
 * @param params Query parameters
 * @returns Single type data
 */
export async function fetchSingleType<T = any>(
  type: ContentType,
  params: Record<string, any> = {},
  useCache = true
): Promise<T> {
  // Try each possible content type name in order
  const contentTypes = STRAPI_CONFIG.contentTypes[type];
  let lastError: Error | null = null;
  
  for (let i = 0; i < contentTypes.length; i++) {
    try {
      const endpoint = getContentTypeEndpoint(type, i);
      const defaultParams = getDefaultQueryParams(type);
      const queryParams = new URLSearchParams({
        ...defaultParams,
        ...params,
      });
      
      const fullEndpoint = `${endpoint}?${queryParams.toString()}`;
      return await fetchAPI(fullEndpoint, {}, useCache);
    } catch (error) {
      lastError = error as Error;
      // Continue to the next content type if this one failed
      continue;
    }
  }
  
  // If we've tried all content types and none worked, throw the last error
  throw lastError || new Error(`Failed to fetch single type: ${type}`);
}

/**
 * Check Strapi connection status
 * @returns Connection status and available content types
 */
export async function checkStrapiConnection(): Promise<{
  status: 'connected' | 'error';
  message: string;
  contentTypes?: string[];
}> {
  try {
    // First try to access the Strapi health endpoint
    const healthUrl = `/admin/health`;
    let response;
    
    try {
      response = await fetch(getStrapiUrl(healthUrl), {
        headers: getAuthHeaders(),
        method: 'GET',
      });
      
      if (response.ok) {
        // If health check passes, try to get content types
        const contentTypes = Object.keys(STRAPI_CONFIG.contentTypes);
        
        return {
          status: 'connected',
          message: 'Successfully connected to Strapi API.',
          contentTypes
        };
      }
    } catch (healthError) {
      console.log('Health check failed, trying alternative endpoint');
    }
    
    // If health check fails, try the admin endpoint
    try {
      response = await fetch(getStrapiUrl('/admin'), {
        method: 'GET',
      });
      
      if (response.ok) {
        return {
          status: 'connected',
          message: 'Connected to Strapi admin, but API access may be limited. Check API token and permissions.',
          contentTypes: Object.keys(STRAPI_CONFIG.contentTypes)
        };
      }
    } catch (adminError) {
      console.log('Admin endpoint check failed');
    }
    
    // As a last resort, try a specific content type
    try {
      // Try each content type until one works
      for (const type of Object.keys(STRAPI_CONFIG.contentTypes) as ContentType[]) {
        try {
          const endpoint = getContentTypeEndpoint(type);
          const testResponse = await fetch(getStrapiUrl(endpoint), {
            headers: getAuthHeaders(),
            method: 'GET',
          });
          
          if (testResponse.ok) {
            return {
              status: 'connected',
              message: `Connected to Strapi API via ${type} endpoint.`,
              contentTypes: Object.keys(STRAPI_CONFIG.contentTypes)
            };
          }
        } catch (typeError) {
          continue;
        }
      }
    } catch (contentError) {
      // Failed all content type checks
    }
    
    // If we get here, we couldn't connect to any endpoint
    throw new Error(`Cannot connect to Strapi API. Server may be running but API endpoints are not accessible.`);
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Clear the API cache
 * @param endpoint Optional specific endpoint to clear
 */
export function clearApiCache(endpoint?: string): void {
  if (endpoint) {
    // Clear specific endpoint cache
    for (const key of apiCache.keys()) {
      if (key.startsWith(endpoint)) {
        apiCache.delete(key);
      }
    }
  } else {
    // Clear all cache
    apiCache.clear();
  }
}
