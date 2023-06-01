import React from 'react';
import './Footer.scss';

const Footer = (): JSX.Element => {
  return (
    <div className="Footer">
      <div className="Footer-Developer">
        Developed by{' '}
        <a
          rel="noopener noreferrer"
          href="https://ost.ch/ins"
          target="_blank"
        >
          Institute for Network and Security
        </a>
        .
      </div>
    </div>
  );
};

export default Footer;
