import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Main from "./components/main/main";

function App(props) {



  return (
    <div className="myContainer">
      <Main history={props.history} />
    </div>
  );
}

export default App;
