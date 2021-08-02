import './App.css';
import { useState, useEffect } from "react";
import AddBoulder from "./components/AddBoulder"
import ListBoulders from "./components/ListBoulders"
import EditBoulder from "./components/EditBoulder"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

function App() {
  const [boulders, setBoulders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = "http://localhost:5000";

  useEffect(() => {
    const getBoulders = async () => {
      try {
        const allBoulders = await fetchBoulders();
        const toListBoulders = Object.keys(allBoulders).map(key => allBoulders[key]);
        setIsLoading(false);
        setBoulders([...boulders, ...toListBoulders]);
      } catch (e) {
        console.log(e.message);
      }
    }
    getBoulders();
  }, [])


  const fetchBoulders = async () => {
    const { data } = await axios.get(`${url}/`);
    return data;
  }

  const onAdd = async (boulder) => {
    const { data } = await axios.post(`${url}/new`, boulder)
    setBoulders([...boulders, data])
  }

  const onDelete = async (id) => {
    await axios.delete(url, { data: { id } });
    const removedBoulder = boulders.filter((boulder) => boulder._id !== id);
    setBoulders(removedBoulder);
  }

  const onEdit = async (boulder) => {
    const { data } = await axios.put(url, boulder);
    const editedBoulders = data && boulders.map((boulder) => boulder._id === data._id ? data : boulder);
    setBoulders(editedBoulders);
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
            {isLoading ?
              <div>Loading...</div> :
              <ListBoulders
                allBoulders={boulders}
                onDelete={onDelete}
              />}
          </Route>
          <Route path="/edit/:id">
            <EditBoulder allBoulders={boulders} onEdit={onEdit} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
