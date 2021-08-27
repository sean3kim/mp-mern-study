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
import ErrorPage from "./components/ErrorPage";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { fetchBoulders } from "./features/boulders/bouldersSlice";
import { checkLoggedIn } from "./features/users/usersSlice";
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5a9367",
    },
    secondary: {
      main: "#f45b69",
    },
    warning: {
      main: "#FCFF6C",
    }
  },
  typography: {
    fontFamily: "Courier Prime",
  }
})

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoulders());
    dispatch(checkLoggedIn());
  }, [])

  const loginStatus = useSelector((state) => state.users.isLoggedIn)
  const stateStatus = useSelector((state) => state.boulders.status)

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Layout >
            <NavBar />
            {stateStatus === "failed" ? <ErrorPage /> :
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
            }
          </Layout>
        </div>
      </Router >
    </ThemeProvider>
  );
}

export default App;