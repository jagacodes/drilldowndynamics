import React from 'react';
import { Briefcase, Award } from 'lucide-react';

const Leadership = () => {
  const leaders = [
    {
      name: 'Afusat Bimpe Byll',
      experience: '8+ Years',
      expertise: [
        'Human Resources Management',
        'Nigerian Oil & Gas Policy',
        'Stakeholder Engagement',
        'Technical Operations',
      ],
      description: 'Brings extensive experience in HR management and deep understanding of Nigerian oil and gas policy framework, ensuring compliance and strategic stakeholder relationships.',
    },
    {
      name: 'Bukola Ajayi',
      experience: '7+ Years',
      expertise: [
        'Project Management',
        'Sales & Commercial Operations',
        'Market Evaluation',
        'Procurement & Technical Delivery',
      ],
      description: 'Drives commercial success through strategic market evaluation, procurement excellence, and technical project delivery across oil and gas operations.',
    },
    {
      name: 'Oluchukwu Ogbu Esther',
      experience: '10+ Years',
      expertise: [
        'Oil & Gas Communications',
        'Strategic Planning',
        'Policy Direction',
        'Industry Relations',
      ],
      description: 'Leads strategic communications and policy direction, leveraging a decade of experience in positioning oil and gas initiatives and building industry relationships.',
    },
    {
      name: 'Abidemi Akinloye',
      experience: '15+ Years',
      expertise: [
        'Technical Deployment',
        'Project Management',
        'Operational Execution',
        'Technical Leadership',
      ],
      description: 'Provides technical leadership and operational excellence with 15+ years of hands-on experience in deploying and managing complex oil and gas projects.',
    },
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-hero-title">Leadership Team</h1>
          <p className="page-hero-description">
            Meet the experienced professionals driving innovation and excellence in
            oil and gas services across Africa.
          </p>
        </div>
      </section>

      {/* Team Intro */}
      <section className="team-intro-section">
        <div className="team-intro-content">
          <h2 className="section-title">25+ Years of Combined Expertise</h2>
          <p className="team-intro-text">
            Our leadership team combines deep industry knowledge, policy expertise, and
            technical deployment experience. Together, the partners bring technical
            proficiency with strategic vision to drive growth and operational excellence
            in Nigeria's oil and gas sector.
          </p>
        </div>
      </section>

      {/* Leadership Cards */}
      <section className="leadership-section">
        <div className="leadership-grid">
          {leaders.map((leader, index) => (
            <div key={index} className="leader-card">
              <div className="leader-header">
                <div className="leader-avatar">
                  {leader.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="leader-info">
                  <h3 className="leader-name">{leader.name}</h3>
                  <div className="leader-experience">
                    <Briefcase size={16} />
                    <span>{leader.experience} Experience</span>
                  </div>
                </div>
              </div>
              <p className="leader-description">{leader.description}</p>
              <div className="leader-expertise">
                <div className="expertise-title">
                  <Award size={18} />
                  <span>Key Expertise</span>
                </div>
                <div className="expertise-list">
                  {leader.expertise.map((skill, idx) => (
                    <span key={idx} className="expertise-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Track Record */}
      <section className="track-record-section">
        <h2 className="section-title">Our Track Record</h2>
        <div className="track-record-grid">
          <div className="track-record-item">
            <div className="track-record-icon">🌍</div>
            <h3 className="track-record-title">Local Expertise</h3>
            <p className="track-record-text">
              Deep familiarity with Nigerian operations and regulatory environment
            </p>
          </div>
          <div className="track-record-item">
            <div className="track-record-icon">🤝</div>
            <h3 className="track-record-title">IOC Relationships</h3>
            <p className="track-record-text">
              Proven expertise working with International Oil Companies
            </p>
          </div>
          <div className="track-record-item">
            <div className="track-record-icon">📋</div>
            <h3 className="track-record-title">PMP Certified</h3>
            <p className="track-record-text">
              Project Management Professional certification for excellence in delivery
            </p>
          </div>
          <div className="track-record-item">
            <div className="track-record-icon">🔧</div>
            <h3 className="track-record-title">Technical Deployment</h3>
            <p className="track-record-text">
              Extensive experience in operational execution and technical leadership
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;