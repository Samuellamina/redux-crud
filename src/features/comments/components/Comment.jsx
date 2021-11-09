import PropTypes from "prop-types";
import { Panel, PanelGroup } from "rsuite";
import Button from "rsuite/Button";

const Comment = ({ comment }) => {
  return (
    <Panel header={comment.name} shaded style={{ margin: 20 }}>
      {comment.body}
      <p></p>
      <Button
        style={{ marginTop: 20, marginRight: 20, backgroundColor: "red" }}
      >
        Delete
      </Button>
      <Button
        style={{
          marginTop: 20,
          marginRight: 20,
          backgroundColor: "#0da2ff",
        }}
      >
        Update
      </Button>
    </Panel>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
