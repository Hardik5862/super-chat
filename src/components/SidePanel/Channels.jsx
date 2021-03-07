import { useEffect, useState } from "react";
import firebase from "../../firebase";
import { Button, Form, Icon, Input, Menu, Modal } from "semantic-ui-react";

const Channels = (props) => {
  const [channels, setChannels] = useState([]);
  const [modal, setModal] = useState(false);
  const [newChannel, setNewChannel] = useState({
    user: props.currentUser,
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
  });

  useEffect(() => {
    let loadedChannels = [];
    newChannel.channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      setChannels(loadedChannels);
    });
  }, [newChannel.channelsRef, channels.length]);

  const handleChange = (event) => {
    setNewChannel({ ...newChannel, [event.target.name]: event.target.value });
  };

  const isFormValid =
    newChannel.channelName.length && newChannel.channelDetails.length;

  const addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = newChannel;
    const key = channelsRef.push().key;
    const createNewChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };

    channelsRef
      .child(key)
      .update(createNewChannel)
      .then(() => {
        setNewChannel({ ...newChannel, channelName: "", channelDetails: "" });
        setModal(false);
        console.log("channel added");
      })
      .catch(console.log);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      addChannel();
    }
  };

  return (
    <>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channels.length}) <Icon name="add" onClick={() => setModal(true)} />
        </Menu.Item>
        {channels.map((channel) => (
          <Menu.Item
            key={channel.id}
            onClick={() => console.log(channel)}
            name={channel.name}
            style={{ opacity: "0.7" }}
          >
            # {channel.name}
          </Menu.Item>
        ))}
      </Menu.Menu>

      <Modal basic open={modal} onClose={() => setModal(false)}>
        <Modal.Header>Add Channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="Channel details"
                name="channelDetails"
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={() => setModal(false)}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Channels;
