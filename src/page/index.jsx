import React from "react";
import "./index.css";
import ProjectCard from "../assets/components/ProjectCard";

const projects = [
  {
    image: "/projects/c5cd86843eaedd2a1ec8511e8c304b30.gif",
    title: "GRAVITAS",
    description:
      "An Event Management Software for Open-Source Collaboration...",
    contributors: [
      "/contributors/Naman Sharma.jpg",
      "/contributors/om photo.jpg",
    ],
    repoLink: "https://github.com/example/gravitas",
    moreInfoLink: "https://example.com/gravitas",
  },
  {
    image: "/projects/6a327caa4b5c102de396a1c3aaa20e98.gif",
    title: "PageByPage",
    description:
      "A platform bringing together students with diverse tech skills...",
    contributors: [
      "/contributors/Naman Sharma.jpg",
      "/contributors/om photo.jpg",
    ],
    repoLink: "https://github.com/example/pagebypage",
    moreInfoLink: "https://example.com/pagebypage",
  },
  
];

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = React.useState(null);

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
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.svg" alt="Grafene" />
        </div>
        <div className="menu-icon">
          <div className="line"></div>
        </div>
      </nav>
      <div className="background">
        <div className="blur-circle circle-1"></div>
        <div className="blur-circle circle-2"></div>
        <div className="blur-circle circle-3"></div>
        <div className="blur-circle circle-4"></div>
        <div className="blur-circle circle-5"></div>
        <div className="blur-circle circle-6"></div>
      </div>
      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">
          <h1 className="main-title">
            <span className="bracket">{`<`}</span>
            <span className="slash">/</span>
            <span className="text">Grafene</span>
            <span className="bracket">{`>`}</span>
          </h1>
          <h2>
            <p className="subtitle">
              Build together, like Carbon atoms in Graphene
            </p>
          </h2>
          <p className="description">
            Grafene is a student-driven community for open-source collaboration.
            We bring together students with diverse tech skills to learn, build,
            and contribute to real-world projects.
          </p>
          <button className="cta-button">
            <span>Projects </span>
            <span> {`>`} </span>{" "}
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects" id="projects">
        <h2>PROJECTS</h2>
        <p className="section-subtitle">Strong Bonds, Powerful Projects</p>

        <div className="project-cards">
          <div className="projectAl">
          <div className="flex flex-col items-center gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div></div>
      </section>

      {/* Contact Section */}
      <section className="contacts" id="cont">
        <h2>CONTACTS</h2>
        <p className="section-subtitle">Strong Bonds Drive Me Further</p>

        <div className="contact-links">
          <a href="#" className="contact-link">
            <span className="hash">#</span>
            <span>Apps/GitHub-page:</span>
            <span className="value">@Grafene</span>
          </a>
          <a href="#" className="contact-link">
            <span className="hash">#</span>
            <span>Apps/LinkedIn:</span>
            <span className="value">@Grafene</span>
          </a>
          <a href="#" className="contact-link">
            <span className="hash">#</span>
            <span>Apps/E-mail:</span>
            <span className="value">grafene.gmail.com</span>
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
