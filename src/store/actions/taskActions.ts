import { TaskType } from "../../type/taskType";

export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_TASKS = 'SET_TASKS';

export const addTask = (task: TaskType) => ({ type: ADD_TASK, payload: task });
export const editTask = (task: TaskType) => ({ type: EDIT_TASK, payload: task });
export const deleteTask = (taskId: number) => ({ type: DELETE_TASK, payload: taskId });
export const setTasks = (tasks: TaskType) => ({ type: SET_TASKS, payload: tasks });