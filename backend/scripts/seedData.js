import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Project from '../models/Project.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from backend directory
dotenv.config({ path: join(__dirname, '../.env') });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin',
      mobile: '1234567890',
      password: 'admin123',
      role: 'admin'
    });

    // Create sample projects
    const projects = [
      {
        id: 'gravitas',
        title: 'GRAVITAS',
        description: 'An Event Management Software for Open-Source Collaboration...',
        fullDescription: 'Gravitas is a comprehensive event management platform designed specifically for open-source communities. It streamlines the process of organizing hackathons, workshops, and collaborative coding sessions. With features like participant tracking, project submission, and real-time collaboration tools, Gravitas makes it easy to host successful tech events.',
        image: '/projects/c5cd86843eaedd2a1ec8511e8c304b30.gif',
        features: [
          'Real-time collaboration tools',
          'Project submission and evaluation system',
          'Participant tracking and management',
          'Event scheduling and notification system',
          'Integration with GitHub and other version control systems'
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'GitHub API'],
        contributors: [
          {
            name: 'Naman Sharma',
            image: '/contributors/Naman Sharma.jpg',
            role: 'Lead Developer'
          }
        ],
        repoLink: 'https://gravitas.page',
        demoLink: 'https://gravitas.page',
        moreInfoLink: 'https://gravitas.page',
        createdBy: adminUser._id
      },
      {
        id: 'pagebypage',
        title: 'PageByPage',
        description: 'A platform bringing together students with diverse tech skills...',
        fullDescription: 'PageByPage is an innovative platform that connects students from various technical backgrounds to collaborate on meaningful projects. It serves as a bridge between different disciplines, allowing students to form teams based on complementary skills and interests. The platform facilitates project discovery, team formation, and provides tools for effective collaboration.',
        image: '/projects/6a327caa4b5c102de396a1c3aaa20e98.gif',
        features: [
          'Skill-based matching algorithm',
          'Project discovery and recommendation',
          'Team formation and management',
          'Integrated communication tools',
          'Progress tracking and milestone management'
        ],
        technologies: ['Vue.js', 'Express', 'PostgreSQL', 'WebRTC', 'AWS'],
        contributors: [
          {
            name: 'Naman Sharma',
            image: '/contributors/Naman Sharma.jpg',
            role: 'Frontend Developer'
          },
          {
            name: 'Om',
            image: '/contributors/om photo.jpg',
            role: 'Backend Developer'
          }
        ],
        repoLink: 'https://github.com/example/pagebypage',
        demoLink: 'https://example.com/pagebypage',
        moreInfoLink: 'https://example.com/pagebypage',
        createdBy: adminUser._id
      }
    ];

    await Project.insertMany(projects);
    console.log('Sample data seeded successfully');
    console.log('\nAdmin credentials:');
    console.log('Mobile: 1234567890');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
