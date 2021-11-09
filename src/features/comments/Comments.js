import { commentSelectors, fetchComments } from "./commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Comment from "./components/Comment";

const Comments = () => {
  const dispatch = useDispatch();

  const total = useSelector(commentSelectors.selectTotal);
  const allComments = useSelector(commentSelectors.selectAll);
  //   const singleComment = useSelector((state) =>
  //     commentSelectors.selectById(state, 5)
  //   );

  console.log({ total, allComments });

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  return allComments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));
};

export default Comments;
