import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    return await fetch(
      `https://jsonplaceholder.typicode.com/comments?_limit=10`
    ).then((res) => res.json());
  }
);

export const deleteComments = createAsyncThunk(
  "comments/deleteComments",
  async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.id,
});

const initialState = commentsAdapter.getInitialState({
  loading: false,
  error: "error",
});

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    //   getAllComments: commentsAdapter.setAll,
    //   deleteOneComment: commentsAdapter.removeOne
  },
  extraReducers: {
    [fetchComments.pending](state) {
      state.loading = true;
    },
    [fetchComments.fulfilled](state, { payload }) {
      state.loading = false;
      commentsAdapter.setAll(state, payload);
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
      state.loading = true;
      commentsAdapter.removeOne(state, id);
    },
  },
});

// normalized state
export const commentSelectors = commentsAdapter.getSelectors(
  (state) => state.comments
);

export const {} = commentSlice.actions;
export default commentSlice.reducer;
