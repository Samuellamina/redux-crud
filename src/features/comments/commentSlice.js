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
  reducers: {},
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
  },
});

// normalized state
export const commentSelectors = commentsAdapter.getSelectors(
  (state) => state.comments
);

export const {} = commentSlice.actions;
export default commentSlice.reducer;
