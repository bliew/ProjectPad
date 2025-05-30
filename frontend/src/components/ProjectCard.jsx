import TaskItem from './TaskItem';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

function ProjectCard({ id, title, description, tasks, openDetail, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      'Are you sure you want to delete this project?'
    );
    if (confirmed) {
      onDelete(id);
    }
  };
  return (
    <div
      onClick={openDetail}
      className="relative bg-[#f2f1e7] border-2 border-[#8b735b] rounded-xl shadow-[4px_4px_0px_0px_#8b735b] p-4 hover:shadow-[6px_6px_0px_0px_#8b735b] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 max-h-[300px] flex flex-col"
    >
      <IconButton
        onClick={handleDelete}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: '#fff',
          border: '1px solid #f8d7da',
          borderRadius: '12px',
          padding: '4px',
          color: '#e57373',
          '&:hover': {
            color: '#d32f2f',
            backgrounColor: '#fff5f5',
          },
          '& svg': {
            fontSize: '20px',
          },
        }}
      >
        <Delete />
      </IconButton>
      <h3 className="text-lg font-bold text-[#4e5d3c] mb-2">🌲{title}</h3>
      <p className="text-sm text-[#5c5a4d]">{description}</p>
      {tasks.length > 0 && (
        <div className="overflow-y-auto flex-1 pr-2">
          {tasks.map((task) => (
            <TaskItem key={task.id} description={task.description} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
