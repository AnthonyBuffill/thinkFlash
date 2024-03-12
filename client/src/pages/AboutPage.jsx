import React from 'react';
import AboutUs from '../components/AboutUs'; 
import AntB from '../assets/images/AntB.png'
import KarenD from '../assets/images/KarenD.png';
import LukeG from '../assets/images/LukeG.png';

export default function AboutPage() {
  return (
    <>
      <div style={{ fontSize: '375%', padding: '60px', color: 'rgb(6, 155, 161)', 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}> Where <span style= {{fontSize: '70px', color: '#FFE3A1',
              textShadow: '2px 2px 4px rgba(6, 155, 161, 1.0)', }}>Intelligence </span><br/>meets <span style= {{fontSize: '70px', color: '#FFE3A1',
              textShadow: '2px 2px 4px rgba(6, 155, 161, 1.0)', }}>Intuition</span> in <br/>the world <br/>of <span style= {{fontSize: '70px', color: '#FFE3A1',
              textShadow: '2px 2px 4px rgba(6, 155, 161, 1.0)', }}>Digital Learning</span>.</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '130px', fontSize: '150%', color: 'rgb(6, 155, 161)', 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}> Experience a new way to learn with our flash cards generated with the power of AI, personalized to your desired content, the power to create the optimum enviroment to meet your needs in whatever landscape of your choosing, you can seemglessly create a deck of flash cards for all your studying preparation and entertainment needs</div>
      <div >
        <AboutUs
          title={
            <span style={{ 
              color: 'rgb(6, 155, 161)', 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
              fontSize: '30px'
            }}>Luke Garnsey</span>}
            imageSrc={LukeG}
          //imageSrc={"https://placekitten.com/300/200"}
          description={<p style={{ fontStyle: 'italic', lineHeight: '1.5' }}>Dedicated full stack developer with a profound passion for server-side development. Armed with extensive expertise in crafting robust server architectures and optimizing backend functionality, I thrive on the challenge of creating seamless, efficient solutions that power exceptional user experiences. My commitment to staying at the forefront of technology ensures I bring innovative and scalable server-side solutions to every project I undertake. If you would like to see some of my other projects or wish to contact me, click on my profile link below.</p>}
          externalLink= "https://phenomenal-caramel-76b1b5.netlify.app/"
        />
        <AboutUs
          title={
            <span style={{ 
              color: 'rgb(6, 155, 161)', // Replace 'your_custom_color' with your desired color
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Example text shadow
              fontSize: '30px'
            }}>Karen Douglas</span>}
          imageSrc={KarenD}
          description={<p style={{ fontStyle: 'italic', lineHeight: '1.5' }}>A versatile full stack developer who derives immense satisfaction from not only mastering the intricacies of server-side development but also elevating user interfaces through captivating CSS styling. With a keen eye for design aesthetics and a comprehensive understanding of frontend technologies, I specialize in creating visually appealing and intuitive user experiences that seamlessly integrate with robust backend functionalities. My enthusiasm for both sides of development ensures a holistic approach to crafting engaging and well-rounded web applications.</p>}
          externalLink= "https://karenportfolio.netlify.app/"
        />
        <AboutUs
          title={
            <span style={{ 
              color: 'rgb(6, 155, 161)', // Replace 'your_custom_color' with your desired color
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Example text shadow
              fontSize: '30px'
            }}>Anthony Buffill</span>}
          imageSrc= {AntB}
          description={<p style={{ fontStyle: 'italic', lineHeight: '1.5' }}>Dynamic full stack developer who revels in the artistry of CSS styling while embracing the entire spectrum of web development. My passion lies not only in crafting visually stunning and user-friendly interfaces but also in seamlessly bridging the gap between client and server-side functionalities. With a robust skill set that spans both frontend and backend technologies, I take pride in delivering end-to-end solutions that harmonize aesthetics with performance, ensuring a cohesive and engaging user experience. Click my portfolio link to see more of my work or contact me.</p>}
          externalLink= "https://antbuffillportfolio.netlify.app/"
        />
      </div> 

    </>
  );
}
