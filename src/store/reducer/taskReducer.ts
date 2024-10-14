import { ADD_TASK, EDIT_TASK, DELETE_TASK } from '../actions/taskActions';
import { TaskType } from '../../type/taskType';

type TaskState = {
  nextId: number;
  taskLists: TaskType[];
};

type TaskAction =
  | { type: 'ADD_TASK'; payload: TaskType }
  | { type: 'EDIT_TASK'; payload: TaskType }
  | { type: 'DELETE_TASK'; payload: number };

const initialState = {
  taskLists: [
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
  ],
  nextId: 1,
};

const taskReducer = (state: TaskState = initialState, action: TaskAction) => {
  switch (action.type) {
    case ADD_TASK:
      {
        const newTask = { ...action.payload, id: state.nextId };
        return {
          ...state,
          taskLists: [...state.taskLists, newTask],
          nextId: state.nextId + 1
        };
      }
    case EDIT_TASK:
      return {
        ...state,
        taskLists: state.taskLists.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        taskLists: state.taskLists.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export default taskReducer;