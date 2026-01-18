import React from 'react';

const FacebookLogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props} // Allows passing props like className, style, etc.
  >
    <path d="M12 0C6.477 0 2 4.477 2 10c0 5.084 3.657 9.313 8.438 9.879V14.25H7.5V10.5h2.938V7.5c0-2.964 1.807-4.58 4.454-4.58 1.31 0 2.438.098 2.768.142v3.207h-1.91c-1.493 0-1.784.712-1.784 1.754V10.5h3.573l-.578 3.75H14.25v5.629C19.023 19.313 22 15.084 22 10c0-5.523-4.477-10-10-10z"/>
  </svg>
);

export default FacebookLogo;
