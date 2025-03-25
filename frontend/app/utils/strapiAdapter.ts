/**
 * Adapter utilities for handling different Strapi response formats
 */

/**
 * Normalized post structure
 */
export interface NormalizedPost {
  id: string | number;
  title: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
}

/**
 * Generic Strapi response types
 */
interface StrapiAttributes {
  title?: string;
  Title?: string; 
  name?: string;
  content?: string;
  description?: string;
  body?: string;
  text?: string;
  publishedAt?: string;
  published_at?: string;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
  [key: string]: any;
}

interface StrapiPost {
  id?: string | number;
  _id?: string | number;
  attributes?: StrapiAttributes;
  data?: any;
  title?: string;
  Title?: string; 
  name?: string;
  content?: string;
  description?: string;
  body?: string;
  text?: string;
  publishedAt?: string;
  published_at?: string;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
  documentId?: string; 
  [key: string]: any;
}

interface StrapiResponseWithData {
  data: StrapiPost[] | StrapiPost;
  meta?: any;
  [key: string]: any;
}

interface StrapiResponseWithPosts {
  posts: StrapiPost[];
  [key: string]: any;
}

type StrapiResponse = StrapiResponseWithData | StrapiResponseWithPosts | StrapiPost;

/**
 * Normalizes a Strapi post from different possible formats into a consistent structure
 * @param post The post data from Strapi API
 * @returns A normalized post object or null if the post can't be normalized
 */
export function normalizePost(post: StrapiPost | null | undefined): NormalizedPost | null {
  if (!post) return null;
  
  // Log the post structure for debugging
  console.log('Normalizing post structure:', post);
  
  try {
    // Case 1: Standard Strapi v4 format with attributes
    if (post.id && post.attributes) {
      const { attributes } = post;
      
      // Check if we have the required fields
      if ((attributes.title || attributes.Title) && (attributes.content || attributes.description || attributes.body)) {
        return {
          id: post.id,
          title: attributes.title || attributes.Title || '',
          content: attributes.content || attributes.description || attributes.body || '',
          publishedAt: attributes.publishedAt || attributes.published_at || attributes.createdAt || new Date().toISOString(),
          updatedAt: attributes.updatedAt || attributes.updated_at || new Date().toISOString()
        };
      }
    }
    
    // Case 2: Direct properties (no attributes wrapper)
    if (post.id && (post.title || post.Title || post.name) && (post.content || post.description || post.body)) {
      return {
        id: post.id,
        title: post.title || post.Title || post.name || 'Untitled',
        content: post.content || post.description || post.body || '',
        publishedAt: post.publishedAt || post.published_at || post.createdAt || new Date().toISOString(),
        updatedAt: post.updatedAt || post.updated_at || new Date().toISOString()
      };
    }
    
    // Case 3: Nested data structure
    if (post.data && post.data.id) {
      return normalizePost(post.data);
    }
    
    // Case 4: Custom structure - try to extract what we can
    const id = post.id || post._id;
    const title = post.title || post.Title || post.name || post.heading || post.subject;
    const content = post.content || post.description || post.body || post.text;
    
    if (id && (title || content)) {
      return {
        id,
        title: title || 'Untitled',
        content: content || '',
        publishedAt: post.publishedAt || post.published_at || post.createdAt || new Date().toISOString(),
        updatedAt: post.updatedAt || post.updated_at || post.createdAt || new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('Error normalizing post:', error);
  }
  
  // If we can't normalize the post, return null
  return null;
}

/**
 * Type guard to check if a value is a NormalizedPost
 */
function isNormalizedPost(post: NormalizedPost | null): post is NormalizedPost {
  return post !== null;
}

/**
 * Type guard to check if the response has a data property
 */
function hasDataProperty(response: any): response is StrapiResponseWithData {
  return response && typeof response === 'object' && 'data' in response;
}

/**
 * Type guard to check if the response has a posts property
 */
function hasPostsProperty(response: any): response is StrapiResponseWithPosts {
  return response && typeof response === 'object' && 'posts' in response;
}

/**
 * Normalizes an array of posts from Strapi
 * @param data The data from Strapi API
 * @returns Array of normalized posts
 */
export function normalizePosts(data: any): NormalizedPost[] {
  if (!data) return [];
  
  // Log the data structure for debugging
  console.log('Normalizing data structure:', data);
  
  try {
    // Case 1: Standard Strapi v4 format with data array
    if (hasDataProperty(data) && Array.isArray(data.data)) {
      return data.data
        .map((post: StrapiPost) => normalizePost(post))
        .filter(isNormalizedPost);
    }
    
    // Case 2: Direct array of posts
    if (Array.isArray(data)) {
      return data
        .map((post: StrapiPost) => normalizePost(post))
        .filter(isNormalizedPost);
    }
    
    // Case 3: Single post object
    if (hasDataProperty(data) && !Array.isArray(data.data)) {
      const singlePost = normalizePost(data.data as StrapiPost);
      if (singlePost) {
        return [singlePost];
      }
    } else {
      const singlePost = normalizePost(data as StrapiPost);
      if (singlePost) {
        return [singlePost];
      }
    }
    
    // Case 4: Nested data structure
    if (hasPostsProperty(data) && Array.isArray(data.posts)) {
      return data.posts
        .map((post: StrapiPost) => normalizePost(post))
        .filter(isNormalizedPost);
    }
  } catch (error) {
    console.error('Error normalizing posts:', error);
  }
  
  return [];
}
