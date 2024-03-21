import React from 'react';
import Board from "./components/Board/Board";
import Error from "./components/Error";
import './App.css';

function App() {
  return (
      <div className="App">
          <Board />
          <Error />
      </div>
  );
}

export default App;