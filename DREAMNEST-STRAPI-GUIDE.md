# DreamNest Strapi Setup Guide

This guide will help you set up the content types in Strapi for your DreamNest personal brand website.

## 1. Create the Hero Content Type

1. Open the Strapi admin panel at http://localhost:1337/admin
2. Go to "Content-Type Builder" in the left sidebar
3. Click "Create new single type" (since you'll only have one hero section)
4. Enter "Hero" as the Display name
5. Add the following fields:
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
6. Click "Save" to create the content type

## 2. Create the About Content Type

1. Go to "Content-Type Builder" in the left sidebar
2. Click "Create new single type"
3. Enter "About" as the Display name
4. Add the following fields:
   - Field type: Text (Short text)
   - Name: title
   - Field type: Text (Short text)
   - Name: subtitle
   - Field type: Text (Long text)
   - Name: description
   - Field type: Media (single media)
   - Name: image
   - Field type: Relation
   - Name: specialties
   - Related Content Type: Create new collection type "Specialty"
   - Type: has many
5. Create the "Specialty" collection type with:
   - Field type: Text (Short text)
   - Name: name
6. Click "Save" to create both content types

## 3. Create the For Men Content Type

1. Go to "Content-Type Builder" in the left sidebar
2. Click "Create new single type"
3. Enter "For Men" as the Display name (this will create a content type with API ID "for-men")
4. Add the following fields:
   - Field type: Text (Short text)
   - Name: title
   - Field type: Text (Short text)
   - Name: subtitle
   - Field type: Text (Long text)
   - Name: description
   - Field type: Media (single media)
   - Name: image
   - Field type: Text (Short text)
   - Name: ctaText
   - Field type: Text (Short text)
   - Name: ctaUrl
   - Field type: JSON
   - Name: benefits
5. Click "Save" to create the content type

## 4. Create the For Women Content Type

1. Go to "Content-Type Builder" in the left sidebar
2. Click "Create new single type"
3. Enter "For Women" as the Display name (this will create a content type with API ID "for-women")
4. Add the following fields:
   - Field type: Text (Short text)
   - Name: title
   - Field type: Text (Short text)
   - Name: subtitle
   - Field type: Text (Long text)
   - Name: description
   - Field type: Media (single media)
   - Name: image
   - Field type: Text (Short text)
   - Name: ctaText
   - Field type: Text (Short text)
   - Name: ctaUrl
   - Field type: JSON
   - Name: benefits
5. Click "Save" to create the content type

## 5. Create the Services Content Type

1. Go to "Content-Type Builder" in the left sidebar
2. Click "Create new single type"
3. Enter "Services" as the Display name
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
   - Field type: Relation
   - Name: services
   - Related Content Type: Create new collection type "Service"
   - Type: has many
5. Create the "Service" collection type with:
   - Field type: Text (Short text)
   - Name: title
   - Field type: Text (Long text)
   - Name: description
   - Field type: Text (Short text)
   - Name: price
   - Field type: Text (Short text)
   - Name: duration
   - Field type: Boolean
   - Name: featured
   - Field type: Text (Short text)
   - Name: buttonText
   - Field type: Text (Short text)
   - Name: buttonUrl
6. Click "Save" to create both content types

## 6. Add Hero Content

1. Go to "Content Manager" in the left sidebar
2. Select "Hero" from the single types
3. Fill in the fields:
   - **Title**: "DreamNest"
   - **Subtitle**: "Where Your Dreams Find a Home"
   - **Description**: "Awaken your wildest dreams, ignite your sensual power, and reclaim your authentic expression. I guide visionaries like you to break free from societal conditioning and live with unapologetic passion."
   - **CTA Text**: "Begin Your Journey"
   - **CTA URL**: "#services" (this will scroll to the services section)
   - **Hero Image**: Upload a professional image of Lena
4. Click "Save" and then "Publish" to make the content available via the API

## 7. Add About Content

1. Go to "Content Manager" in the left sidebar
2. First, add some specialties:
   - Select "Specialty" from the collection types
   - Click "Create new entry"
   - Enter a specialty name (e.g., "Sex, Love & Relationship Coaching")
   - Save and publish
   - Repeat for other specialties like "VITA Method Certified", "Emotional Intelligence Development", etc.
3. Now, select "About" from the single types
4. Fill in the fields:
   - **Title**: "About Me"
   - **Subtitle**: "Guiding You to Sensual Freedom"
   - **Description**: "Lena Weisinger is a Sex, Love & Relationship Coach trained under Layla Martin's renowned VITA method. Her journey into this work was deeply personal - she spent years unraveling societal conditioning around sexuality, power, and intimacy, learning firsthand what it means to reclaim desire as a source of strength rather than shame. She now guides others on that same path, helping them break free from limiting patterns and step into a fully embodied, confident, and connected way of loving."
   - **Image**: Upload a professional image of Lena (different from the hero image)
   - **Specialties**: Select the specialties you created earlier
5. Click "Save" and then "Publish" to make the content available via the API

## 8. Add For Men Content

1. Go to "Content Manager" in the left sidebar
2. Select "For Men" from the single types
3. Fill in the fields:
   - **Title**: "For Men"
   - **Subtitle**: "Authentic Power & Connection"
   - **Description**: "Lena works with men who are ready to dismantle outdated conditioning and step into their authentic power. She helps them develop deep emotional intelligence, sexual confidence, and the ability to connect with women in a way that feels both dominant and deeply present. Her coaching is direct, playful, and transformative - challenging men to rise into their highest selves, not through performance, but through raw, embodied truth."
   - **Image**: Upload a professional image representing men's coaching
   - **CTA Text**: "Book a Discovery Call"
   - **CTA URL**: "#contact"
   - **Benefits**: Add the following JSON array:
     ```json
     [
       "Develop authentic confidence that attracts the right partner",
       "Master emotional intelligence for deeper connections",
       "Learn to lead with presence and vulnerability",
       "Overcome performance anxiety and embrace pleasure",
       "Transform your relationship patterns for lasting fulfillment"
     ]
     ```
4. Click "Save" and then "Publish" to make the content available via the API

## 9. Add For Women Content

1. Go to "Content Manager" in the left sidebar
2. Select "For Women" from the single types
3. Fill in the fields:
   - **Title**: "For Women"
   - **Subtitle**: "Reclaim Your Pleasure & Power"
   - **Description**: "Lena supports women in unlocking their full sexual expression and reclaiming pleasure as their birthright. She helps them release shame, heal past wounds, and step into relationships where they feel cherished, seen, and fully desired. Whether they seek deeper self-intimacy, more fulfilling partnerships, or greater confidence in the bedroom, Lena creates a space where they can explore without judgment and embody their most radiant, unapologetic selves."
   - **Image**: Upload a professional image representing women's coaching
   - **CTA Text**: "Begin Your Journey"
   - **CTA URL**: "#contact"
   - **Benefits**: Add the following JSON array:
     ```json
     [
       "Release shame and embrace your desires fully",
       "Heal past relationship wounds and patterns",
       "Cultivate radiant confidence in and out of the bedroom",
       "Learn to communicate your needs with clarity and power",
       "Connect with your body as a source of wisdom and pleasure"
     ]
     ```
4. Click "Save" and then "Publish" to make the content available via the API

## 10. Add Services Content

1. Go to "Content Manager" in the left sidebar
2. First, add some services:
   - Select "Service" from the collection types
   - Click "Create new entry"
   - Fill in the fields:
     - **Title**: "Relationship Breakthrough"
     - **Description**: "A transformative 1:1 coaching program to help you overcome relationship challenges and create deeper, more fulfilling connections."
     - **Price**: "From $997"
     - **Duration**: "8 weeks"
     - **Featured**: true
     - **Button Text**: "Learn More"
     - **Button URL**: "#contact"
   - Save and publish
   - Repeat for other services like "Intimacy Mastery", "Sexual Confidence", and "Single Session"
3. Now, select "Services" from the single types
4. Fill in the fields:
   - **Title**: "My Services"
   - **Subtitle**: "Transformative Coaching Programs"
   - **Description**: "Explore my range of personalized coaching programs designed to help you unlock your full potential and transform your relationships."
   - **CTA Text**: "Not sure which program is right for you? Let's talk"
   - **CTA URL**: "#contact"
   - **Services**: Select the services you created earlier
5. Click "Save" and then "Publish" to make the content available via the API

## 11. Configure Permissions

For your frontend to access the Strapi API, you need to set the correct permissions:

1. Go to "Settings" in the bottom of the left sidebar
2. Click on "Roles" under "Users & Permissions plugin"
3. Click on the "Public" role
4. In the permissions section, find the content types you created
5. Check the following permissions for each:
   - find (to access the content)
6. Click "Save" to apply the permissions

## 12. View Your Changes

1. Go to http://localhost:3000/dreamnest to see your DreamNest website
2. The hero, about, audience-specific sections, and services should now display the content you added in Strapi
3. Any changes you make in Strapi will be reflected on the website after publishing

## 13. Setting up the Testimonials Content Type

### 1. Create the Testimonials Section Type

1. Go to "Content-Type Builder" in the Strapi admin panel
2. Click on "Create new collection type"
3. Name it "Testimonials" (this will be the section container)
4. Add the following fields:
   - **Title**: Short text
   - **Subtitle**: Short text (optional)
5. Save the collection type

### 2. Create the Testimonial Item Type

1. Go to "Content-Type Builder" in the Strapi admin panel
2. Click on "Create new collection type"
3. Name it "Testimonial" (this will be for individual testimonial items)
4. Add the following fields:
   - **Name**: Short text (client name)
   - **Role**: Short text (client role/description)
   - **Quote**: Long text (the testimonial content)
   - **Rating**: Number (1-5 star rating)
   - **Image**: Media (client photo)
   - **Order**: Number (for controlling display order)
5. Save the collection type

### 3. Add Testimonials Content

1. Go to "Content Manager" → "Testimonials" → "Create new entry"
2. Fill in:
   - **Title**: "What Our Clients Say"
   - **Subtitle**: "Real Transformations from Real People"
3. Save and publish

### 4. Add Individual Testimonials

1. Go to "Content Manager" → "Testimonial" → "Create new entry"
2. Fill in the details for each testimonial:
   - **Name**: Client name
   - **Role**: Client's role or type of coaching received
   - **Quote**: The testimonial text
   - **Rating**: A number from 1-5
   - **Image**: Upload a client photo
   - **Order**: Set the display order (e.g., 1, 2, 3, etc.)
3. Save and publish
4. Repeat for each testimonial

## Featured Services Horizontal Scroll Section

This section creates an elegant horizontal scrolling showcase of featured services, similar to the "ready to bring a-game, baby?" section on the reference website.

### 1. Create the "Featured Services" Single Type

1. Go to **Content-Type Builder** → **Create new Single Type**
2. Name: `Featured Services`
3. API ID: `featured-services`
4. Add the following fields:

| Field Name | Type | Additional Settings |
|------------|------|---------------------|
| heading | Text | Required |
| tagline | Text | Required |
| services | Relation | Relation with "Service" collection type, Many-to-Many |

5. Save the Single Type

### 2. Create the "Service" Collection Type (if not already created)

1. Go to **Content-Type Builder** → **Create new Collection Type**
2. Name: `Service`
3. API ID: `service`
4. Add the following fields:

| Field Name | Type | Additional Settings |
|------------|------|---------------------|
| title | Text | Required |
| subtitle | Text | Required |
| description | Text | Required |
| image | Media | Single image, Required |
| link | Text | Required (e.g., "#contact" or "/services/coaching") |
| order | Number | Integer, Required (for controlling display order) |

5. Save the Collection Type

### 3. Add Content to Featured Services

1. Go to **Content Manager** → **Featured Services**
2. Fill in the fields:
   - **Heading**: "ready to bring your a-game, baby?"
   - **Tagline**: "Explore transformative experiences designed to awaken your authentic expression and deepen your connection with yourself and others."
   - **Services**: Select the services you want to display in the horizontal scroll section
3. Save and publish

### 4. Add Service Items

1. Go to **Content Manager** → **Services** → **Create new entry**
2. Fill in the fields for each service:
   - **Title**: e.g., "Sensual Awakening"
   - **Subtitle**: e.g., "Rediscover Your Passionate Self"
   - **Description**: e.g., "Awaken dormant desires and reconnect with your sensual nature through guided practices that honor your unique expression and boundaries."
   - **Image**: Upload an image representing the service
   - **Link**: e.g., "#contact" or "/services/sensual-awakening"
   - **Order**: e.g., 1 (for the first item in the scroll)
3. Save and publish
4. Repeat for each service you want to display

## Next Steps

As we continue building the DreamNest website, we'll add more content types for:

1. Quiz
2. Blog
3. Contact Form
4. Legal Pages

Each of these will be manageable through Strapi, allowing you to update your website content without touching the code.

## Troubleshooting

If you're not seeing your changes:

1. Make sure you've published the content in Strapi
2. Check that permissions are set correctly
3. Clear your browser cache
4. Check the browser console for any errors
5. Restart the Next.js development server if needed
