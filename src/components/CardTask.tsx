import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useModal } from '../context/ModalProvider';
import { TaskType } from '../type/taskType';
import ModalAddTask from './modal/ModalAddTask';
import ModalConfirmDelete from './modal/ModalConfirmDelete';

interface CardTaskProps extends TaskType {
  onEdit: (task: TaskType, isCheck?: boolean) => void;
  onDelete: (id: number) => void;
}

export default function CardTask({ id, title, description, due, isComplete, onEdit, onDelete }: CardTaskProps) {
  const { openModal, closeModal } = useModal();
  const [complete, setComplete] = useState(isComplete);

  const handleSetComplete = () => {
    setComplete(!complete);
    onEdit({ id, title, description, due, isComplete: !complete }, true);
  };

  const handleOpenDeleteModal = () => {
    openModal(<ModalConfirmDelete
      onClose={closeModal}
      onSubmit={handleDelete}
    />);
  }

  const handleDelete = () => {
    if (id) {
      onDelete(id);
      closeModal();
    }
  }

  const handleOpenEditModal = () => {
    openModal(<ModalAddTask
      task={{
        id: id,
        title: title,
        description: description,
        due: due,
        isComplete: isComplete
      }}
      onClose={closeModal}
      onSubmit={(task: TaskType) => onEdit(task)}
    />);
  };

  return (
    <div className='flex justify-between items-start border-2 rounded-md p-2 min-h-36 max-h-48'>
      <div className='flex items-start'>
        <Checkbox checked={complete} onChange={handleSetComplete} data-testid='checkbox-complete'/>
        <div className='justify-between mt-2 flex flex-col min-h-full'>
          <div>
            <p className='font-bold' style={complete ? { textDecoration: 'line-through' } : {}}>{title ?? 'Task 1'}</p>
            <p>{description ?? 'Lorem Ipsum'}</p>
          </div>
          <p>Due: {due ? new Date(due).toLocaleDateString() : '12/2/2024'}</p>
        </div>
      </div>
      <div className='flex items-start gap-4 mt-2'>
        <IconButton data-testid='task-edit-button' aria-label="edit" color='success' onClick={handleOpenEditModal}><EditIcon /></IconButton>
        <IconButton data-testid='task-delete-button' aria-label="delete" color='error' onClick={handleOpenDeleteModal}><DeleteIcon /></IconButton>
      </div>
    </div>
  );
}
