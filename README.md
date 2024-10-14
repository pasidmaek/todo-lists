# Todo List Application

## Overview

The Todo List Application is designed to help users manage their tasks efficiently. It allows users to create, edit, delete, and filter tasks based on their completion status. By default, only incomplete tasks are displayed, with the ability to view all tasks through a dropdown filter. The task lists are not permanently stored, as they are managed using Redux for state management.

## Features

- **Task Status**

  - Tasks can have two statuses: **Completed** and **Incomplete**.
  - The application defaults to showing only incomplete tasks.

- **Task Filtering**

  - A dropdown filter allows users to switch between viewing only incomplete tasks or all tasks (completed and incomplete).

- **Adding Tasks**

  - Click the **"Add Task"** button to open a modal for inputting task details.
  - Required fields: **Title**, **Description**, **Due Date** (minimum date is today).
  - Once added, the task will appear at the bottom of the incomplete task list on the main screen.

- **Task Cards**

  - Each task is displayed in a card format with the following features:
    - A checkbox to mark the task as completed. Once checked, the task will disappear from the incomplete list and move to the completed list.
    - A pencil icon to edit the task.
    - A trash icon to delete the task.

- **Editing Tasks**

  - Clicking the pencil icon opens a modal where users can edit the task's title, description, and due date.
  - Changes are saved by clicking the **"Edit Task"** button.

- **Deleting Tasks**
  - Clicking the trash icon will open a confirmation modal.
  - After confirming, the task will be permanently deleted.

## Usage Instructions

### Adding a Task

1. Click the **"Add Task"** button.
2. Fill out the modal form with the task title, description, and due date (ensure the due date is today or later).
3. Click **"Add Task"** to save the new task.
4. The new task will be displayed at the bottom of the incomplete tasks list.

### Editing a Task

1. Click the pencil icon on the task card you want to edit.
2. Modify the title, description, and due date in the modal.
3. Click **"Edit Task"** to save the changes.

### Deleting a Task

1. Click the trash icon on the task card you wish to delete.
2. A confirmation modal will appear. Click **"Confirm"** to delete the task.

### Filtering Tasks

- Use the dropdown menu to select between viewing:
  - **Incomplete Tasks** (default)
  - **Completed Tasks** (you can select to view all statuses or select this one only to view completed tasks)

## Installation

To run the application locally, follow these steps:

1. clone this repository
2. install dependencies
   ```bash
   npm install
   ```
3. start dev
   ```bash
   npm start
   ```

## Technologies Used

- React for building user interfaces
- TypeScript for application logic
- Material-UI with custom theme and font for styling
- Redux for managing the task list state
