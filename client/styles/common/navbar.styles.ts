import { CSSProperties } from 'react';

const header: CSSProperties = {
  display: "flex",
  // position: 'fixed',
  // zIndex: 1,
  // width: '100%',
  height: 'fit-content',
  background: '#fff',
  borderBottom: '2px solid #EAEAEA',
};

const imageContainer: CSSProperties = {
  position: 'relative',
  width: '80px',
  height: '80px',
  margin: '0 24px 0 0',
  float: 'left',
};

const buttonContainer: CSSProperties = {
  position: 'relative',
  float: 'right',
  top: '5px',
};

export default {
  header,
  imageContainer,
  buttonContainer,
};
