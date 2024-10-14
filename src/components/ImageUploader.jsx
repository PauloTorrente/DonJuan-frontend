import React, { useState } from 'react';

const ImageUploader = ({ onImageUrlChange }) => {
  const [imageUrl, setImageUrl] = useState('');


  const formatImgurUrl = (url) => {
    const regex = /imgur\.com\/([a-zA-Z0-9]+)/; 
    const match = url.match(regex);

    if (match) {
      const imageId = match[1]; 
      return `https://i.imgur.com/${imageId}.jpg`;
    }

    return url;
  };

  const handleChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);

    const formattedUrl = formatImgurUrl(url);
    console.log("Formatted Imgur URL:", formattedUrl);

    onImageUrlChange(formattedUrl); 
  };

  return (
    <input
      type="text"
      placeholder="Image URL (Imgur)"
      value={imageUrl}
      onChange={handleChange}
      required
    />
  );
};

export default ImageUploader;
