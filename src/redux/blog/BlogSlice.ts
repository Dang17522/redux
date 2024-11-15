import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
// Define the initial state using that type
const initialState: {
  listBlogs: IBlogPayload[],
  isCreated: boolean
} = {
  listBlogs: [],
  isCreated: false
}

interface IBlogPayload {
  id: number,
  title: string,
  author: string,
  content: string
}

export const fetchListBlogs = createAsyncThunk(
  'blogs/fetchListBlogs',
  async () => {
    const res = await fetch("http://localhost:8000/blogs");
    const data = await res.json();
    return data
  },
)

export const CreateBlog = createAsyncThunk(
  'blogs/CreateBlog',
  async (payload: any, thunkApi) => {
    const res = await fetch("http://localhost:8000/blogs", {
      method: "POST",
      body: JSON.stringify({ ...payload }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    if (data && data.id) {
      thunkApi.dispatch(fetchListBlogs());
    }
    toast('🦄 Create blog success');
    return data
  },
)

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (payload: any, thunkApi) => {
    const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: payload.title,
        author: payload.author,
        content: payload.content
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    if (data) {
      thunkApi.dispatch(fetchListBlogs());
    }
    toast('🦄 update blog success');
    return data
  },
)

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (payload: any, thunkApi) => {
    const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: "Delete",
    });
    const data = await res.json();
    if (data) {
      thunkApi.dispatch(fetchListBlogs());
    }
    toast('🦄 delete blog success');
    return data
  },
)

export const BlogSlice = createSlice({
  name: 'blog',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetCreated: (state) => {
      state.isCreated = false;
    }
  }, extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListBlogs.fulfilled, (state, action) => {
      state.listBlogs = action.payload

    }),
      builder.addCase(updateBlog.fulfilled, (state) => {
        state.isCreated = true
      }),
      builder.addCase(CreateBlog.fulfilled, (state) => {
        state.isCreated = true
      }),
      builder.addCase(deleteBlog.fulfilled, (state) => {
        state.isCreated = true
      })
  },
})

export const { resetCreated } = BlogSlice.actions

export default BlogSlice.reducer