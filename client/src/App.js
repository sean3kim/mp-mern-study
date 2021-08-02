import './App.css';
import { useState } from "react";
import AddBoulder from "./components/AddBoulder"
import ListBoulders from "./components/ListBoulders"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

function App() {
  const [boulders, setBoulders] = useState([]);
  // const url = "http://localhost:5000/";

  const onAdd = async (boulder) => {
    // const { data } = await axios.post(url, boulder)
    setBoulders([...boulders, boulder])
  }

  return (
    <Router>
      <div className="App">
        <h1>mountain project</h1>
        <Switch>
          <Route path="/new" >
            <AddBoulder onAdd={onAdd} />
          </Route>
          <Route path="/" exact>
            <ListBoulders allBoulders={boulders} />
          </Route>
        </Switch>
        {console.log(boulders)}
      </div>
    </Router>
  );
}

export default App;
