import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import "../styles/Footer.css";

function Footer() {
    return (
      <div className="footer">
        <div className="socialMedia">
        </div>
        <p> &copy; 2022 ClimateChangeNow.com</p>
        <InstagramIcon />
        <FacebookIcon />
        <TwitterIcon />
        <EmailIcon />
      </div>
    );
  }

export default Footer;