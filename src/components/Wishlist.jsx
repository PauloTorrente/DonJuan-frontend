import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './Card.css';
import { useUser } from '../contexts/UserContext'; 

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser(); // Access user context to get the token

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log('User ID:', userId);
        
        // Ensure you have the token from the user context
        const token = user?.token; // Get the token from the user context

        const response = await axios.get(`https://donjuan-rzly.onrender.com/api/wishlist/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });

        console.log('Fetched wishlist:', response.data); // Log fetched wishlist data for debugging

        // Check if the response data is an array and set it to wishlist
        if (Array.isArray(response.data)) {
          setWishlist(response.data);
          localStorage.setItem('wishList', JSON.stringify(response.data.map(item => item._id))); // Sync with localStorage
        } else {
          setWishlist([]); // Default to an empty array if not
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setError('Error fetching wishlist');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWishlist(); // Only fetch the wishlist if user is logged in
    }
  }, [user]); // Add user as a dependency

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Your Wishlist</h1>
      <div className="wishlist-container">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <Card key={product._id} product={product} userWishlist={wishlist.map(item => item._id)} />
          ))
        ) : (
          <p>Your wishlist is empty. Start adding some products!</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
