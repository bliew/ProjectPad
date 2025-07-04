import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import ProjectDialog from '../components/ProjectDialog';
import DetailDialog from '../components/DetailDialog';
import { getProjects, createProject } from '../lib/api';

function Dashboard() {
  //Project Dialog
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [reloadProjects, setReloadProjects] = useState(false);
  const [projects, setProjects] = useState([]);

  //Detail Dialog
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const [error, setError] = useState('');

  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjects(token);
        setProjects(projects);
      } catch (error) {
        setError(error.message || 'Error fetching projects');
      }
    };
    fetchProjects();
  }, [reloadProjects]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCreateProject = async ({ title, description, tasks }) => {
    await createProject({ title, description, tasks }, token);
    setReloadProjects((prev) => !prev);
  };

  const handleOpenDetailDialog = (project) => {
    setSelectedProject(project);
    setDetailDialogOpen(true);
  };

  const handleUpdateProject = async ({ id, title, description, tasks }) => {
    const updatedProject = await fetch(
      `https://projectpad-vnxa.onrender.com/api/projects/${id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          tasks,
        }),
      }
    );
    if (!updatedProject) {
      throw new Error('Error updating project');
    }
    setReloadProjects((prev) => !prev);
  };

  const handleDeleteProject = async ({ id }) => {
    const deletedProject = await fetch(
      `https://projectpad-vnxa.onrender.com/api/projects/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!deletedProject) {
      throw new Error('Error deleted project');
    }
    setReloadProjects((prev) => !prev);
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen overflow-auto">
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
      <div className="flex justify-center mb-10">
        <button
          className="bg-emerald-400 hover:bd=emerald-500 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
          onClick={() => setProjectDialogOpen(true)}
        >
          ✨ Create New Project
        </button>
      </div>
      <ProjectDialog
        open={projectDialogOpen}
        onClose={() => setProjectDialogOpen(false)}
        onCreate={handleCreateProject}
      />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            tasks={project.tasks}
            openDetail={() => handleOpenDetailDialog(project)}
            onDelete={(id) => handleDeleteProject({ id })}
          />
        ))}
      </div>
      <DetailDialog
        selectedProject={selectedProject}
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        onSubmit={handleUpdateProject}
      />
    </div>
  );
}

export default Dashboard;
