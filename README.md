# Next.js and Strapi CMS Project

This project consists of a Next.js frontend application and a Strapi CMS backend.

## Project Structure

```
/
├── frontend/     # Next.js application
└── backend/      # Strapi CMS
```

## Getting Started

### Frontend (Next.js)

To run the Next.js application:

```bash
cd frontend
npm run dev
```

The frontend will be available at http://localhost:3000

### Backend (Strapi CMS)

To run the Strapi CMS:

```bash
cd backend
npm run develop
```

The Strapi admin panel will be available at http://localhost:1337/admin

## Authentication with Strapi

This project uses token-based authentication to access the Strapi API. The API token has been configured in the frontend application.

If you need to update the API token:

1. Edit the file at `frontend/app/config/strapi.ts`
2. Update the `apiToken` value with your new token

## Connecting Next.js to Strapi

The Next.js application is already configured to fetch data from Strapi using the API token for authentication. The API service is set up to try multiple possible content type endpoints.

Example of how the connection works:

```javascript
// In frontend/app/services/api.ts
export async function fetchContentType(type, params, options) {
  // This function tries multiple endpoints (posts, post, articles, etc.)
  // and uses authentication headers automatically
}

// In your components
const data = await fetchContentType('posts');
```

## Content Types

For this application to work properly, you need to create appropriate content types in Strapi. See the `STRAPI-SETUP-GUIDE.md` file for detailed instructions.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io)
