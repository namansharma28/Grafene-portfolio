import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectsAPI } from '../services/api';
import { UniversalNavbar } from "../assets/components/universal-navbar";
import "../page/signup.css";

interface Contributor {
  name: string;
  image: string;
  role: string;
}

const UploadProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    fullDescription: '',
    image: '',
    features: '',
    technologies: '',
    repoLink: '',
    projectLink: ''
  });
  const [contributors, setContributors] = useState<Contributor[]>([
    { name: '', image: '', role: '' }
  ]);
  const [hasProjectLink, setHasProjectLink] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContributorChange = (index: number, field: keyof Contributor, value: string) => {
    const newContributors = [...contributors];
    newContributors[index][field] = value;
    setContributors(newContributors);
  };

  const addContributor = () => {
    setContributors([...contributors, { name: '', image: '', role: '' }]);
  };

  const removeContributor = (index: number) => {
    if (contributors.length > 1) {
      const newContributors = contributors.filter((_, i) => i !== index);
      setContributors(newContributors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const projectData = {
        id: formData.id.toLowerCase().replace(/\s+/g, '-'),
        title: formData.title,
        description: formData.description,
        fullDescription: formData.fullDescription,
        image: formData.image,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
        repoLink: formData.repoLink,
        demoLink: hasProjectLink ? formData.projectLink : '',
        moreInfoLink: hasProjectLink ? formData.projectLink : formData.repoLink,
        contributors: contributors.filter(c => c.name && c.image && c.role)
      };

      await projectsAPI.create(projectData);
      alert('Project uploaded successfully!');
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to upload project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <UniversalNavbar />
      <h2 className="auth-title">Upload Project</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      <form className="auth" onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <input
          type="text"
          name="id"
          placeholder="Project ID (e.g., my-project)"
          value={formData.id}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px' }}
        />
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px' }}
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={2}
          style={{ width: '100%', padding: '10px', margin: '10px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px' }}
        />
        <textarea
          name="fullDescription"
          placeholder="Full Description"
          value={formData.fullDescription}
          onChange={handleChange}
          required
          rows={4}
          style={{ width: '100%', padding: '10px', margin: '10px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px' }}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (e.g., /projects/image.gif)"
          value={formData.image}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px' }}
        />
        <input
          type="text"
          name="features"
          placeholder="Features (comma separated)"
          value={formData.features}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px' }}
        />
        <input
          type="text"
          name="technologies"
          placeholder="Technologies (comma separated)"
          value={formData.technologies}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px' }}
        />
        <input
          type="url"
          name="repoLink"
          placeholder="Repository Link"
          value={formData.repoLink}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px' }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '15px 0', color: 'white' }}>
          <input
            type="checkbox"
            id="hasProjectLink"
            checked={hasProjectLink}
            onChange={(e) => setHasProjectLink(e.target.checked)}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
          <label htmlFor="hasProjectLink" style={{ cursor: 'pointer' }}>Project has a live demo/website link</label>
        </div>

        {hasProjectLink && (
          <input
            type="url"
            name="projectLink"
            placeholder="Project Link (Live Demo/Website)"
            value={formData.projectLink}
            onChange={handleChange}
            required={hasProjectLink}
            style={{ width: '100%', padding: '10px', margin: '10px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px' }}
          />
        )}

        <h3 style={{ color: 'white', marginTop: '20px', marginBottom: '10px' }}>Contributors</h3>
        
        {contributors.map((contributor, index) => (
          <div key={index} style={{ border: '1px solid white', borderRadius: '15px', padding: '15px', margin: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 style={{ color: 'white', margin: 0 }}>Contributor {index + 1}</h4>
              {contributors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeContributor(index)}
                  style={{ background: '#ff4b33', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Remove
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Name"
              value={contributor.name}
              onChange={(e) => handleContributorChange(index, 'name', e.target.value)}
              required
              style={{ width: '100%', padding: '10px', margin: '5px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px' }}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={contributor.image}
              onChange={(e) => handleContributorChange(index, 'image', e.target.value)}
              required
              style={{ width: '100%', padding: '10px', margin: '5px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px' }}
            />
            <input
              type="text"
              placeholder="Role"
              value={contributor.role}
              onChange={(e) => handleContributorChange(index, 'role', e.target.value)}
              required
              style={{ width: '100%', padding: '10px', margin: '5px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px' }}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addContributor}
          style={{ width: '100%', padding: '10px', margin: '10px 0', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '15px', cursor: 'pointer' }}
        >
          + Add Another Contributor
        </button>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
          style={{ marginTop: '20px' }}
        >
          {loading ? 'Uploading...' : 'Upload Project'}
        </button>
      </form>
    </div>
  );
};

export default UploadProject;
