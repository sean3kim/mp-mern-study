import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBoulder from "./components/AddBoulder"
import ListBoulders from "./components/ListBoulders"
import EditBoulder from "./components/EditBoulder"
import Searched from "./components/Searched";
import NavBar from "./components/NavBar";
import BoulderPage from "./components/BoulderPage";
import HomePage from "./components/HomePage";
import AddComment from "./components/AddComment";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import SecretPage from "./components/SecretPage";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { fetchBoulders } from "./features/boulders/bouldersSlice";
import { checkLoggedIn } from "./features/users/usersSlice";
import { Container } from "@material-ui/core";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoulders());
    dispatch(checkLoggedIn());
  }, [])

  const loginStatus = useSelector((state) => state.users.isLoggedIn)

  return (
    <Router>
      <div className="App">
        <Container>
          <NavBar />
          <h1>mountain project</h1>
          <Switch>
            <Route path="/new" >
              {loginStatus ? <AddBoulder /> : <Redirect to="/login" />}
            </Route>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/index" >
              <ListBoulders />
            </Route>
            <Route path="/edit/:id">
              {loginStatus ? <EditBoulder /> : <Redirect to="/login" />}
            </Route>
            <Route path="/show/:id/add_comment">
              {loginStatus ? <AddComment /> : <Redirect to="/login" />}
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
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/secret">
              <SecretPage />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router >
  );
}

export default App;