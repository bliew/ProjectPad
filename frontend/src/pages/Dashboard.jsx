import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import ProjectDialog from '../components/ProjectDialog';

function Dashboard({ username }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const projects = [
    {
      id: 1,
      title: 'Marketing Plan',
      description: 'Outline for Q2 campaign',
    },
    {
      id: 2,
      title: 'Landing Page',
      description: 'Redesign landing page for SEO',
    },
    {
      id: 3,
      title: 'Bug Fixes',
      description: 'Resolve issues from user feedback',
    },
  ];

  const navigate = useNavigate();
  function handleLogout() {
    navigate('/');
  }

  const handleCreateProject = (name) => {
    console.log('Project created', name);
  };
  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center text-lg font-bold">
            U
          </div>
          <span className="text-emerald-800 font-medium">
            Welcome, {username}
          </span>
        </div>
        <button
          className="text-sm bg-emerald-700 text-white px-4 py-1 rounded hover:bg-emerald-800 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <h2 className="text-3xl font-bold text-emerald-800 mb-8">Projects</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setDialogOpen(true)}
      >
        New Project
      </Button>
      <ProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreate={handleCreateProject}
      />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
