import mongoose from 'mongoose';

const contributorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'Contributor'
  }
});

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Short description is required']
  },
  fullDescription: {
    type: String,
    required: [true, 'Full description is required']
  },
  image: {
    type: String,
    required: [true, 'Project image is required']
  },
  features: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  contributors: [contributorSchema],
  repoLink: {
    type: String,
    required: [true, 'Repository link is required']
  },
  demoLink: {
    type: String
  },
  moreInfoLink: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Project', projectSchema);
