# Strapi Setup Guide

This guide will help you set up your Strapi CMS to work with the Next.js frontend.

## 1. Create the Post Content Type

1. Open the Strapi admin panel at http://localhost:1337/admin
2. Go to "Content-Type Builder" in the left sidebar
3. Click "Create new collection type"
4. Enter "Post" as the Display name (Strapi will automatically create the API name as "post")
5. Add the following fields:
   - Field type: Text (Short text)
   - Name: title
   - Click "Add another field"
   - Field type: Rich text or Text (Long text)
   - Name: content
6. Click "Save" to create the content type

## 2. Create Landing Page Content Types

### Hero Section (Updated)
1. Go to "Content-Type Builder" in the left sidebar
2. Click "Create new single type" (since you'll only have one hero section)
3. Enter "Hero" as the Display name
4. Add the following fields:
   - Field type: Text (Short text)
   - Name: title
   - Field type: Text (Short text)
   - Name: subtitle
   - Field type: Text (Long text)
   - Name: description
   - Field type: Text (Short text)
   - Name: ctaText
   - Field type: Text (Short text)
   - Name: ctaUrl
   - Field type: Media (single media)
   - Name: heroImage
5. Click "Save" to create the content type

### Animated Scroll Section (Updated)
1. Go to "Content-Type Builder" in the left sidebar
2. Click "Create new single type"
3. Enter "AnimatedScroll" as the Display name
4. Add the following fields:
   - Field type: Text (Short text)
   - Name: heading
   - Field type: Text (Long text)
   - Name: subtitle
   - Field type: Text (Long text)
   - Name: secondarySubtitle (appears after the vertical line animation)
5. Click "Save" to create the content type

### Service Cards (Bento Grid)
1. Go to "Content-Type Builder" in the left sidebar
2. Click "Create new collection type" (since you'll have multiple services)
3. Enter "Service" as the Display name
4. Add the following fields:
   - Field type: Text (Short text)
   - Name: title
   - Field type: Text (Short text)
   - Name: subtitle
   - Field type: Text (Long text)
   - Name: description
   - Field type: Media (single media)
   - Name: image
   - Field type: Boolean
   - Name: featured
   - Field type: Number (integer)
   - Name: order (to control the display order)
5. Click "Save" to create the content type

### About Section
1. Go to "Content-Type Builder" in the left sidebar
2. Click "Create new single type"
3. Enter "About" as the Display name
4. Add the following fields:
   - Field type: Text (Short text)
   - Name: title
   - Field type: Text (Short text)
   - Name: subtitle
   - Field type: Rich text
   - Name: content
   - Field type: Media (single media)
   - Name: image
   - Field type: Repeatable Component
   - Name: benefits
   - Create new component:
     - Name: Benefit
     - Fields:
       - Field type: Text (Short text)
       - Name: text
5. Click "Save" to create the content type

### Target Audience Sections (For Her/For Him)
1. Go to "Content-Type Builder" in the left sidebar
2. Click "Create new collection type"
3. Enter "TargetAudience" as the Display name
4. Add the following fields:
   - Field type: Text (Short text)
   - Name: title
   - Field type: Text (Short text)
   - Name: subtitle
   - Field type: Rich text
   - Name: content
   - Field type: Text (Short text)
   - Name: ctaText
   - Field type: Text (Short text)
   - Name: ctaUrl
   - Field type: Media (single media)
   - Name: image
   - Field type: Text (Short text)
   - Name: audienceType (values: "men", "women")
   - Field type: Repeatable Component
   - Name: benefits
   - Use existing component: Benefit
5. Click "Save" to create the content type

### Testimonials
1. Go to "Content-Type Builder" in the left sidebar
2. Click "Create new collection type"
3. Enter "Testimonial" as the Display name
4. Add the following fields:
   - Field type: Text (Short text)
   - Name: name
   - Field type: Text (Short text)
   - Name: title
   - Field type: Text (Long text)
   - Name: quote
   - Field type: Media (single media)
   - Name: avatar
   - Field type: Number (integer)
   - Name: rating (1-5)
5. Click "Save" to create the content type

### Global Settings
1. Go to "Content-Type Builder" in the left sidebar
2. Click "Create new single type"
3. Enter "Global" as the Display name
4. Add the following fields:
   - Field type: Text (Short text)
   - Name: siteName
   - Field type: Media (single media)
   - Name: logo
   - Field type: Text (Short text)
   - Name: footerText
   - Field type: JSON
   - Name: socialLinks (to store social media links)
5. Click "Save" to create the content type

## 3. Configure Permissions (IMPORTANT)

For your frontend to access the Strapi API, you need to set the correct permissions:

1. Go to "Settings" in the bottom of the left sidebar
2. Click on "Roles" under "Users & Permissions plugin"
3. Click on the "Public" role
4. In the permissions section, find all your content types (Post, Hero, Service, etc.)
5. Check the following permissions for each:
   - find (to list all items)
   - findOne (to get a single item)
6. Click "Save" to apply the permissions

## 4. API Token Authentication (IMPORTANT)

To secure your API and allow authenticated access:

1. Go to "Settings" in the left sidebar
2. Click on "API Tokens" under "Global Settings"
3. Click "Create new API Token"
4. Fill in the details:
   - Name: A descriptive name like "Frontend Access"
   - Description: Optional description
   - Token duration: Choose based on your needs (e.g., "Unlimited")
   - Token type: "Full access" or "Custom" based on your security requirements
5. Click "Save" to generate the token
6. Copy the generated token and update it in your frontend application:
   - Open `frontend/app/config/strapi.ts`
   - Update the `apiToken` value with your new token

## 5. Testing the API

You can test if your API is working correctly by visiting:
- http://localhost:1337/api/posts
- http://localhost:1337/api/hero
- http://localhost:1337/api/services
- http://localhost:1337/api/global

Or using curl with your token:
```bash
curl -X GET http://localhost:1337/api/posts -H "Authorization: bearer YOUR_API_TOKEN"
```

You should see a JSON response with your data.

## 6. Troubleshooting

If you're still having issues:

1. Check that Strapi is running
2. Verify that the content type name is correct (Post or post)
3. Make sure you've published your content
4. Confirm that the permissions are set correctly
5. Verify your API token is valid and properly configured
6. Check the browser console for detailed error messages
7. Restart both Strapi and Next.js servers if needed

## 7. API Structure

Strapi v4 uses the following API structure:

- List all posts: `/api/posts`
- Get a single post: `/api/posts/:id`
- With query parameters: `/api/posts?populate=*&sort=createdAt:desc`

For more information, refer to the [Strapi documentation](https://docs.strapi.io/dev-docs/api/rest)
