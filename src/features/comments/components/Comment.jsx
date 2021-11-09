import PropTypes from "prop-types";
import { memo } from "react";
import { Panel } from "rsuite";
import Button from "rsuite/Button";

const Comment = ({ comment, onDelete }) => {
  return (
    <Panel header={<h1>{comment.id}</h1>} shaded style={{ margin: 20 }}>
      {comment.body}
      <p></p>
      <Button
        style={{
          marginTop: 20,
          marginRight: 20,
          backgroundColor: "#0da2ff",
        }}
      >
        Update
      </Button>
      <Button
        onClick={() => onDelete(comment.id)}
        style={{ marginTop: 20, marginRight: 20, backgroundColor: "red" }}
      >
        Delete
      </Button>
    </Panel>
  );
};

Comment.propTypes = {
  onDelete: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
};

export default memo(Comment);
