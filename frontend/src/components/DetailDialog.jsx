import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

function DetailDialog({ selectedProject, open, onClose, onSubmit }) {
  const [projectDetails, setProjectDetails] = useState({
    id: '',
    title: '',
    description: '',
    tasks: [],
  });

  useEffect(() => {
    if (open && selectedProject) {
      console.log(selectedProject);
      setProjectDetails({
        id: selectedProject.id,
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
        id: '',
        title: '',
        description: '',
        tasks: [],
      });
      onClose();
    }
  };

  function handleUpdateTask(index, value) {
    const updatedTasks = [...projectDetails.tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      description: value,
    };
    setProjectDetails((prev) => ({ ...prev, tasks: updatedTasks }));
  }

  function handleDeleteTask(index) {
    const updatedTasks = projectDetails.tasks.filter((task, i) => i !== index);
    setProjectDetails((prev) => ({ ...prev, tasks: updatedTasks }));
  }

  function handleAddTask() {
    setProjectDetails((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { description: '' }],
    }));
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '20px',
          padding: '24px',
          backgroundColor: '#fdf6f0',
          fontFamily: `'Quicksand',sans-serif`,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: `'Quicksand', sans-serif`,
          fontWeight: '900',
          fontSize: '1rem',
          color: '#64748B',
        }}
      >
        🌱 Project Details
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          label="Project Title"
          margin="dense"
          fullWidth
          variant="outlined"
          value={projectDetails.title}
          onChange={(e) =>
            setProjectDetails((prev) => ({ ...prev, title: e.target.value }))
          }
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#fffdf7',
            },
          }}
        />
        <TextField
          margin="dense"
          label="Project Description"
          fullWidth
          multiline
          minRows={2}
          variant="outlined"
          value={projectDetails.description}
          onChange={(e) =>
            setProjectDetails((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#fffdf7',
            },
          }}
        />
        <div className="mt-4 p-2">
          <h1 className="text-slate-500  font-semibold mb-2">📔 Tasks</h1>
          {projectDetails.tasks.map((task, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <TextField
                fullWidth
                variant="outlined"
                value={task.description}
                onChange={(e) => handleUpdateTask(index, e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    backgroundColor: '#fff0f5',
                  },
                }}
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
        <Button onClick={handleSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailDialog;
