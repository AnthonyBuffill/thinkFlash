export default function Loading (){
  return (
  <div style={styles.container}>
      <h1 style={styles.loading}>Loading</h1>
  </div>
  );
}

const styles = {
  container:{
    textAlign:'center',
    margin: '24px'
  },
  loading:{
    fontSize:'32px',
    
  }
}