import React from 'react';
import '../assets/css/AboutStyle.css';

const AboutUs = ({ title, imageSrc, description, externalLink }) => {
  return (
    <div className= "about-us-container">
    <div style={{ width: '300px', margin: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px',boxShadow: '2px 6px 20px 3px rgba(6, 155, 161, 0.5)',  }}>
      <h2>{title}</h2>
      <img src={imageSrc} alt={title} style={{ width: '285px', height: '350px', borderRadius: "50%" }} />
      <p>{description}</p>
      <a href={externalLink} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "35%"}}>
        <button style= {{backgroundColor: 'rgb(6, 155, 161)',  margin: "auto", padding: '12px', borderRadius: '35%' }}>Portfolio</button>
      </a>
    </div>
    </div>
  );
};

export default AboutUs