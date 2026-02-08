import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../assets/components/Navbar";
import { projectsAPI } from '../services/api';
import SmartImage from '../components/SmartImage';
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log('Fetching project with ID:', projectId);
        const response = await projectsAPI.getById(projectId);
        console.log('Project data received:', response.data);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        console.error('Error details:', error.response?.data);
        setProject(null);
        setLoading(false);
      }
    };

    fetchProject();
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
          <SmartImage 
            src={project.image} 
            alt={project.title} 
            fallbackName={project.title}
            className="project-image" 
          />
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
                <SmartImage 
                  src={contributor.image} 
                  alt={contributor.name} 
                  fallbackName={contributor.name}
                  className="contributor-image" 
                />
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