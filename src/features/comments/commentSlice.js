import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const data = await fetch(`http://localhost:4000/comments`).then((res) =>
      res.json()
    );

    const tags = data.reduce((prev, curr) => [...prev, curr.tags], []).flat();
    const likes = data.reduce((prev, curr) => [...prev, curr.likes], []).flat();
    const comments = data.map(({ id, body }) => ({ id, body }));

    return { comments, tags, likes };
  }
);

export const deleteComments = createAsyncThunk(
  "comments/deleteComments",
  async (id) => {
    await fetch(`http://localhost:4000/comments/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const patchComments = createAsyncThunk(
  "comments/patchComments",
  async ({ id, newObj }) => {
    await fetch(`http://localhost:4000/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newObj),
    });

    return { id, changes: newObj };
  }
);

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.id,
});

const likesAdapter = createEntityAdapter({
  selectId: (like) => like.id,
});

const tagsAdapter = createEntityAdapter({
  selectId: (tag) => tag.id,
});

const initialState = commentsAdapter.getInitialState({
  loading: false,
  error: "error",
  likes: likesAdapter.getInitialState(),
  tags: tagsAdapter.getInitialState(),
});

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    // setAllComments: commentsAdapter.setAll,
    // setOneComments: commentsAdapter.removeOne,
    // setManyComments: commentsAdapter.addMany,
    // updateOneComment: commentsAdapter.updateOne,
    // removeLikes(state) {
    //   likesAdapter.removeAll(state.likes, {});
    // },
    // removeTagById(state, { payload: tagId }) {
    //   const { commentId } = tagsAdapter
    //     .getSelectors()
    //     .selectById(state.tags, tagId);
    //   const comment = commentsAdapter
    //     .getSelectors()
    //     .selectById(state, commentId);
    //   commentsAdapter.updateOne(state, {
    //     id: comment.id,
    //     changes: {
    //       ...comment,
    //       tagsIds: comment.tagsIds.filter((id) => id !== tagId),
    //     },
    //   });
    //   tagsAdapter.removeOne(state.tags, tagId);
    // },
  },
  extraReducers: {
    [fetchComments.pending](state) {
      state.loading = true;
    },
    [fetchComments.fulfilled](state, { payload }) {
      state.loading = false;
      commentsAdapter.setAll(state, payload.comments);
      tagsAdapter.setAll(state.tags, payload.tags);
      likesAdapter.setAll(state.likes, payload.likes);
    },
    [fetchComments.rejected](state) {
      state.loading = false;
      state.error = true;
    },
    [deleteComments.pending](state) {
      state.loading = true;
    },
    [deleteComments.rejected](state) {
      state.loading = false;
      state.error = true;
    },
    [deleteComments.fulfilled](state, { payload: id }) {
      state.loading = false;
      commentsAdapter.removeOne(state, id);
    },
    [patchComments.pending](state) {
      state.loading = true;
    },
    [patchComments.rejected](state) {
      state.loading = false;
      state.error = true;
    },
    [patchComments.fulfilled](state, { payload }) {
      state.loading = false;
      commentsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload.changes,
      });
    },
  },
});

export const commentSelectors = commentsAdapter.getSelectors(
  (state) => state.comments
);

export const likesSelectors = likesAdapter.getSelectors(
  (state) => state.comments.likes
);

export const {} = commentSlice.actions;
export default commentSlice.reducer;
