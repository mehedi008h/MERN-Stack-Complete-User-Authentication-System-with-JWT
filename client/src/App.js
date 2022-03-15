import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Navbar from "./components/header/Navbar";
import store from "./store";
import { useEffect } from "react";
import { loadUser } from "./actions/userActions";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
