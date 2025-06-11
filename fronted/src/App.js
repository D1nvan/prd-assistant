import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}

export default App; 