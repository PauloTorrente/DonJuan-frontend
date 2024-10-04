import { useState } from 'react';

function useApi() {
  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to store error messages
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  async function getData({ route, method = 'GET', body }) {
    setIsLoading(true); // Set loading to true when the request starts

    setTimeout(async () => {
      try {
        const token = localStorage.token; // Get the token from local storage
        const response = await fetch(`https://donjuan-rzly.onrender.com/${route}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` // Include token in the request header
          },
          method,
          body: body && JSON.stringify(body), // Stringify body only if it exists
        });

        if (!response.ok) {
          setError('Error fetching data'); // Set error state if response is not OK
          setIsLoading(false); // Reset loading state
          return;
        }

        const responseAsJson = await response.json(); // Parse the JSON response
        if (responseAsJson.token) {
          localStorage.token = responseAsJson.token; // Save new token if provided
        }

        let responseToConvert;
        if (Array.isArray(responseAsJson)) {
          responseToConvert = responseAsJson; // If the response is an array, use it as is
        } else {
          responseToConvert = [responseAsJson]; // Convert single object response to array
        }

        const transformedData = responseToConvert.map(item => {
          if (item.image) {
            return {
              ...item,
              image: item.image.map(imgUrl => transformRowUrl(imgUrl)) // Transform image URLs if present
            };
          }
          return item; // Return the item unchanged if no image is present
        });

        setData(Array.isArray(responseAsJson) ? transformedData : transformedData[0]); // Update data state
      } catch (err) {
        setError('Error fetching data'); // Handle errors
      } finally {
        setIsLoading(false); // Reset loading state
      }
    }, 2000); // Simulate a delay (remove if not needed)
  }

  return { data, getData, error, isLoading }; // Return the states and the function
}

export default useApi;
