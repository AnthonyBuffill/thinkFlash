import React from 'react';
import AboutUs from '../components/AboutUs'; 
import AntB from '../assets/images/AntB.png'
import KarenD from '../assets/images/KarenD.png';


export default function AboutPage() {
  return (
    <>
      <div> Where intelligence meets intuition in the world of digital learning.</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <AboutUs
          title="Luke Garnsey"
          imageSrc={"https://placekitten.com/300/200"}
          description="Dedicated full stack developer with a profound passion for server-side development. Armed with extensive expertise in crafting robust server architectures and optimizing backend functionality, I thrive on the challenge of creating seamless, efficient solutions that power exceptional user experiences. My commitment to staying at the forefront of technology ensures I bring innovative and scalable server-side solutions to every project I undertake."
          externalLink= "https://phenomenal-caramel-76b1b5.netlify.app/"
        />
        <AboutUs
          title="Karen Douglas"
          imageSrc={KarenD}
          description="This is the description for Card 2."
          externalLink= "https://karenportfolio.netlify.app/"
        />
        <AboutUs
          title="Anthony Buffill"
          imageSrc= {AntB}
          description="This is the description for Card 3."
          externalLink= "https://antbuffillportfolio.netlify.app/"
        />
      </div>
    </>
  );
}
