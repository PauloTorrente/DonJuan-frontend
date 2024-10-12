import React from 'react';
import styled from 'styled-components';
import whiteLogo from '../../assets/whiteLogo.png';

// Define the styled components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 1;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

// Functional component
const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <Overlay>
      <LogoContainer>
        <img src={whiteLogo} alt="Loading..." style={{ width: '100px', height: 'auto' }} />
        <div style={{ color: 'white', marginTop: '10px', fontSize: '1.5rem', fontWeight: 'bold' }}>

        </div>
      </LogoContainer>
    </Overlay>
  );
};

export default LoadingOverlay;
