import React, { useEffect, useState } from "react";
import "./index.css";
import ProjectCard from "../assets/components/ProjectCard";
import { Navbar } from "../assets/components/Navbar";

const projects = [
  {
    id: "gravitas",
    image: "/projects/c5cd86843eaedd2a1ec8511e8c304b30.gif",
    title: "GRAVITAS",
    description:
      "An Event Management Software for Open-Source Collaboration...",
    contributors: [
      "/contributors/Naman Sharma.jpg",
    ],
    repoLink: "https://gravitas.page",
    moreInfoLink: "https://example.com/gravitas",
  },
  // {
  //   id: "pagebypage",
  //   image: "/projects/6a327caa4b5c102de396a1c3aaa20e98.gif",
  //   title: "PageByPage",
  //   description:
  //     "A platform bringing together students with diverse tech skills...",
  //   contributors: [
  //     "/contributors/Naman Sharma.jpg",
  //     "/contributors/om photo.jpg",
  //   ],
  //   repoLink: "https://github.com/example/pagebypage",
  //   moreInfoLink: "https://example.com/pagebypage",
  // },
  
];

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorEnlarged, setCursorEnlarged] = useState(false);
  
  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleLinkHover = () => {
      setCursorEnlarged(true);
    };
    
    const handleLinkLeave = () => {
      setCursorEnlarged(false);
    };
    
    document.addEventListener('mousemove', moveCursor);
    
    const links = document.querySelectorAll('a, button, .faq-question');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });
    
    // Animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
      
      document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "--> What is Grafene?",
      answer: "Grafene is a student-driven community for open-source collaboration.",
    },
    {
      question: "--> How can I contribute?",
      answer: "You can contribute by joining our projects and sharing your skills.",
    },
    {
      question: "--> Is there a membership fee?",
      answer: "No, Grafene is completely free to join.",
    },
    {
      question: "--> Where can I find more information?",
      answer: "You can find more information on our website and GitHub page.",
    },
  ];

  return (
    <div className="main-container">
      {/* Custom Cursor */}
      <div 
        className={`cursor-dot ${cursorEnlarged ? 'cursor-enlarged' : ''}`} 
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      ></div>
      <div 
        className={`cursor-outline ${cursorEnlarged ? 'cursor-enlarged' : ''}`} 
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      ></div>
      
      {/* Navbar */}
      <Navbar />
      {/* <div className="background">
        <img src="/rings/grafene_ring_white.png" alt="Ring" className="ring ring-1" />
        <img src="/rings/ring2.png" alt="Ring" className="ring ring-2" />
        <img src="/rings/ring3.png" alt="Ring" className="ring ring-3" />
        <img src="/rings/ring3.1.png" alt="Ring" className="ring ring-4" />
        <img src="/rings/ring4.png" alt="Ring" className="ring ring-5" />
      </div> */}
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="main-title slide-in-left">
            <span className="bracket">{`<`}</span>
            <span className="slash">/</span>
            <span className="text">Grafene</span>
            <span className="bracket">{`>`}</span>
          </h1>
          <h2>
            <p className="subtitle slide-in-right">
              Build together, like Carbon atoms in Graphene
            </p>
          </h2>
          <p className="description fade-in">
            Grafene is a student-driven community for open-source collaboration.
            We bring together students with diverse tech skills to learn, build,
            and contribute to real-world projects.
          </p>
          <button className="cta-button fade-in">
            <span>Projects </span>
            <span> {`>`} </span>{" "}
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section fade-in">
        <div className="about-container">
          <h2 className="about-title">About Grafene</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Grafene is inspired by the molecular structure of Graphene - where carbon atoms form a strong, flexible network. Similarly, we connect students with diverse skills to create powerful tech solutions.</p>
              <p>Our mission is to provide a collaborative platform where students can gain real-world experience, build impressive portfolios, and contribute to meaningful open-source projects.</p>
              <p>Whether you're a developer, designer, writer, or project manager, there's a place for you in our community.</p>
            </div>
            {/* <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">150+</span>
                <span className="stat-label">Contributors</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Universities</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects" id="projects">
        <h2>PROJECTS</h2>
        <p className="section-subtitle fade-in">Strong Bonds, Powerful Projects</p>

        <div className="project-cards">
          <div className="projectAl">
          <div className="flex flex-col items-center gap-6">
            {projects.map((project, index) => (
              <div key={index} className={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}>
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div></div>
      </section>

      {/* Team Section */}
      {/* <section className="team-section" id="team">
        <h2 className="section-title fade-in">OUR TEAM</h2>
        <p className="section-subtitle fade-in">Passionate Developers Building the Future</p>
        
        <div className="team-grid">
          <div className="team-member fade-in">
            <img src="/contributors/Naman Sharma.jpg" alt="Team Member" className="member-image" />
            <h3>Naman Sharma</h3>
            <p>Lead Developer</p>
            <div className="member-socials">
              <a href="#" className="social-link"><i className="fab fa-github"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className="team-member fade-in">
            <img src="/contributors/om photo.jpg" alt="Team Member" className="member-image" />
            <h3>Om</h3>
            <p>Backend Developer</p>
            <div className="member-socials">
              <a href="#" className="social-link"><i className="fab fa-github"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className="team-member fade-in">
            <div className="member-image-placeholder"></div>
            <h3>Alex Johnson</h3>
            <p>UI/UX Designer</p>
            <div className="member-socials">
              <a href="#" className="social-link"><i className="fab fa-github"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className="team-member fade-in">
            <div className="member-image-placeholder"></div>
            <h3>Sam Wilson</h3>
            <p>Project Manager</p>
            <div className="member-socials">
              <a href="#" className="social-link"><i className="fab fa-github"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </section> */}

      {/* Timeline Section */}
      {/* <section className="timeline-section" id="timeline">
        <h2 className="section-title fade-in">OUR JOURNEY</h2>
        <p className="section-subtitle fade-in">Milestones That Define Our Growth</p>
        
        <div className="timeline">
          <div className="timeline-item fade-in">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2023</h3>
              <h4>Project Launch</h4>
              <p>Grafene was founded with a vision to revolutionize open-source collaboration.</p>
            </div>
          </div>
          <div className="timeline-item fade-in">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2023</h3>
              <h4>First Major Release</h4>
              <p>Successfully launched our first project GRAVITAS, gaining significant community interest.</p>
            </div>
          </div>
          <div className="timeline-item fade-in">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2024</h3>
              <h4>Community Growth</h4>
              <p>Expanded our team and community contributors, reaching new milestones.</p>
            </div>
          </div>
          <div className="timeline-item fade-in">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2024</h3>
              <h4>Future Vision</h4>
              <p>Working on exciting new projects and expanding our technological horizons.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Technologies Section */}
      {/* <section className="technologies-section" id="technologies">
        <h2 className="section-title fade-in">OUR TECH STACK</h2>
        <p className="section-subtitle fade-in">Cutting-Edge Technologies We Work With</p>
        
        <div className="tech-grid">
          <div className="tech-item fade-in">
            <div className="tech-icon">
              <i className="fab fa-react"></i>
            </div>
            <h3>React</h3>
            <p>Building interactive UIs with the most popular frontend library</p>
          </div>
          <div className="tech-item fade-in">
            <div className="tech-icon">
              <i className="fab fa-node-js"></i>
            </div>
            <h3>Node.js</h3>
            <p>Powering our backend with fast, scalable JavaScript runtime</p>
          </div>
          <div className="tech-item fade-in">
            <div className="tech-icon">
              <i className="fab fa-python"></i>
            </div>
            <h3>Python</h3>
            <p>Versatile language for data processing and automation</p>
          </div>
          <div className="tech-item fade-in">
            <div className="tech-icon">
              <i className="fas fa-database"></i>
            </div>
            <h3>MongoDB</h3>
            <p>Flexible NoSQL database for modern applications</p>
          </div>
        </div>
      </section> */}
      <section className="contacts" id="contact">
        <h2>CONTACTS</h2>
        <p className="section-subtitle">Strong Bonds Drive Me Further</p>

        <div className="contact-links">
          {/* <a href="#" className="contact-link">
            <span className="hash">#</span>
            <span>Apps/GitHub-page:</span>
            <span className="value">@Grafene</span>
          </a> */}
          <a href="https://instagram.com/grafenesoit" className="contact-link">
            <span className="hash">#</span>
            <span>Apps/Instagram:</span>
            <span className="value">@Grafenesoit</span>
          </a>
          <a href="mailto:grafenesoit@gmail.com" className="contact-link">
            <span className="hash">#</span>
            <span>Apps/E-mail:</span>
            <span className="value">grafenesoit@gmail./com</span>
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq" id="faq">
        <h2>Frequently Asked Questions</h2>
        <p className="section-subtitle">Strong Bonds Drive Me Further</p>

        <div className="faq-items">
          {faqData.map((item, index) => (
            <div className="faq-item" key={index}>
              <h3 onClick={() => toggleFAQ(index)} className="faq-question">
                {item.question}
              </h3>
              {activeIndex === index && <p className="faq-answer">{item.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="logo">
          <img src="/logo.svg" alt="Grafene" />
        </div>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#projects">Projects</a>
          <a href="#cont">Contacts</a>
          <a href="#faq">FAQs</a>
        </div>
      </footer>
    </div>
  );
}
