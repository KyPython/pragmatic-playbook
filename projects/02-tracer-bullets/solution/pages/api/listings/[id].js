// In-memory storage (shared with index.js - in production, use database)
let listings = [
  { 
    id: '1', 
    title: 'Beautiful Downtown Apartment', 
    description: 'Spacious 2-bedroom apartment in the heart of the city', 
    price: 250000, 
    location: 'San Francisco, CA',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // GET /api/listings/:id - return single listing
    const listing = listings.find(l => l.id === id);
    
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    return res.status(200).json(listing);
  } else if (req.method === 'PUT') {
    // PUT /api/listings/:id - update listing
    const listingIndex = listings.findIndex(l => l.id === id);

    if (listingIndex === -1) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    const { title, description, price, location } = req.body;

    // Validation
    if (!title || !description || !price || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    listings[listingIndex] = {
      ...listings[listingIndex],
      title,
      description,
      price,
      location,
      updatedAt: new Date().toISOString()
    };

    return res.status(200).json(listings[listingIndex]);
  } else if (req.method === 'DELETE') {
    // DELETE /api/listings/:id - delete listing
    const listingIndex = listings.findIndex(l => l.id === id);

    if (listingIndex === -1) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    listings.splice(listingIndex, 1);
    return res.status(204).send();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

