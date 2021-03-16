import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { setColors } from "../../actions";
import firebase from "../../firebase";
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Icon,
  Label,
  Segment,
} from "semantic-ui-react";
import { SliderPicker } from "react-color";

const ColorPanel = ({ currentUser: user, setColors }) => {
  const [modal, setModal] = useState(false);
  const [primary, setPrimary] = useState("#40bf43");
  const [secondary, setSecondary] = useState("#2d4d86");
  const [userColors, setUserColors] = useState([]);
  const usersRef = useMemo(() => {
    return firebase.database().ref("users");
  }, []);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const handleChangePrimary = (color) => setPrimary(color.hex);
  const handleChangeSecondary = (color) => setSecondary(color.hex);

  useEffect(() => {
    if (user) {
      let userColors = [];
      usersRef.child(`${user.uid}/colors`).on("child_added", (snap) => {
        userColors.unshift(snap.val());
        setUserColors(userColors);
      });
    }
  }, [user, usersRef]);

  const handleSaveColors = () => {
    if (primary && secondary) {
      saveColors(primary, secondary);
    }
  };

  const saveColors = (primary, secondary) => {
    usersRef
      .child(`${user.uid}/colors`)
      .push()
      .update({
        primary,
        secondary,
      })
      .then(() => {
        console.log("colors added");
        closeModal();
      })
      .catch(console.log);
  };

  const displayUserColors = (colors) =>
    colors.length > 0 &&
    colors.map((color, i) => (
      <React.Fragment key={i}>
        <Divider />
        <div
          className="color__container"
          onClick={() => setColors(color.primary, color.secondary)}
        >
          <div className="color__square" style={{ background: color.primary }}>
            <div
              className="color__overlay"
              style={{ background: color.secondary }}
            ></div>
          </div>
        </div>
      </React.Fragment>
    ));

  return (
    <Sidebar
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thin"
    >
      <Divider />
      <Button icon="add" size="small" color="blue" onClick={openModal} />
      {displayUserColors(userColors)}

      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Choose App Colors</Modal.Header>
        <Modal.Content>
          <Segment inverted>
            <Label content="Primary Color" />
            <SliderPicker color={primary} onChange={handleChangePrimary} />
          </Segment>
          <Segment inverted>
            <Label content="Secondary Color" />
            <SliderPicker color={secondary} onChange={handleChangeSecondary} />
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={handleSaveColors}>
            <Icon name="checkmark" /> Save Colors
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Sidebar>
  );
};

export default connect(null, { setColors })(ColorPanel);
