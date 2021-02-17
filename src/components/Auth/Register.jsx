import { useState } from "react";
import { Link } from "react-router-dom";
import md5 from "md5";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersRef, setUsersRef] = useState(null);

  const isPasswordValid = () => {
    if (password.length < 6 || passConf.length < 6) {
      return false;
    } else if (password !== passConf) {
      return false;
    } else {
      return true;
    }
  };

  const isFormValid = () => {
    let errors = [];
    let error;

    if (!isPasswordValid()) {
      error = { message: "Password is invalid" };
      setErrors(errors.concat(error));
      return false;
    } else {
      return true;
    }
  };

  const saveUser = (createdUser) => {
    setUsersRef(firebase.database().ref("users"));
    return usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setErrors([]);
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: `https://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              saveUser(createdUser).then(() => {
                console.log("user saved");
                setLoading(false);
              });
            })
            .catch((err) => {
              setLoading(false);
              setErrors(errors.concat(err));
            });
        })
        .catch((err) => {
          setLoading(false);
          setErrors(errors.concat(err));
        });
    }
  };

  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="rocketchat" color="orange" />
          Register for Super Chat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Input
              fluid
              name="passConf"
              icon="repeat"
              iconPosition="left"
              type="password"
              placeholder="Password Confirmation"
              value={passConf}
              required
              onChange={(e) => setPassConf(e.target.value)}
            />
            <Button disabled={loading} color="orange" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length ? (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        ) : null}
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
