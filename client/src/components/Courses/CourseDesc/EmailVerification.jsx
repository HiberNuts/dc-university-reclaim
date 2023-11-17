import React from 'react';

const EmailVerification = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Email Verified Successfully</h1>
        <p style={styles.description}> Login to continue. </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh',
  },
  card: {
    position: 'relative',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    textAlign: 'center',
    // top: '-200px', 
    background: 'linear-gradient(to bottom, #4CAF50, #45a049)',  
    color: '#fff',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1rem',
    color: '#eee',
  },
};

export default EmailVerification;
