import React from 'react'

export default function AddTaskComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Add Task
      </h1>
      <button>Backward</button>
      <form onSubmit={() => console.log('submit')}>
        <p>title</p>
        <input />

      </form>
    </div>
  )
}
