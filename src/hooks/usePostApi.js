import { useState } from 'react';

function usePostApi() {
  const [data, setData] = useState(null); // State to store response data
  const [error, setError] = useState(null); // State to store error messages
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  async function postData({ route, payload }) {
    setIsLoading(true); // Set loading to true when the request starts
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      console.log('Token being sent:', token); // Log the token

      // Log the payload that is going to be sent
      console.log('Payload being sent:', payload); 

      const response = await fetch(`https://donjuan-rzly.onrender.com/${route}`, {
        method: 'POST', // Specify the POST method
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the request header
        },
        body: JSON.stringify(payload), // Stringify the payload to send as body
      });

      // Log the response status
      console.log('Response status:', response.status);

      if (!response.ok) {
        // Attempt to parse the error response
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse); // Log the error response for debugging
        setError(errorResponse.message || 'Error sending data'); // Set a more specific error message if available
        setIsLoading(false); // Reset loading state
        return; // Avoid further execution if there is an error
      }

      const responseAsJson = await response.json(); // Parse the JSON response
      console.log('Response from API:', responseAsJson); // Log the successful response
      setData(responseAsJson); // Set response data
    } catch (err) {
      console.error('Error sending data:', err); // Log any errors that occur during the fetch
      setError('Error sending data'); // Handle errors
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }

  return { data, postData, error, isLoading }; // Return the states and the function
}

export default usePostApi;
