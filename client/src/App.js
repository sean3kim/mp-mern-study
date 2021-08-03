import './App.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddBoulder from "./components/AddBoulder"
import ListBoulders from "./components/ListBoulders"
import EditBoulder from "./components/EditBoulder"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { fetchBoulders } from "./features/boulders/bouldersSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoulders());
  }, [])

  return (
    <Router>
      <div className="App">
        <h1>mountain project</h1>
        <Switch>
          <Route path="/new" >
            <AddBoulder />
          </Route>
          <Route path="/" exact>
            <ListBoulders />
          </Route>
          <Route path="/edit/:id">
            <EditBoulder />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;