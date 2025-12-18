import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Home = () => {
  const services = [
    {
      title: 'Oilfield Asset & Equipment Rental',
      description: 'Comprehensive rental solutions for drilling operations',
      image: 'https://images.unsplash.com/photo-1561625101-fd85c8e135f2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxvZmZzaG9yZSUyMG9pbCUyMHJpZ3xlbnwwfHx8fDE3NjYxMDEwMzR8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      title: 'Drilling Rigs & Machinery',
      description: 'State-of-the-art drilling equipment for all operations',
      image: 'https://images.unsplash.com/photo-1629540946404-ebe133e99f49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxvZmZzaG9yZSUyMG9pbCUyMHJpZ3xlbnwwfHx8fDE3NjYxMDEwMzR8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      title: 'Engineering Solutions',
      description: 'Expert engineering support for complex projects',
      image: 'https://images.unsplash.com/photo-1572970388430-a7fff761e597?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxvaWxmaWVsZHxlbnwwfHx8fDE3NjYxMDEwNDZ8MA&ixlib=rb-4.1.0&q=85'
    },
  ];

  const benefits = [
    'Over 25 years of combined leadership experience',
    'Proven track record with International Oil Companies',
    'Comprehensive onshore and offshore capabilities',
    'Advanced machinery and technology',
    'Local expertise in Nigerian operations',
    'PMP-certified project management',
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Powering Africa's Energy Future
            </h1>
            <p className="hero-description">
              Premier oil and gas equipment rental services delivering innovative
              solutions for drilling, engineering, and oilfield operations across
              Nigeria and beyond.
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="btn-primary">
                Explore Services
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1578356058390-f58c575337a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxvZmZzaG9yZSUyMG9pbCUyMHJpZ3xlbnwwfHx8fDE3NjYxMDEwMzR8MA&ixlib=rb-4.1.0&q=85"
              alt="Offshore oil rig"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview-section">
        <div className="section-header">
          <h2 className="section-title">Our Core Services</h2>
          <p className="section-subtitle">
            Comprehensive solutions for all your oilfield needs
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-image-container">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-image"
                />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="services-cta">
          <Link to="/services" className="btn-primary">
            View All Services
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="benefits-section">
        <div className="benefits-content">
          <div className="benefits-text">
            <h2 className="section-title">Why Choose Drilldown Dynamics</h2>
            <p className="benefits-intro">
              We combine decades of industry expertise with cutting-edge technology
              to deliver unmatched value to our clients.
            </p>
            <div className="benefits-list">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <CheckCircle2 size={24} className="benefit-icon" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-secondary">
              Learn More About Us
            </Link>
          </div>
          <div className="benefits-image">
            <img
              src="https://images.unsplash.com/photo-1690508313456-bf8c851e8319?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHw0fHxvZmZzaG9yZSUyMG9pbCUyMHJpZ3xlbnwwfHx8fDE3NjYxMDEwMzR8MA&ixlib=rb-4.1.0&q=85"
              alt="Oil and gas operations"
              className="benefits-img"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to Partner With Us?</h2>
        <p className="cta-description">
          Let's discuss how we can support your next project with our proven
          expertise and state-of-the-art equipment.
        </p>
        <Link to="/contact" className="btn-primary btn-large">
          Contact Our Team
          <ArrowRight size={24} />
        </Link>
      </section>
    </div>
  );
};

export default Home;