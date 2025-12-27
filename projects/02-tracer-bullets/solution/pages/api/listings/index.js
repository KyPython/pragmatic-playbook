// In-memory storage (for MVP - replace with database in production)
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
  if (req.method === 'GET') {
    // GET /api/listings - return all listings
    return res.status(200).json(listings);
  } else if (req.method === 'POST') {
    // POST /api/listings - create new listing
    const { title, description, price, location } = req.body;

    // Validation
    if (!title || !description || !price || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    const newListing = {
      id: Date.now().toString(),
      title,
      description,
      price,
      location,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    listings.push(newListing);
    return res.status(201).json(newListing);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

