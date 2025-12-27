import { useState, useEffect } from 'react';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch listings from API
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      // Missing: Error handling, loading states
      const response = await fetch('/api/listings');
      const data = await response.json();
      setListings(data);
      setLoading(false);
    } catch (error) {
      // Missing: Error display
      console.error(error);
    }
  }

  // Missing: Create form
  // Missing: Edit functionality
  // Missing: Delete functionality

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Property Listings</h1>
      {/* Missing: Create listing form */}
      <div>
        {listings.length === 0 ? (
          <p>No listings found</p>
        ) : (
          listings.map(listing => (
            <div key={listing.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <h2>{listing.title}</h2>
              <p>{listing.description}</p>
              <p>Price: ${listing.price}</p>
              <p>Location: {listing.location}</p>
              {/* Missing: Edit button */}
              {/* Missing: Delete button */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

