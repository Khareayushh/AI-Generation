import React from 'react';

const Footer = () => {
  return (
    <div className="footer flex items-center justify-center mt-4">
      <p className="p-4">
        Made by{' '}
        <a
          className="font-bold hover:text-red-600 transition duration-300"
          href="https://github.com/Khareayushh"
        >
          @khareayushh
        </a>{' '}
      </p>
    </div>
  );
};

export default Footer;
