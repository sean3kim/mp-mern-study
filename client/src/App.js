import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddBoulder from "./components/AddBoulder"
import ListBoulders from "./components/ListBoulders"
import EditBoulder from "./components/EditBoulder"
import Searched from "./components/Searched";
import NavBar from "./components/NavBar";
import BoulderPage from "./components/BoulderPage";
import HomePage from "./components/HomePage";
// import AreaPage from "./components/AreaPage";
import AddComment from "./components/AddComment";
import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { fetchBoulders } from "./features/boulders/bouldersSlice";
import { Container } from "@material-ui/core";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoulders());
  }, [])

  return (
    <Router>
      <div className="App">
        <Container>
          <NavBar />
          <h1>mountain project</h1>
          <Switch>
            <Route path="/new" >
              <AddBoulder />
            </Route>
            <Route path="/" exact>
              <HomePage />
            </Route>
            {/* <Route path="/areas/:area">
              <AreaPage />
            </Route> */}
            <Route path="/index" >
              <ListBoulders />
            </Route>
            <Route path="/edit/:id">
              <EditBoulder />
            </Route>
            <Route path="/show/:id/add_comment">
              <AddComment />
            </Route>
            <Route path="/search">
              <Searched />
              <Link to={{ pathname: "/index", state: { fromSearch: true } }}>back to index</Link>
            </Route>
            <Route path="/show/:id">
              <BoulderPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router >
  );
}

export default App;