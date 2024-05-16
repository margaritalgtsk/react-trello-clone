import React from 'react';
import Search from "./components/Search/Search";
import Error from "./components/Error";
import './App.css';

function App() {
  return (
      <div className="App">
          <Search />
          <Error />
      </div>
  );
}

export default App;