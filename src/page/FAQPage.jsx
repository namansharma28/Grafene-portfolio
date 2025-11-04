import React, { useState } from "react";
import { Navbar } from "../assets/components/Navbar";
import "./index.css";
import { UniversalNavbar } from "../assets/components/universal-navbar";

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
  {
    question: "--> What is Grafene?",
    answer: "Grafene is a student-driven technology community under SOIT, RGPV, focused on innovation, collaboration, and real-world skill development. It serves as a bridge between learning and application by connecting students through tech projects, events, and mentorship."
  },
  {
    question: "--> How is Grafene different from other clubs?",
    answer: "Grafene isn’t just an event-based club — it’s a continuous ecosystem where students learn, build, and grow together. Members actively contribute to projects, collaborate across departments, and gain real-world exposure through technical and operational roles."
  },
  {
    question: "--> How is Grafene structured?",
    answer: "Grafene operates through two interconnected branches — Tech and Operations. The Tech branch focuses on development, AI/ML, and DSA, while the Operations branch (a subset of Tech) handles design, content, media, and management tasks that support all technical activities."
  },
  {
    question: "--> What departments are available under the Tech Branch?",
    answer: "The Tech Branch includes four main departments: Frontend Development, Backend Development, Artificial Intelligence & Machine Learning (AI/ML), and Data Structures & Algorithms (DSA). Each department encourages hands-on collaboration and innovation."
  },
  {
    question: "--> What does the Operations Branch do?",
    answer: "Operations members handle roles like social media management, graphic design, content writing, PR & management, and automation. They also work within their respective tech teams, ensuring that both innovation and execution go hand in hand."
  },
  {
    question: "--> Who can join Grafene?",
    answer: "Any SOIT student passionate about technology, creativity, or management can join Grafene. Whether you’re a coder, designer, writer, or strategist — there’s a place for you here."
  },
  {
    question: "--> How can I become a member?",
    answer: "Recruitment drives are announced on Grafene’s official social media handles and WhatsApp community. Interested students can apply through a simple registration process, followed by a short interaction or task evaluation."
  },
  {
    question: "--> Do I need prior experience to join?",
    answer: "Not at all! Grafene welcomes learners of all levels. The club provides mentorship, beginner-friendly sessions, and real projects to help you grow — whether you’re a complete beginner or an experienced coder."
  },
  {
    question: "--> What kind of projects does Grafene work on?",
    answer: "Grafene members work on a wide range of projects — from full-stack web applications to AI-based systems, automation tools, and event-related platforms. These projects often emerge from member ideas and evolve through collaboration."
  },
  {
    question: "--> What are the benefits of joining Grafene?",
    answer: "You’ll gain hands-on experience, learn from peers, build real projects, improve communication and teamwork skills, and strengthen your technical foundation — all while contributing to a growing tech community."
  },
  {
    question: "--> Can I be part of both Tech and Operations?",
    answer: "Yes! Grafene encourages dual participation. Members in Operations also belong to one of the Tech departments, so everyone stays technically involved while supporting creative and management activities."
  },
  {
    question: "--> How does Grafene help with placements or career growth?",
    answer: "Grafene provides exposure to collaborative projects, coding challenges, and industry-ready workflows. The experience helps members build strong portfolios, develop problem-solving skills, and improve confidence for interviews and internships."
  },
  {
    question: "--> Who leads Grafene?",
    answer: "Grafene is guided by faculty advisors from SOIT and led by a core student leadership team, including the Lead, Co-Lead, Senior Mentors, and Core Members, who coordinate all branches and initiatives."
  },
  {
    question: "--> How often does Grafene organize events?",
    answer: "Grafene regularly hosts coding challenges, hackathons, workshops, bootcamps, and interactive sessions with experts to keep students engaged and continuously learning."
  },
  {
    question: "--> What’s the meaning behind the name 'Grafene'?",
    answer: "Inspired by 'Graphene' — the strongest and most conductive material known — Grafene symbolizes strength, connection, and innovation in the technological world, representing how students unite to create impactful solutions."
  }
];


  return (
    <div className="main-container">
        <UniversalNavbar />
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
    </div>
  );
}