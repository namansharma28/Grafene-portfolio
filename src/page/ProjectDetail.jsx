import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../assets/components/Navbar";
import "./ProjectDetail.css";

// This would be replaced with actual data from backend later
const projectsData = [
  {
    id: "gravitas",
    image: "/projects/c5cd86843eaedd2a1ec8511e8c304b30.gif",
    title: "GRAVITAS",
    description: "An Event Management Software for Open-Source Collaboration...",
    fullDescription: "Gravitas is a comprehensive event management platform designed specifically for open-source communities. It streamlines the process of organizing hackathons, workshops, and collaborative coding sessions. With features like participant tracking, project submission, and real-time collaboration tools, Gravitas makes it easy to host successful tech events.",
    features: [
      "Real-time collaboration tools",
      "Project submission and evaluation system",
      "Participant tracking and management",
      "Event scheduling and notification system",
      "Integration with GitHub and other version control systems"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "GitHub API"],
    contributors: [
      {
        name: "Naman Sharma",
        image: "/contributors/Naman Sharma.jpg",
        role: "Lead Developer"
      }
    ],
    repoLink: "https://github.com/example/gravitas",
    demoLink: "https://example.com/gravitas"
  },
  {
    id: "pagebypage",
    image: "/projects/6a327caa4b5c102de396a1c3aaa20e98.gif",
    title: "PageByPage",
    description: "A platform bringing together students with diverse tech skills...",
    fullDescription: "PageByPage is an innovative platform that connects students from various technical backgrounds to collaborate on meaningful projects. It serves as a bridge between different disciplines, allowing students to form teams based on complementary skills and interests. The platform facilitates project discovery, team formation, and provides tools for effective collaboration.",
    features: [
      "Skill-based matching algorithm",
      "Project discovery and recommendation",
      "Team formation and management",
      "Integrated communication tools",
      "Progress tracking and milestone management"
    ],
    technologies: ["Vue.js", "Express", "PostgreSQL", "WebRTC", "AWS"],
    contributors: [
      {
        name: "Naman Sharma",
        image: "/contributors/Naman Sharma.jpg",
        role: "Frontend Developer"
      },
      {
        name: "Om",
        image: "/contributors/om photo.jpg",
        role: "Backend Developer"
      }
    ],
    repoLink: "https://github.com/example/pagebypage",
    demoLink: "https://example.com/pagebypage"
  }
];

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // This would be replaced with an API call in the future
    const foundProject = projectsData.find(p => p.id === projectId);
    
    // Simulate API call delay
    setTimeout(() => {
      setProject(foundProject || null);
      setLoading(false);
    }, 500);
  }, [projectId]);
  
  if (loading) {
    return (
      <div className="project-detail-container">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading project details...</p>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="project-detail-container">
        <Navbar />
        <div className="not-found-container">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="project-detail-container">
      <Navbar />
      
      <div className="project-header">
        <div className="project-image-container fade-in">
          <img src={project.image} alt={project.title} className="project-image" />
        </div>
        <div className="project-title-container">
          <h1 className="project-title slide-in-right">{project.title}</h1>
          <div className="project-links">
            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-link">
              <i className="fas fa-code"></i> View Code
            </a>
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
              <i className="fas fa-external-link-alt"></i> Live Demo
            </a>
          </div>
        </div>
      </div>
      
      <div className="project-content">
        <section className="project-section fade-in">
          <h2 className="section-title">About the Project</h2>
          <p className="project-description">{project.fullDescription}</p>
        </section>
        
        <section className="project-section slide-in-left">
          <h2 className="section-title">Features</h2>
          <ul className="features-list">
            {project.features.map((feature, index) => (
              <li key={index} className="feature-item">
                <span className="feature-bullet">•</span> {feature}
              </li>
            ))}
          </ul>
        </section>
        
        <section className="project-section slide-in-right">
          <h2 className="section-title">Technologies Used</h2>
          <div className="technologies-container">
            {project.technologies.map((tech, index) => (
              <span key={index} className="technology-tag">{tech}</span>
            ))}
          </div>
        </section>
        
        <section className="project-section fade-in">
          <h2 className="section-title">Contributors</h2>
          <div className="contributors-container">
            {project.contributors.map((contributor, index) => (
              <div key={index} className="contributor-card">
                <img src={contributor.image} alt={contributor.name} className="contributor-image" />
                <h3 className="contributor-name">{contributor.name}</h3>
                <p className="contributor-role">{contributor.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <div className="back-container">
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Projects
        </Link>
      </div>
    </div>
  );
}