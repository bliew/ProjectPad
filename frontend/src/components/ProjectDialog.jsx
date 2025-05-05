import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

function ProjectDialog({ open, onClose, onCreate }) {
  const [projectName, setProjectName] = useState('');
  //const [projectDescription, setProjectDescription] = useState('');

  const handleCreate = () => {
    if (projectName.Name.trim()) {
      onCreate(projectname);
      setProjectName('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Project name"
          fullWidth
          variant={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClicke={onCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDialog;
