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
  taskLists: [],
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