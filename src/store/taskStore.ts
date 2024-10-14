import { createStore } from 'redux';
import taskReducer from './reducer/taskReducer';

const store = createStore(taskReducer);

export default store;