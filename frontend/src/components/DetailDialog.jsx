import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

function DetailDialog({ selectedProject, open, onClose, onSubmit }) {
  const [project, setProject] = useState([]);
  const [error, setError] = useState('');
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
    tasks: [],
  });

  useEffect(() => {
    if (open && selectedProject) {
      console.log(selectedProject);
      setProjectDetails({
        title: selectedProject.title || '',
        description: selectedProject.description || '',
        tasks: selectedProject.tasks || [],
      });
    }
  }, [open, selectedProject]);

  const handleSubmit = () => {
    if (projectDetails) {
      onSubmit(projectDetails);
      setProjectDetails({
        title: '',
        description: '',
        tasks: [],
      });
      onClose();
    }
  };

  function handleUpdateTask(index, value) {
    const updatedTasks = [...projectDetails.tasks];
    updatedTasks[index] = value;
    setProjectDetails((prev) => ({ ...prev, tasks: updatedTasks }));
  }

  function handleDeleteTask(index) {
    const updatedTasks = projectDetails.tasks.filter((task, i) => i !== index);
    setProjectDetails((prev) => ({ ...prev, tasks: updatedTasks }));
  }

  function handleAddTask() {
    setProjectDetails((prev) => ({ ...prev, tasks: [...prev.tasks, ''] }));
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px',
          padding: '16px',
          backgroundColor: '#f0fdf4',
        },
      }}
    >
      <DialogTitle className="text-emerald-800 font-semibold"></DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Project Title"
          fullWidth
          variant="outlined"
          value={projectDetails.title}
          onChange={(e) =>
            setProjectDetails((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <TextField
          autoFocus
          margin="dense"
          label="Project Description"
          fullWidth
          variant="outlined"
          value={projectDetails.description}
          onChange={(e) =>
            setProjectDetails((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        <div className="mt-4 outline-dashed outline-emerald-700 outline-1 p-2">
          <h4 className="text-emerald-700 font-semibold mb-2">Tasks</h4>
          {projectDetails.tasks.map((task, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <TextField
                fullWidth
                variant="outlined"
                value={task.description}
                onChange={(e) => handleUpdateTask(index, e.target.value)}
              />
              <IconButton onClick={() => handleDeleteTask(index)} color="error">
                <Delete />
              </IconButton>
            </div>
          ))}
          <Button
            onClick={handleAddTask}
            startIcon={<Add />}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Task
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailDialog;
