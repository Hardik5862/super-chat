import { useState } from "react";
import {
  Segment,
  Accordion,
  Header,
  Icon,
  Image,
  List,
} from "semantic-ui-react";

const MetaPanel = ({ isPrivateChannel, currentChannel, userPosts }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleActiveIndex = (event, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const displayTopPosters = (posts) =>
    Object.entries(posts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, val], i) => (
        <List.Item key={key}>
          <Image avatar src={val.avatar} />
          <List.Content>
            <List.Header>{key}</List.Header>
            <List.Description>{postsCount(val.count)}</List.Description>
          </List.Content>
        </List.Item>
      ))
      .slice(0, 5);

  const postsCount = (count) =>
    count > 1 ? `${count} posts` : `${count} post`;

  return isPrivateChannel ? null : (
    <Segment loading={!currentChannel}>
      <Header as="h3" attached="top">
        About #{currentChannel?.name}
      </Header>
      <Accordion styled attached="true">
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleActiveIndex}
        >
          <Icon name="dropdown" />
          <Icon name="info" />
          Channel Details
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {currentChannel?.details}
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleActiveIndex}
        >
          <Icon name="dropdown" />
          <Icon name="user circle" />
          Top posters
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <List>{userPosts && displayTopPosters(userPosts)}</List>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={handleActiveIndex}
        >
          <Icon name="dropdown" />
          <Icon name="pencil alternate" />
          Created by
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <Header as="h3">
            <Image circular src={currentChannel?.createdBy?.avatar} />
            {currentChannel?.createdBy?.name}
          </Header>
        </Accordion.Content>
      </Accordion>
    </Segment>
  );
};

export default MetaPanel;
