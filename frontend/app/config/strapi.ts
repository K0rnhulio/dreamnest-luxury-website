/**
 * Strapi Configuration
 * 
 * This file contains configuration for connecting to the Strapi CMS backend.
 */
import { ContentType } from '../services/api';

export const STRAPI_CONFIG = {
  // Base URL for Strapi API
  baseUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337',
  
  // API prefix (typically /api)
  apiPrefix: '/api',
  
  // Content type names to try (in order of preference)
  contentTypes: {
    posts: ['posts', 'post', 'articles', 'article', 'blogs', 'blog'],
    services: ["services", "service"],
    hero: ["hero", "heroes", "homepage-hero"],
    features: ["features", "feature-section"],
    global: ["global", "globals", "global-settings"],
    testimonials: ["testimonials", "testimonial-section"],
    testimonial: ["testimonial", "testimonials-item", "testimonial-item"],
    about: ["about", "about-me", "about-section"],
    forMen: ["for-men", "men", "for-him"],
    forWomen: ["for-women", "women", "for-her"],
    featuredServices: ["featured-services", "featured-service", "horizontal-services"],
    scrollIntro: ["scroll-intro", "scroll-section", "intro-section"]
  },
  
  // API endpoints
  endpoints: {
    singleType: '/api/{contentType}',
    collectionType: '/api/{contentType}',
  },
  
  // Default query parameters for different content types
  defaultQueryParams: {
    posts: { 'populate': '*', 'sort': 'publishedAt:desc' },
    services: { 'populate': '*' },
    hero: { 'populate': '*' },
    about: { 'populate': '*' },
    testimonials: { 'populate': '*' },
    testimonial: { 'populate': '*' },
    features: { 'populate': '*' },
    global: { 'populate': '*' },
    forMen: { 'populate': '*' },
    forWomen: { 'populate': '*' },
    featuredServices: { 'populate': '*' },
    scrollIntro: { 'populate': '*' },
  },
  
  // Authentication token (if needed)
  token: '256081697fcf244d728f21d91f06dea8036a317d0d7a8272ca0d5aeb7f3bd70830a444b574ceb86271e229659c26f21e475322418b37f9ca329825bf2365629c556d10affdb1b9e9955793b5e428664b04b7c8d4d269e07e3cc9f21867dca893a5bfe00d6cd16a865b7f3cc570ade0ca6c2ff55db9143b90b9e173923dda85b1',
};

/**
 * Get the base Strapi URL
 * @returns Base URL for Strapi
 */
export function getStrapiUrl(path = ''): string {
  return `${STRAPI_CONFIG.baseUrl}${path}`;
}

/**
 * Get the endpoint for a specific content type
 * @param type Content type
 * @param index Index in the content type array
 * @returns API endpoint for the content type
 */
export function getContentTypeEndpoint(type: ContentType, index = 0): string {
  const contentTypes = STRAPI_CONFIG.contentTypes[type];
  if (!contentTypes || !contentTypes[index]) {
    throw new Error(`Invalid content type or index: ${type}[${index}]`);
  }
  
  const contentType = contentTypes[index];
  const endpoint = STRAPI_CONFIG.endpoints.collectionType.replace('{contentType}', contentType);
  return endpoint;
}

/**
 * Get default query parameters for a content type
 * @param type Content type
 * @returns Default query parameters
 */
export function getDefaultQueryParams(type: ContentType): Record<string, string> {
  return STRAPI_CONFIG.defaultQueryParams[type] || { 'populate': '*' };
}

/**
 * Get authentication headers for Strapi API requests
 * @returns Headers object with authentication
 */
export function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (STRAPI_CONFIG.token) {
    headers['Authorization'] = `Bearer ${STRAPI_CONFIG.token}`;
  }
  
  return headers;
}

/**
 * Format Strapi response data
 * @param data Raw Strapi response
 * @returns Formatted data
 */
export function formatStrapiResponse(data: any) {
  if (!data) return null;
  
  // Handle collection type responses (array of items)
  if (Array.isArray(data.data)) {
    return data.data.map((item: any) => formatStrapiItem(item));
  }
  
  // Handle single type responses
  if (data.data) {
    return formatStrapiItem(data.data);
  }
  
  // Return as is if already formatted or in unexpected format
  return data;
}

/**
 * Format a single Strapi item
 * @param item Strapi item
 * @returns Formatted item
 */
function formatStrapiItem(item: any) {
  if (!item) return null;
  
  // Extract attributes
  const formatted = item.attributes ? { id: item.id, ...item.attributes } : item;
  
  // Process nested relationships
  Object.keys(formatted).forEach(key => {
    if (formatted[key] && formatted[key].data) {
      formatted[key] = formatStrapiResponse({ data: formatted[key].data });
    }
  });
  
  return formatted;
}
