import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TaskType } from '../../type/taskType';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { toastError } from '../ToastComponent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type ModalAddTaskProps = {
  task?: TaskType;
  onClose: () => void;
  onSubmit: (task: TaskType) => void;
}

export default function ModalAddTask({ task, onClose, onSubmit }: ModalAddTaskProps) {
  const [taskInfo, setTaskInfo] = useState({
    title: task?.title ?? '',
    description: task?.description ?? '',
    dueDate: task?.due ? dayjs(task.due) : null
  })
  const [isDraft, setIsDraft] = useState(false);

  const updateTaskInfo = (key: keyof typeof taskInfo, value: unknown) => {
    setTaskInfo(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskInfo.title && taskInfo.description && taskInfo.dueDate) {
      if (!taskInfo.dueDate || !dayjs(taskInfo.dueDate).isValid()) {
        toastError('Please select a valid due date.');
        return;
      }
      onSubmit({
        ...(task?.id && { id: task.id }),
        title: taskInfo.title,
        description: taskInfo.description,
        due: dayjs(taskInfo.dueDate).toDate(),
        isComplete: false
      });
      setTaskInfo({
        title: '',
        description: '',
        dueDate: null
      })
      localStorage.removeItem('draft-task');
      onClose();
    } else {
      toastError('You have to fill all inputs');
    }
  };

  useEffect(() => {
    if (!task) {
      const draftTask = localStorage.getItem('draft-task');
      if (draftTask) {
        const drafted = JSON.parse(draftTask);
        setIsDraft(true);
        setTaskInfo({ ...drafted, dueDate: drafted.dueDate ? dayjs(drafted.dueDate) : null });
      }
    }
  }, [task]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('draft-task', JSON.stringify(taskInfo));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [taskInfo]);

  return (
    <Dialog open onClose={onClose} className='min-w-[480px]'>
      <DialogTitle className='flex items-center '>
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
        <div className='flex items-center gap-2' data-testid='title-task'>
          <h1 className='font-bold'>
            {task ? 'Edit' : 'Add'} Task
          </h1>
          <p className='text-xs'>
            {isDraft && '[Draft]'}
          </p>
        </div>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            data-testid='title-task-input'
            label="Title *"
            value={taskInfo.title}
            onChange={(e) => updateTaskInfo('title', e.target.value)}
            fullWidth
            margin='dense'
          />
          <TextField
            data-testid='description-task-input'
            label="Description *"
            value={taskInfo.description}
            onChange={(e) => updateTaskInfo('description', e.target.value)}
            margin='dense'
            fullWidth
            multiline
            rows={4}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              data-testid='due-date-task-input'
              className='w-full'
              sx={{
                marginY: 1
              }}
              label="Due Date *"
              value={taskInfo.dueDate}
              onChange={(newValue) => updateTaskInfo('dueDate', newValue)}
              minDate={task ? dayjs(task.due) : dayjs().startOf('day')}
            />
          </LocalizationProvider>
          <DialogActions sx={{ padding: 0, marginY: 1 }}>
            <Button
              className='w-full mt-4'
              variant='contained'
              type="submit"
              color="primary"
              daa-testid='submit-task-button'
            >
              {task ? 'Edit' : 'Add'} Task
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}