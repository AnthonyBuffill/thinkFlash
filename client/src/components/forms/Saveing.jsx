import '../../assets/css/loading.css';
export default function Saveing ({text}){
  return (
  <div style={styles.container}>
      <h1 style={styles.loading}>{text}</h1>
      <div>
        <div style={styles.spinner}></div>
      </div>
  </div>
  );
}

const styles = {
  container:{
    textAlign:'center',
    margin: '24px'
  },
  loading:{
    fontSize:'28px',
  },
  spinner:{
    width: '50px',
    height: '50px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderTopColor: '#333',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '25px auto'
  },
  '@keyframes spin':{
    '100%': {
      transform: 'rotate(360deg)'
    }
  }
}