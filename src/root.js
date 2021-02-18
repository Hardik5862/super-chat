import { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "./firebase";

import { setUser } from "./actions/index";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import App from "./components/App";
import Spinner from "./Spinner";

const Root = (props) => {
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user);
        history.push("/");
      }
    });
  }, [history, props]);

  return props.isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps, { setUser })(Root);
