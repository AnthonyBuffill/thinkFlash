import React from 'react';
import AboutUs from '../components/AboutUs'; 

export default function AboutPage() {
  return (
    <>
      <div>About</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <Card
          title="Luke Garnsey"
          imageSrc="https://placekitten.com/300/200"
          description="This is the description for Card 1."
          externalLink="https://example.com"
        />
        <Card
          title="Karen Douglas"
          imageSrc="https://placekitten.com/300/201"
          description="This is the description for Card 2."
          externalLink="https://example.com"
        />
        <Card
          title="Anthony Buffill"
          imageSrc="https://placekitten.com/300/202"
          description="This is the description for Card 3."
          externalLink="https://example.com"
        />
      </div>
    </>
  );
}
