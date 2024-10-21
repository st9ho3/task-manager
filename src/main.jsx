import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import './Components/Layout/Layout.css';
import './Components/Layout/Nav/Navbar.css';
import './Components/Layout/Header/Header.css';
import './Components/Form/Element.css';
import './Components/Form/Form.css';
import './Components/Form/FormBottomSection.css';
import './Components/Layout/Main/TaskBoard/TaskBoard.css'
import './Components/General/PopUpWindow.css'
import RouteContextProvider from './Context/RouteContext.jsx';
import AuthContextProvider from './Context/AuthContext.jsx';
import FileUploadProvider from './Context/FileUploadContext.jsx';
import EventProvider from './Context/EventContext.jsx';
import TaskContextProvider from './Context/TaskContext.jsx';
import './Components/Layout/Header/HeaderTop.css'
import './Components/Layout/Header/HeaderBottom.css'
import './Components/TaskForm/TaskForm.css'
import './Components/TaskForm/TaskOption.css'
import './Components/TaskForm/TaskOptions.css'
import './Components/TaskForm/Option.css'
import './Components/TaskForm/AssigneeOption.css'
import './Components/TaskForm/TagsOption.css'
import './Components/TaskForm/Tag.css'
import './Components/TaskForm/DatePicker.css'
import './Components/TaskForm/AttachmentsDisplay.css'
import './Components/Layout/Main/TaskBoard/TaskList/TaskItem/TaskItem.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <TaskContextProvider>
      <EventProvider>
        <FileUploadProvider>
          <RouteContextProvider>
              <App />
          </RouteContextProvider>
        </FileUploadProvider>
      </EventProvider>
    </TaskContextProvider>
  </AuthContextProvider>
  </StrictMode>,
);