# Requirements: Tracer Bullets Project

## MVP Features (Must Have)

### 1. Listings API
- **GET /api/listings** - Get all listings
- **GET /api/listings/:id** - Get single listing
- **POST /api/listings** - Create new listing
- **PUT /api/listings/:id** - Update listing
- **DELETE /api/listings/:id** - Delete listing

### 2. Listings UI
- **Homepage** - Display all listings
- **Create Form** - Add new listing
- **Edit Form** - Update existing listing
- **Delete Button** - Remove listing

### 3. Data Model
```javascript
{
  id: string,
  title: string,
  description: string,
  price: number,
  location: string,
  createdAt: date,
  updatedAt: date
}
```

## Nice to Have (Future Iterations)

- Search functionality
- Filtering by price/location
- Image uploads
- User authentication
- Favorites/bookmarks
- Pagination

## Deployment Requirements

- Deploy to Vercel (or similar)
- Environment variables configured
- Database connection (or in-memory for MVP)

## Success Criteria

✅ All API endpoints work
✅ UI displays and creates listings
✅ Can deploy to production
✅ End-to-end flow works (create → view → edit → delete)

## Implementation Notes

- Use in-memory storage for MVP (no database required)
- Focus on working end-to-end, not perfection
- Deploy incomplete but working version
- Iterate based on feedback

