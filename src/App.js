import React from 'react';
import bg from './images/bg-img.jpg'
import './styles/App.css';
import Header from './Header.js'
import Main from './Main.js'

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Header/>
        <Main/>
      </div>
    </div>
  );
}

export default App;
