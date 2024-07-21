import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return <footer className="footer-box">
  <p>Developed by Sergio L.</p>
  <a href="https://github.com/SergioLM7" target="_blank" rel="noopener noreferrer">
  <FontAwesomeIcon icon={faGithub} size="2x" color="white"/></a>
  <p>@copyright</p>
</footer>
};

export default Footer;
