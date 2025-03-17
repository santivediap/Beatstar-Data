import { React } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return <footer>
    <Link target="_blank" id="social-instagram" to={ "https://www.instagram.com/beatstar" }></Link>
    <Link target="_blank" id="social-twitter" to={ "https://x.com/playbeatstar" }></Link>
    <Link target="_blank" id="social-youtube" to={ "https://www.youtube.com/c/playbeatstar" }></Link>
    <Link target="_blank" id="social-facebook" to={ "https://www.facebook.com/beatstar" }></Link>
  </footer>;
};

export default Footer;
