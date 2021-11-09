import {
  commentSelectors,
  fetchComments,
  deleteComments,
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

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  return allComments.map((comment) => (
    <Comment key={comment.id} comment={comment} onDelete={onDelete} />
  ));
};

export default Comments;
