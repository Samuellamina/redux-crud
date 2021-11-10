import PropTypes from "prop-types";
import { memo } from "react";
import { Panel } from "rsuite";
import Button from "rsuite/Button";

const Comment = ({ id, body, onDelete, onPatch }) => {
  return (
    <Panel header={<h1>{id}</h1>} shaded style={{ margin: 20 }}>
      {body}
      <p></p>
      <Button
        onClick={() => onPatch(id, { body: "NEW TEXT" })}
        style={{
          marginTop: 20,
          marginRight: 20,
          backgroundColor: "#0da2ff",
        }}
      >
        Patch
      </Button>
      <Button
        onClick={() => onDelete(id)}
        style={{ marginTop: 20, marginRight: 20, backgroundColor: "red" }}
      >
        Delete
      </Button>
    </Panel>
  );
};

Comment.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onPatch: PropTypes.func.isRequired,
};

export default memo(Comment);
