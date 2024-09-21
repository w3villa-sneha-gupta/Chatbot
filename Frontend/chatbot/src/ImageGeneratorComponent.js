import React, { useState } from 'react';
import './ImageGeneratorComponent.css';

const ImageGeneratorComponent = () => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: description,
        model: 'cortext-image',
        size: '1024x1024',
        quality: 'standard',
        provider: 'OpenAI',
        steps: 30,
        cfg_scale: 8,
      }),
    });

    const data = await res.json();
    if (data && data[0]) {
      setImageUrl(data[0].image_url);
    }
  };

  return (
    <div className="image-generator-container">
    <h2>Image Generator</h2>
    {imageUrl && (
      <div className="generated-image-container">
        <h3>Generated Image:</h3>
        <img src={imageUrl} alt="Generated" className="generated-image" />
      </div>
    )}
    <form onSubmit={handleSubmit} className="image-generator-form">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter image description"
        required
        className="image-input"
      />
      <button type="submit" className="generate-button">Generate Image</button>
    </form>
  </div>
  );
};

export default ImageGeneratorComponent;
