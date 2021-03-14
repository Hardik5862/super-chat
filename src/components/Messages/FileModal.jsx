import { useState } from "react";
import mime from "mime-types";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

const FileModal = (props) => {
  const { modal, closeModal, uploadFile } = props;
  const [file, setFile] = useState(null);
  const authorized = ["image/jpeg", "image/png"];

  const addFile = (event) => {
    const file = event.target.files[0];
    if (file !== null) {
      setFile(file);
    }
  };

  const sendFile = () => {
    if (file) {
      console.log(file.name);
      if (isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        clearFile();
      }
    }
  };

  const clearFile = () => setFile(null);

  const isAuthorized = (filename) => authorized.includes(mime.lookup(filename));

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Select an Image file</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          onChange={addFile}
          label="File types: jpg, png"
          name="file"
          type="file"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={sendFile}>
          <Icon name="checkmark" /> Upload
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FileModal;
