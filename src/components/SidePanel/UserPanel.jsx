import { useState, useEffect } from "react";

import firebase from "../../firebase";
import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react";

const UserPanel = ({ currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out");
      });
  };

  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{user?.displayName ?? ""}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signout",
      text: <span onClick={handleSignout}>Sign Out</span>,
    },
  ];

  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>SuperChat</Header.Content>
          </Header>
          <Header style={{ padding: "0.25em" }} inverted as="h4">
            <Dropdown
              trigger={
                <span>
                  <Image src={user?.photoURL} spaced="right" avatar />
                  {user?.displayName}
                </span>
              }
              options={dropdownOptions()}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
