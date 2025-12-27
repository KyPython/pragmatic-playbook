import { useState, useEffect } from 'react';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: ''
  });

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/listings');
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      const data = await response.json();
      setListings(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = editingId ? `/api/listings/${editingId}` : '/api/listings';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save listing');
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', description: '', price: '', location: '' });
      fetchListings();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete listing');
      }

      fetchListings();
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEdit(listing) {
    setEditingId(listing.id);
    setFormData({
      title: listing.title,
      description: listing.description,
      price: listing.price.toString(),
      location: listing.location
    });
    setShowForm(true);
  }

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Property Listings</h1>

      {error && (
        <div style={{ background: '#fee', color: '#c00', padding: '10px', margin: '10px 0', borderRadius: '4px' }}>
          Error: {error}
        </div>
      )}

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({ title: '', description: '', price: '', location: '' });
        }}
        style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        {showForm ? 'Cancel' : 'Create New Listing'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '4px' }}>
          <h2>{editingId ? 'Edit Listing' : 'Create New Listing'}</h2>
          <div style={{ marginBottom: '10px' }}>
            <label>Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '100px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Price:</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Location:</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
            {editingId ? 'Update' : 'Create'} Listing
          </button>
        </form>
      )}

      <div>
        {listings.length === 0 ? (
          <p>No listings found. Create your first listing!</p>
        ) : (
          listings.map(listing => (
            <div key={listing.id} style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '4px' }}>
              <h2>{listing.title}</h2>
              <p>{listing.description}</p>
              <p><strong>Price:</strong> ${listing.price.toLocaleString()}</p>
              <p><strong>Location:</strong> {listing.location}</p>
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleEdit(listing)}
                  style={{ marginRight: '10px', padding: '5px 15px' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(listing.id)}
                  style={{ padding: '5px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

