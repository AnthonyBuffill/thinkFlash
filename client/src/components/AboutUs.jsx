import '../assets/css/AboutStyle.css';
import PropTypes from 'prop-types';

const AboutUs = ({ title, imageSrc, description, externalLink }) => {
  return (
    <div className= "about-us-container">
      <div style={{ margin: '15px', border: '1px solid #210203', paddingTop: '15px', paddingLeft: '15px', borderRadius: '8px',  }}>
        <h2>{title}</h2>
        <div className='about-us-subContainer'>
          <div className='about-us-imgContainer'>
            <img src={imageSrc} alt={title} style={{ height: '200px', borderRadius: "50%" }} />
          </div>
          <div className='about-us-description'>
            <div>{description}</div>
            <a href={externalLink} target="_blank" rel="noopener noreferrer">
              <button style= {{backgroundColor: 'rgb(6, 155, 161)',  margin: "auto", padding: '12px', borderRadius: '10px' }}>Portfolio</button>
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AboutUs

AboutUs.propTypes = {
  title: PropTypes.element.isRequired,
  imageSrc: PropTypes.string.isRequired,
  description: PropTypes.element.isRequired,
  externalLink: PropTypes.string.isRequired,
}