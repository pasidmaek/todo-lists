import { ThemeProvider } from '@mui/material';
import './App.css'
import TodoListComponent from './components/TodoListComponent'
import { ModalProvider } from './context/ModalProvider'
import { Toaster } from 'react-hot-toast';
import { theme } from './theme/theme';
import { Provider } from 'react-redux';
import store from './store/taskStore';

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <Toaster />
          <TodoListComponent />
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
