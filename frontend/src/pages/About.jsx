import React from 'react';
import { Target, Eye, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Award size={32} />,
      title: 'Customer-First',
      description: 'We place client needs and satisfaction at the center of every solution.'
    },
    {
      icon: <Target size={32} />,
      title: 'Innovation',
      description: 'We leverage technology and expertise to deliver forward-thinking oilfield solutions.'
    },
    {
      icon: <Eye size={32} />,
      title: 'Excellence',
      description: 'We maintain the highest standards in safety, quality, and operational performance.'
    },
  ];

  const objectives = [
    'Acquire, own, lease, charter, and operate drilling rigs and specialized equipment',
    'Deploy advanced machinery for drilling, logging, testing, and reservoir evaluation',
    'Provide comprehensive drilling, engineering, and well construction services',
    'Support both onshore and offshore oil and gas projects',
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-hero-title">About Drilldown Dynamics</h1>
          <p className="page-hero-description">
            A forward-looking energy services company established in 2025, delivering 
            comprehensive drilling, engineering, logistics, and sustainable energy solutions 
            for the global oil, gas, geothermal, and mining sectors.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="content-section">
        <div className="content-grid">
          <div className="content-text">
            <h2 className="content-title">Our Story</h2>
            <p className="content-paragraph">
              Drilldown Dynamics was founded in 2025 with a vision to become a leading 
              integrated energy services provider across Africa and beyond. With over 25 years 
              of combined leadership experience, we deliver comprehensive solutions spanning 
              drilling, well construction, energy logistics, consulting, and sustainable 
              energy technologies for oil, gas, geothermal, and mining operations globally.
            </p>
            <p className="content-paragraph">
              We understand the complex challenges of modern energy operations—from offshore 
              and onshore drilling to supply chain management and emissions reduction. Our 
              integrated approach combines technical excellence with innovation in digital 
              transformation, drilling automation, and sustainable energy solutions, positioning 
              us as a strategic partner for the evolving global energy landscape.
            </p>
          </div>
          <div className="content-image">
            <img
              src="https://images.unsplash.com/photo-1624771002998-4aadfd43e7c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxvaWxmaWVsZHxlbnwwfHx8fDE3NjYxMDEwNDZ8MA&ixlib=rb-4.1.0&q=85"
              alt="Oilfield operations"
              className="section-img"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission-section">
        <div className="vm-grid">
          <div className="vm-card">
            <Eye size={48} className="vm-icon" />
            <h3 className="vm-title">Our Vision</h3>
            <p className="vm-text">
              To be the leading integrated energy services provider delivering innovative 
              drilling, logistics, and sustainable solutions for the global oil, gas, 
              geothermal, and mining sectors.
            </p>
          </div>
          <div className="vm-card">
            <Target size={48} className="vm-icon" />
            <h3 className="vm-title">Our Mission</h3>
            <p className="vm-text">
              To deliver reliable, innovative, and cost-efficient drilling and oilfield
              support solutions that empower our clients to unlock maximum value from
              their operations.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="objectives-section">
        <h2 className="section-title">Our Objectives</h2>
        <div className="objectives-grid">
          {objectives.map((objective, index) => (
            <div key={index} className="objective-card">
              <div className="objective-number">{String(index + 1).padStart(2, '0')}</div>
              <p className="objective-text">{objective}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <h2 className="section-title">Our Core Values</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;