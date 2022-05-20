import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Leaderboard, Portfolio } from './pages';
import paths from './utils/paths';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.leaderboard} element={<Leaderboard />} />
        <Route path={paths.portfolio} element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;
