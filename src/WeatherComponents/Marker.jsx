import React from 'react';

const Marker = ({ text }) => {
  return (
    <div style={{
      color: 'white',
      background: 'red',
      padding: '5px 10px',
      borderRadius: '50%',
      textAlign: 'center',
      transform: 'translate(-50%, -50%)'
    }}>
      {text} {/* Display text or any other label */}
    </div>
  );
}

export default Marker;
