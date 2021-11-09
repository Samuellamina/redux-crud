import {
  commentSelectors,
  fetchComments,
  deleteComments,
  patchComments,
} from "./commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import Comment from "./components/Comment";

const Comments = () => {
  const dispatch = useDispatch();
  const allComments = useSelector(commentSelectors.selectAll);
  // const total = useSelector(commentSelectors.selectTotal);
  //   const singleComment = useSelector((state) =>
  //     commentSelectors.selectById(state, 5)
  //   );

  const onDelete = useCallback((id) => dispatch(deleteComments(id)), []);
  const onPatch = useCallback(
    (id, newObj) => dispatch(patchComments({ id, newObj })),
    []
  );

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  return allComments.map(({ id, body, name }) => (
    <Comment
      key={id}
      id={id}
      body={body}
      name={name}
      onDelete={onDelete}
      onPatch={onPatch}
    />
  ));
};

export default Comments;
