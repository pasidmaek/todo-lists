import './App.css'
import TodoListComponent from './components/TodoListComponent'
import { ModalProvider } from './context/ModalProvider'

function App() {

  return (
    <ModalProvider>
      <TodoListComponent />
    </ModalProvider>
  )
}

export default App
