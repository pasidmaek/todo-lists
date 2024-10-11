import React, { useState } from 'react'
import { Button, Checkbox } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useModal } from '../context/ModalProvider';

type TaskProps = {
  title: string;
  description: string;
  due: Date;
  isComplete: boolean;
}

export default function CardTask({ title, description, due, isComplete }: TaskProps) {
  const [complete, setComplete] = useState(isComplete);
  const { openModal } = useModal();


  return (
    <div className='flex justify-between items-start border-2 rounded-md p-4 min-h-36 max-h-48'>
      <div className='flex items-start'>
        <Checkbox defaultChecked checked={complete} onChange={() => setComplete(!complete)} />
        <div className='justify-between mt-2 flex flex-col min-h-full'>
          <div>
            <p className='font-bold' style={complete ? { textDecoration: 'line-through' } : {}}>{title ?? 'Task 1'}</p>
            <p>{description ?? 'Lorem Ipsum'}</p>
          </div>
          <p>Due: {due ? new Date(due).toLocaleDateString() : '12/2/2024'}</p>
        </div>
      </div>
      <div className='flex items-start gap-4 mt-2'>
        <Button startIcon={<EditIcon color='success' />} />
        <Button startIcon={<DeleteIcon color='error' />} />
      </div>
    </div >
  )
}
