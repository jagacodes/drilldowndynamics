import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission - will be replaced with backend integration
    setTimeout(() => {
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you soon.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-hero-title">Contact Us</h1>
          <p className="page-hero-description">
            Get in touch with our team to discuss your oil and gas equipment needs.
            We're here to support your next project.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info">
            <h2 className="contact-info-title">Get in Touch</h2>
            <p className="contact-info-description">
              Reach out to us for inquiries about our services, equipment rental, or
              partnership opportunities.
            </p>

            <div className="contact-details">
              <div className="contact-detail-card">
                <div className="contact-icon">
                  <MapPin size={24} />
                </div>
                <div className="contact-detail-content">
                  <h3 className="contact-detail-title">Head Office</h3>
                  <p className="contact-detail-text">Ogudu Estate, Lagos, Nigeria</p>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-icon">
                  <Mail size={24} />
                </div>
                <div className="contact-detail-content">
                  <h3 className="contact-detail-title">Email</h3>
                  <p className="contact-detail-text">sales@drilldowndynamics.com</p>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div className="contact-detail-content">
                  <h3 className="contact-detail-title">Phone</h3>
                  <p className="contact-detail-text">+234 XXX XXX XXXX</p>
                </div>
              </div>
            </div>

            <div className="contact-hours">
              <h3 className="contact-hours-title">Business Hours</h3>
              <p className="contact-hours-text">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="contact-hours-text">Saturday: 9:00 AM - 2:00 PM</p>
              <p className="contact-hours-text">Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="company" className="form-label">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="form-textarea"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary btn-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;