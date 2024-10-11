import React from 'react'
import CardTask from './CardTask'
import { useModal } from '../context/ModalProvider'
import AddTaskComponent from './AddTaskComponent';
import { Button } from '@mui/material';
import { TaskLists } from '../mockdata/TaskList';

export default function TodoListComponent() {
  const { openModal } = useModal();

  const handleOpenAddTaskModal = () => {
    openModal(<AddTaskComponent />)
  };

  return (
    <div className='border-2 rounded-md p-10 m-[4%]'>
      <h1 className="text-2xl font-bold">
        To-Do Lists
      </h1>
      <div className='flex justify-between items-center my-6'>
        <div>
          <p className="text-1xl font-bold">My Tasks</p>
          <p>You have {TaskLists.filter(task => !task.isComplete).length} task(s) left</p>
        </div>
        <Button variant='outlined' onClick={handleOpenAddTaskModal}>Add Task</Button>
      </div>
      {
        TaskLists.map((task, index) => (
          <CardTask key={index} {...task} />
        ))
      }
    </div>
  )
}
