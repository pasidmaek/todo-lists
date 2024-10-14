import React, { useEffect, useState } from 'react';
import CardTask from './CardTask';
import { useModal } from '../context/ModalProvider';
import AddTaskComponent from './modal/ModalAddTask';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';
import { TaskType } from '../type/taskType';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask, deleteTask } from '../store/actions/taskActions';
import { toastComplete } from './ToastComponent';
import { filterOptions, NO_TASKS_MESSAGE } from '../utils';

export default function TodoListComponent() {
  const { openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const taskLists = useSelector((state: { taskLists: TaskType[] }) => state.taskLists);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Incomplete']);
  const [filteredTaskLists, setFilteredTaskLists] = useState<TaskType[]>([]);

  const handleOpenAddTaskModal = () => {
    openModal(<AddTaskComponent onClose={closeModal} onSubmit={handleAddTask} />);
  };

  const handleAddTask = (task: TaskType) => {
    dispatch(addTask(task));
    toastComplete('You have added a task');
  };

  const handleEditTask = (task: TaskType, isCheck?: boolean) => {
    const updatedTask: TaskType = { ...task };
    dispatch(editTask(updatedTask));
    if (!isCheck) {
      toastComplete('You have edited the task');
    }
  };

  const handleDeleteTask = (taskId: number) => {
    console.log('delete task', taskId);
    dispatch(deleteTask(taskId));
    toastComplete('You have deleted a task');
  };

  const handleFilterChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedFilters(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    const filteredTasks: TaskType[] = taskLists.filter(task =>
      (selectedFilters.includes('Completed') && task.isComplete) ||
      (selectedFilters.includes('Incomplete') && !task.isComplete)
    );
    setFilteredTaskLists(filteredTasks);
  }, [taskLists, selectedFilters]);

  return (
    <div className='border-2 rounded-md p-6 m-[4%] min-w-[480px]'>
      <h1 className="text-2xl font-bold">To-Do Lists</h1>
      <div className='flex justify-between items-center my-3'>
        <div>
          <p className="text-1xl font-bold">My Tasks</p>
          <p>You have {filteredTaskLists.filter(task => !task.isComplete).length} task(s) left</p>
        </div>
        <Button data-testid="add-task-button" id="add-task-button" variant='contained' onClick={handleOpenAddTaskModal}>
          Add Task
        </Button>
      </div>
      <div className='w-full flex justify-end'>
        <FormControl margin="normal">
          <Select
            labelId="filter-select-label"
            id="filter-tasks-button"
            multiple
            value={selectedFilters}
            onChange={handleFilterChange}
            displayEmpty
            renderValue={() => 'Filter Tasks'}
            data-testid="filter-tasks-select"
          >
            {/* <MenuItem key={'Completed'} value={'Completed'} data-testid={'filter-Completed'}>
              <Checkbox checked={selectedFilters.includes('Completed')} />
              <ListItemText primary={'Completed'} />
            </MenuItem>
            <MenuItem key={'Incomplete'} value={'Incomplete'} data-testid={'filter-Incomplete'}>
              <Checkbox checked={selectedFilters.includes('Incomplete')} />
              <ListItemText primary={'Incomplete'} />
            </MenuItem> */}
            {filterOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={selectedFilters.includes(option)} data-testid={option} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className='h-[600px] overflow-y-scroll'>
        {filteredTaskLists.length > 0 ? (
          filteredTaskLists.map((task) => (
            <div className='mb-2' key={task.id}>
              <CardTask {...task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
            </div>
          ))
        ) : (
          <div className='flex justify-center items-center my-10'>
            <p>{NO_TASKS_MESSAGE}</p>
          </div>
        )}
      </div>
    </div>
  );
}
