import React from 'react';
import { Wrench, Settings, Gauge, HardHat } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Wrench size={40} />,
      title: 'Drilling & Well Construction Services',
      description: 'Comprehensive drilling, engineering, and well construction services for oil, gas, geothermal, and mining operations globally. We deliver end-to-end solutions for offshore and onshore projects including completions, intervention, and well management.',
      features: [
        'Offshore and onshore drilling operations',
        'Well completions and intervention',
        'Geothermal and mining drilling',
        'Well management and optimization',
      ],
      image: 'https://images.unsplash.com/photo-1578356058390-f58c575337a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxvZmZzaG9yZSUyMG9pbCUyMHJpZ3xlbnwwfHx8fDE3NjYxMDEwMzR8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: <Settings size={40} />,
      title: 'Equipment & Technology Solutions',
      description: 'Acquisition, leasing, and operation of drilling rigs, vessels, and specialized equipment. Advanced machinery for drilling, logging, testing, reservoir evaluation, and drilling automation technologies.',
      features: [
        'Drilling rigs, vessels, and equipment',
        'Advanced logging and testing tools',
        'Reservoir evaluation technologies',
        'Drilling automation systems',
      ],
      image: 'https://images.unsplash.com/photo-1629540946404-ebe133e99f49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxvZmZzaG9yZSUyMG9pbCUyMHJpZ3xlbnwwfHx8fDE3NjYxMDEwMzR8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: <Gauge size={40} />,
      title: 'Energy Logistics & Supply Chain',
      description: 'Integrated energy logistics and supply chain solutions including transportation of hydrocarbons, drilling materials, heavy equipment, and bulk cargo via land, sea, and air. Complete storage, distribution, and infrastructure management.',
      features: [
        'Hydrocarbon transportation services',
        'Equipment and materials logistics',
        'Storage and distribution management',
        'Multi-modal supply chain solutions',
      ],
      image: 'https://images.unsplash.com/photo-1572970388430-a7fff761e597?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxvaWxmaWVsZHxlbnwwfHx8fDE3NjYxMDEwNDZ8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: <HardHat size={40} />,
      title: 'Consulting & Project Management',
      description: 'Expert consulting, project management, and technical services across the energy value chain. Services include field development, digital solutions, HSE (Health, Safety & Environment), and asset optimization for upstream, midstream, and downstream operations.',
      features: [
        'Field development planning',
        'Digital transformation solutions',
        'HSE management and compliance',
        'Asset optimization services',
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
            Comprehensive energy solutions spanning drilling, well construction, logistics, 
            consulting, and sustainable technologies for oil, gas, geothermal, and mining 
            operations globally.
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

      {/* Additional Services */}
      <section className="additional-services-section">
        <h2 className="section-title">Additional Specialized Services</h2>
        <div className="additional-services-grid">
          <div className="additional-service-card">
            <h3 className="additional-service-title">Trading & Supply</h3>
            <p className="additional-service-description">
              Import, export, trading, and supply of drilling equipment, petroleum products, 
              petrochemicals, industrial commodities, and energy-related technologies.
            </p>
          </div>
          <div className="additional-service-card">
            <h3 className="additional-service-title">Research & Development</h3>
            <p className="additional-service-description">
              RD&D of innovative technologies in drilling automation, energy efficiency, 
              carbon management, and digital transformation for energy and resources sectors.
            </p>
          </div>
          <div className="additional-service-card">
            <h3 className="additional-service-title">Sustainable Energy Solutions</h3>
            <p className="additional-service-description">
              Investment and development in CCUS (Carbon Capture, Utilization & Storage), 
              hydrogen technologies, renewables integration, and emissions reduction solutions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta-section">
        <h2 className="cta-title">Need a Custom Solution?</h2>
        <p className="cta-description">
          Our team can design tailored equipment and service packages to meet your
          specific project requirements across the entire energy value chain.
        </p>
        <a href="/contact" className="btn-primary btn-large">
          Request a Quote
        </a>
      </section>
    </div>
  );
};

export default Services;