import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = () => (
  <Dimmer active inverted>
    <Loader size="huge" content="Loading..." />
  </Dimmer>
);

export default Spinner;
