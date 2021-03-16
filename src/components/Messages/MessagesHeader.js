import { Header, Segment, Input, Icon } from "semantic-ui-react";

const MessagesHeader = (props) => {
  const {
    channelName,
    numUniqueUsers,
    handleSearchChange,
    searchLoading,
    isPrivateChannel,
    isChannelStarred,
    handleStar,
  } = props;

  return (
    <Segment clearing>
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {channelName}{" "}
          {!isPrivateChannel && (
            <Icon
              onClick={handleStar}
              name={isChannelStarred ? "star" : "star outline"}
              color={isChannelStarred ? "yellow" : "black"}
            />
          )}
        </span>
        <Header.Subheader>{numUniqueUsers}</Header.Subheader>
      </Header>
      <Header floated="right">
        <Input
          loading={searchLoading}
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
          onChange={handleSearchChange}
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
