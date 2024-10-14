import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoListComponent from './TodoListComponent';
import { ModalProvider } from '../context/ModalProvider';
import userEvent from '@testing-library/user-event';
import { NO_TASKS_MESSAGE } from '../utils';
import { Store } from 'redux';

const mockStore = configureStore([]);

describe('TodoListComponent', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      taskLists: [
        {
          id: 1,
          title: 'Task 1',
          description: 'Attend team meeting',
          due: new Date('2024-10-25'),
          isComplete: false
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Review design documents',
          due: new Date('2024-10-22'),
          isComplete: true
        },
      ],
    });
  });

  test('renders TodoListComponent correctly', () => {
    render(
      <Provider store={store}>
        <ModalProvider>
          <TodoListComponent />
        </ModalProvider>
      </Provider>
    );

    expect(screen.getByText('To-Do Lists')).toBeInTheDocument();
    expect(screen.getByText('My Tasks')).toBeInTheDocument();
    expect(screen.getByText('You have 1 task(s) left')).toBeInTheDocument();
    expect(screen.getByTestId('add-task-button')).toBeInTheDocument();
  });

  test('filters tasks correctly based on selected filters', async () => {
    render(
      <Provider store={store}>
        <ModalProvider>
          <TodoListComponent />
        </ModalProvider>
      </Provider>
    );

    const filterDropdown = within(await screen.findByTestId("filter-tasks-select")).getByRole(
      "combobox",
    );
    await userEvent.click(filterDropdown);
    expect(
      await screen.findByRole("option", { name: "Completed" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("option", { name: "Incomplete" }),
    ).toBeInTheDocument();

    await userEvent.click(await screen.findByRole("option", { name: "Completed" }));
    expect(screen.getByText("Completed")).toBeInTheDocument();
    await userEvent.click(await screen.findByRole("option", { name: "Incomplete" }));
    expect(screen.getByText("Incomplete")).toBeInTheDocument();

    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  });

  test('add new task correctly', async () => {
    const newTask = {
      title: 'Test Add Task',
      description: 'Add new Task Description',
      due: new Date('2024-10-20'),
    };

    render(
      <Provider store={store}>
        <ModalProvider>
          <TodoListComponent />
        </ModalProvider>
      </Provider>
    );

    const addTaskButton = await screen.findByTestId('add-task-button');
    await userEvent.click(addTaskButton);

    await waitFor(() => screen.findByTestId("modal-dialog"));

    await userEvent.type(screen.getByLabelText('Title *'), newTask.title);
    await userEvent.type(screen.getByLabelText('Description *'), newTask.description);
    await userEvent.type(screen.getByLabelText('Due Date *'), newTask.due.toISOString().split('T')[0]);

    const addSubmitButton = await screen.findByRole('button', { name: 'Add Task' });
    await userEvent.click(addSubmitButton);

    expect(screen.getByText(newTask.title)).toBeInTheDocument();
  });

  test('does not add task when required fields are empty', async () => {
    render(
      <Provider store={store}>
        <ModalProvider>
          <TodoListComponent />
        </ModalProvider>
      </Provider>
    );

    const addTaskButton = await screen.findByTestId('add-task-button');
    await userEvent.click(addTaskButton);

    await waitFor(() => screen.findByTestId("modal-dialog"));

    const addSubmitButton = await screen.findByRole('button', { name: 'Add Task' });
    await userEvent.click(addSubmitButton);

    expect(screen.getByText('You have to fill all inputs')).toBeInTheDocument();
  });

  test('edit task correctly', async () => {
    const newTask = {
      title: 'Test Edit Task',
      description: 'Edit new Task Description',
      due: new Date('2024-10-22'),
    };

    render(
      <Provider store={store}>
        <ModalProvider>
          <TodoListComponent />
        </ModalProvider>
      </Provider>
    );

    const taskElement = await screen.findByTestId('task-card-1');

    const addTaskButton = within(taskElement).getByTestId('edit-task-button-1');
    await userEvent.click(addTaskButton);

    await waitFor(() => screen.findByTestId("modal-dialog"));

    await userEvent.type(screen.getByLabelText('Title *'), newTask.title);
    await userEvent.type(screen.getByLabelText('Description *'), newTask.description);
    await userEvent.type(screen.getByLabelText('Due Date *'), newTask.due.toISOString().split('T')[0]);

    const addSubmitButton = screen.getByRole('button', { name: 'Edit Task' });
    await userEvent.click(addSubmitButton);

    expect(within(taskElement).getByText(newTask.title)).toBeInTheDocument();
  });

  test('delete task correctly', async () => {
    render(
      <Provider store={store}>
        <ModalProvider>
          <TodoListComponent />
        </ModalProvider>
      </Provider>
    );

    const deleteButton = await screen.findByTestId('delete-task-button-1');
    await userEvent.click(deleteButton);

    const confirmDeleteButton = await screen.findByTestId('confirm-delete-button');
    await userEvent.click(confirmDeleteButton);

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  });

  test('displays NO_TASKS_MESSAGE when no tasks match the filters', () => {
    const emptyStore = mockStore({ taskLists: [] });
    render(
      <Provider store={emptyStore}>
        <ModalProvider>
          <TodoListComponent />
        </ModalProvider>
      </Provider>
    );

    expect(screen.getByText(NO_TASKS_MESSAGE)).toBeInTheDocument();
  });
});