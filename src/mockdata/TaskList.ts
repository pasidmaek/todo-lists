// export const TaskLists = [
//   {
//     id: 1,
//     title: 'Task 1',
//     description: 'Complete project report',
//     due: new Date('2024-10-15'),
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Task 2',
//     description: 'Prepare presentation slides',
//     due: new Date('2024-10-18'),
//     isComplete: true,
//   },
//   {
//     id: 3,
//     title: 'Task 3',
//     description: 'Fix bugs in the codebase',
//     due: new Date('2024-10-20'),
//     isComplete: false,
//   },
//   {
//     id: 4,
//     title: 'Task 4',
//     description: 'Review design documents',
//     due: new Date('2024-10-22'),
//     isComplete: true,
//   },
//   {
//     id: 5,
//     title: 'Task 5',
//     description: 'Attend team meeting',
//     due: new Date('2024-10-25'),
//     isComplete: false,
//   },
// ];

import { TaskType } from '../type/taskType';

export const TaskLists: TaskType[] = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Attend team meeting',
    due: new Date('2024-10-25'),
    isComplete: false,
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Review design documents',
    due: new Date('2024-10-22'),
    isComplete: true,
  },
];