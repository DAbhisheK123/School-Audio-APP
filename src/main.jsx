import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recordings from './components/Recordings/Recordings.jsx';
import Report from './components/Reportss/Report.jsx';
import Content from './components/Content.jsx';
import Students from './components/Students/Students.jsx';
import { Provider } from 'react-redux';
import {store} from './app/store.js'

const root = createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Recordings />} />
          <Route path='students' element={<Students/>}/>
          <Route path="recordings" element={<Recordings/>} />
          <Route path="report" element={<Report />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);