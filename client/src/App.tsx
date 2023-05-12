import { FunctionComponent } from 'react';
import './App.css';
import { AppContainer } from './components';
import { History, Home, Random } from './screens';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

const App: FunctionComponent = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to={'home'} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/random" element={<Random />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
