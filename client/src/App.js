import './App.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddBoulder from "./components/AddBoulder"
import ListBoulders from "./components/ListBoulders"
import EditBoulder from "./components/EditBoulder"
import Search from "./components/Search";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
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
            <Search />
            <ListBoulders />
          </Route>
          <Route path="/edit/:id">
            <EditBoulder />
          </Route>
          <Route path="/test">
            <Search />
            <ListBoulders />
            <Link to={{ pathname: "/", state: { fromSearch: true } }}>back to index</Link>
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;