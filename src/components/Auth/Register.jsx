import { useState } from "react";
import { Link } from "react-router-dom";
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

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((createdUser) => {
        console.log(createdUser);
      })
      .catch(console.log);
  };

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
              onChange={(e) => setPassConf(e.target.value)}
            />
            <Button color="orange" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
