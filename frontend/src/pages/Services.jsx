import React from 'react';
import { Wrench, Settings, Gauge, HardHat } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Wrench size={40} />,
      title: 'Oilfield Asset & Equipment Rental',
      description: 'Comprehensive rental solutions for all your drilling and oilfield operations. We provide state-of-the-art equipment tailored to meet the specific demands of both onshore and offshore projects.',
      features: [
        'Drilling rigs and specialized machinery',
        'Flexible rental terms',
        'Regular maintenance and support',
        '24/7 technical assistance',
      ],
      image: 'https://images.unsplash.com/photo-1578356058390-f58c575337a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxvZmZzaG9yZSUyMG9pbCUyMHJpZ3xlbnwwfHx8fDE3NjYxMDEwMzR8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: <Settings size={40} />,
      title: 'Drilling Rigs & Specialized Machinery',
      description: 'Access to cutting-edge drilling rigs and specialized equipment designed for maximum efficiency and safety in challenging environments.',
      features: [
        'Latest generation drilling rigs',
        'Advanced logging equipment',
        'Testing and evaluation tools',
        'Customized equipment packages',
      ],
      image: 'https://images.unsplash.com/photo-1629540946404-ebe133e99f49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxvZmZzaG9yZSUyMG9pbCUyMHJpZ3xlbnwwfHx8fDE3NjYxMDEwMzR8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: <Gauge size={40} />,
      title: 'Reservoir Evaluation & Logging Support',
      description: 'Expert reservoir evaluation and logging services to optimize your drilling operations and maximize resource recovery.',
      features: [
        'Advanced logging technologies',
        'Reservoir characterization',
        'Formation evaluation',
        'Real-time data analysis',
      ],
      image: 'https://images.unsplash.com/photo-1572970388430-a7fff761e597?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxvaWxmaWVsZHxlbnwwfHx8fDE3NjYxMDEwNDZ8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: <HardHat size={40} />,
      title: 'Comprehensive Drilling & Engineering Solutions',
      description: 'Full-spectrum drilling and engineering services from planning to execution, ensuring successful project delivery.',
      features: [
        'Well construction services',
        'Project management (PMP-certified)',
        'Engineering consultation',
        'Safety and compliance oversight',
      ],
      image: 'https://images.unsplash.com/photo-1561625101-fd85c8e135f2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxvZmZzaG9yZSUyMG9pbCUyMHJpZ3xlbnwwfHx8fDE3NjYxMDEwMzR8MA&ixlib=rb-4.1.0&q=85'
    },
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-hero-title">Our Services</h1>
          <p className="page-hero-description">
            Comprehensive oil and gas equipment rental and support services for
            onshore and offshore operations across Nigeria and Africa.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="services-detail-section">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-detail-card ${index % 2 === 1 ? 'reverse' : ''}`}
          >
            <div className="service-detail-content">
              <div className="service-detail-icon">{service.icon}</div>
              <h2 className="service-detail-title">{service.title}</h2>
              <p className="service-detail-description">{service.description}</p>
              <div className="service-features">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="service-feature">
                    <div className="feature-bullet"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="service-detail-image">
              <img src={service.image} alt={service.title} />
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="services-cta-section">
        <h2 className="cta-title">Need a Custom Solution?</h2>
        <p className="cta-description">
          Our team can design tailored equipment and service packages to meet your
          specific project requirements.
        </p>
        <a href="/contact" className="btn-primary btn-large">
          Request a Quote
        </a>
      </section>
    </div>
  );
};

export default Services;