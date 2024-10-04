import React, { useState } from 'react';

const ImageUploader = ({ onImageUrlChange }) => {
  const [imageUrl, setImageUrl] = useState('');

  // Función para formatear la URL de Imgur
  const formatImgurUrl = (url) => {
    const regex = /imgur\.com\/([a-zA-Z0-9]+)/; // Extraer el ID de Imgur
    const match = url.match(regex);

    if (match) {
      const imageId = match[1]; // Obtener el ID de la imagen
      return `https://i.imgur.com/${imageId}.jpg`; // Crear la URL de imagen directa
    }

    return url; // Si no es de Imgur, devolver la URL tal como está
  };

  const handleChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);

    const formattedUrl = formatImgurUrl(url);
    console.log("Formatted Imgur URL:", formattedUrl);

    onImageUrlChange(formattedUrl); // Pasar la URL formateada al padre
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
