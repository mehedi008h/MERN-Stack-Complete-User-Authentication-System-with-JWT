import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Navbar from "./components/header/Navbar";
import store from "./store";
import { useEffect } from "react";
import { loadUser } from "./actions/userActions";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import ChangePassword from "./pages/profile/ChangePassword";
import AllUser from "./pages/admin/allUser/AllUser";
import ProtectedRoute from "./components/route/ProtectedRoute";

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
        <Route path="/register" component={Register} />
        <Route path="/me" component={Profile} exact />
        <Route path="/me/update" component={EditProfile} exact />
        <Route path="/password/update" component={ChangePassword} exact />
        <ProtectedRoute
          path="/admin/alluser"
          component={AllUser}
          isAdmin={true}
          exact
        />
      </Router>
    </div>
  );
}

export default App;
