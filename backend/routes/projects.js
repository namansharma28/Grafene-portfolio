import express from 'express';
import Project from '../models/Project.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// Get single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
});

// Create new project (authenticated users only)
router.post('/', authenticate, async (req, res) => {
  try {
    // Check if project with this ID already exists
    const existingProject = await Project.findOne({ id: req.body.id });
    if (existingProject) {
      return res.status(400).json({ 
        message: 'A project with this ID already exists. Please use a different ID.' 
      });
    }

    const projectData = {
      ...req.body,
      createdBy: req.userId
    };

    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'A project with this ID already exists. Please use a different ID.' 
      });
    }
    
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
});

// Update project (authenticated users only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is the creator or admin
    if (project.createdBy.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    Object.assign(project, req.body);
    await project.save();

    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

// Delete project (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ id: req.params.id });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

export default router;
