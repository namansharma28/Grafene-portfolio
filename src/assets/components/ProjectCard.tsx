// ProjectCard.tsx
import React from "react";


interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  contributors: string[]; // Array of contributor image URLs
  repoLink: string;
  moreInfoLink: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  description,
  contributors,
  repoLink,
  moreInfoLink,
}) => {
  return (
    <div className=" project-card">
      <img src={image} alt={title} className="project-image" />
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p >{description}</p>
        <div className="flex items-center gap-2 my-2">
          {contributors.map((contributor, index) => (
            <img
              key={index}
              src={contributor}
              alt="Contributor"
              className="cont-image w-8 h-8 rounded-full border border-gray-600"
            />
          ))}
        </div>
        <div className="buttons">
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Repository
          </a>
          <a
            href={moreInfoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Know More
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
