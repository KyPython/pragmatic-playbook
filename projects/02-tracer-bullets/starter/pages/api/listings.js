// Incomplete API - missing endpoints

// In-memory storage (for MVP)
let listings = [
  { id: '1', title: 'Sample Listing', description: 'This is a sample', price: 100000, location: 'San Francisco' }
];

export default function handler(req, res) {
  // Missing: GET /api/listings - return all listings
  // Missing: GET /api/listings/:id - return single listing
  // Missing: POST /api/listings - create listing
  // Missing: PUT /api/listings/:id - update listing
  // Missing: DELETE /api/listings/:id - delete listing
  
  // Stub response
  res.status(200).json({ message: 'API not implemented' });
}

