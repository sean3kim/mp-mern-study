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
import Areas from "./components/Areas";
import AddArea from "./components/AddArea";
import AreaPage from "./components/AreaPage";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { fetchBoulders } from "./features/boulders/bouldersThunks";
import { checkLoggedIn } from "./features/users/usersThunks";
import { fetchAreas } from "./features/areas/areasThunks";
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
    },
    info: {
      main: "#2B50AA"
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
    dispatch(fetchAreas());
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
                  {loginStatus ? <AddBoulder /> : <Redirect to={{ pathname: "/login", state: { from: "/new" } }} />}
                </Route>
                <Route path="/" exact>
                  <HomePage />
                </Route>
                <Route path="/index" >
                  <ListBoulders />
                </Route>
                <Route path="/edit/:id">
                  {loginStatus ? <EditBoulder /> : <Redirect to={{ pathname: "/login", state: { from: "editBoulder" } }} />}
                </Route>
                <Route path="/show/:id/add_comment">
                  {loginStatus ? <AddComment /> : <Redirect to={{ pathname: "/login", state: { from: "addComment" } }} />}
                </Route>
                <Route path="/search">
                  <Searched />
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
                <Route path="/areas/new">
                  <AddArea />
                </Route>
                <Route path="/areas/show/:id">
                  <AreaPage />
                </Route>
                <Route path="/areas">
                  <Areas />
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