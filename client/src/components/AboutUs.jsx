import React from 'react';

const AboutUs = ({ title, imageSrc, description, externalLink }) => {
  return (
    <div style={{ width: '300px', margin: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
      <h2>{title}</h2>
      <img src={imageSrc} alt={title} style={{ maxWidth: '100%', height: 'auto' }} />
      <p>{description}</p>
      <a href={externalLink} target="_blank" rel="noopener noreferrer">
        <button>Profile</button>
      </a>
    </div>
  );
};

export default AboutUs