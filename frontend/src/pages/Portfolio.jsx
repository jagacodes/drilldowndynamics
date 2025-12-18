import React from 'react';
import { MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: 'Offshore Drilling Platform Support',
      location: 'Niger Delta, Nigeria',
      year: '2024',
      category: 'Offshore Operations',
      description: 'Provided comprehensive equipment rental and technical support for offshore drilling platform operations, including specialized machinery and engineering expertise.',
      services: [
        'Drilling rig rental',
        'Logging equipment',
        'Technical personnel deployment',
        '24/7 operational support',
      ],
      image: 'https://images.unsplash.com/photo-1578356058390-f58c575337a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxvZmZzaG9yZSUyMG9pbCUyMHJpZ3xlbnwwfHx8fDE3NjYxMDEwMzR8MA&ixlib=rb-4.1.0&q=85',
    },
    {
      title: 'Onshore Well Construction',
      location: 'Lagos State, Nigeria',
      year: '2024',
      category: 'Onshore Operations',
      description: 'Delivered complete drilling and engineering solutions for onshore well construction project, ensuring safety and efficiency throughout the operation.',
      services: [
        'Drilling equipment rental',
        'Engineering consultation',
        'Project management',
        'Safety compliance',
      ],
      image: 'https://images.unsplash.com/photo-1624771002998-4aadfd43e7c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxvaWxmaWVsZHxlbnwwfHx8fDE3NjYxMDEwNDZ8MA&ixlib=rb-4.1.0&q=85',
    },
    {
      title: 'Reservoir Evaluation Services',
      location: 'Delta State, Nigeria',
      year: '2024',
      category: 'Technical Services',
      description: 'Advanced reservoir evaluation and logging support services for major IOC client, utilizing cutting-edge technology for accurate formation assessment.',
      services: [
        'Advanced logging equipment',
        'Reservoir characterization',
        'Real-time data analysis',
        'Technical reporting',
      ],
      image: 'https://images.unsplash.com/photo-1572970388430-a7fff761e597?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxvaWxmaWVsZHxlbnwwfHx8fDE3NjYxMDEwNDZ8MA&ixlib=rb-4.1.0&q=85',
    },
    {
      title: 'Multi-Well Drilling Campaign',
      location: 'Rivers State, Nigeria',
      year: '2024',
      category: 'Offshore Operations',
      description: 'Long-term equipment rental and support for multi-well drilling campaign, providing consistent reliability and technical excellence across multiple drilling sites.',
      services: [
        'Multiple rig deployments',
        'Logistics coordination',
        'Maintenance support',
        'Technical training',
      ],
      image: 'https://images.unsplash.com/photo-1690508313456-bf8c851e8319?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHw0fHxvZmZzaG9yZSUyMG9pbCUyMHJpZ3xlbnwwfHx8fDE3NjYxMDEwMzR8MA&ixlib=rb-4.1.0&q=85',
    },
  ];

  const capabilities = [
    {
      title: 'Offshore Operations',
      description: 'Comprehensive support for offshore drilling platforms and deep-water operations',
      count: '15+',
      label: 'Projects',
    },
    {
      title: 'Onshore Operations',
      description: 'Complete land-based drilling and well construction services',
      count: '20+',
      label: 'Projects',
    },
    {
      title: 'Equipment Fleet',
      description: 'State-of-the-art drilling rigs and specialized machinery',
      count: '50+',
      label: 'Assets',
    },
    {
      title: 'Technical Personnel',
      description: 'Experienced engineers and technical specialists',
      count: '100+',
      label: 'Experts',
    },
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-hero-title">Our Portfolio</h1>
          <p className="page-hero-description">
            Showcasing our proven track record in delivering exceptional oil and gas
            equipment rental and support services across Nigeria.
          </p>
        </div>
      </section>

      {/* Capabilities Overview */}
      <section className="capabilities-section">
        <h2 className="section-title">Our Capabilities</h2>
        <div className="capabilities-grid">
          {capabilities.map((capability, index) => (
            <div key={index} className="capability-card">
              <div className="capability-number">{capability.count}</div>
              <div className="capability-label">{capability.label}</div>
              <h3 className="capability-title">{capability.title}</h3>
              <p className="capability-description">{capability.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="projects-section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-category">{project.category}</div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-meta">
                  <div className="project-meta-item">
                    <MapPin size={16} />
                    <span>{project.location}</span>
                  </div>
                  <div className="project-meta-item">
                    <Calendar size={16} />
                    <span>{project.year}</span>
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-services">
                  <h4 className="project-services-title">Services Provided:</h4>
                  <div className="project-services-list">
                    {project.services.map((service, idx) => (
                      <div key={idx} className="project-service-item">
                        <CheckCircle2 size={16} />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="portfolio-cta-section">
        <h2 className="cta-title">Start Your Next Project With Us</h2>
        <p className="cta-description">
          Let's discuss how our proven expertise and comprehensive equipment fleet can
          support your upcoming operations.
        </p>
        <a href="/contact" className="btn-primary btn-large">
          Get in Touch
        </a>
      </section>
    </div>
  );
};

export default Portfolio;