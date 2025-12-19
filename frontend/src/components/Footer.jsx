import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="dark-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">DRILLDOWN DYNAMICS</h3>
          <p className="footer-text">
            Integrated energy services provider delivering comprehensive drilling, 
            logistics, consulting, and sustainable solutions for oil, gas, geothermal, 
            and mining operations globally.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/services" className="footer-link">Services</Link>
            <Link to="/portfolio" className="footer-link">Portfolio</Link>
            <Link to="/leadership" className="footer-link">Leadership</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Contact Information</h4>
          <div className="footer-contact">
            <div className="contact-item">
              <MapPin size={18} />
              <span>Ogudu Estate, Lagos, Nigeria</span>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <span>sales@drilldowndynamics.com</span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>+234 806 643 4176</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Drilldown Dynamics. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;