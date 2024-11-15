import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
// Define the initial state using that type
const initialState: {
  listUsers: IUser[],
  isCreated: boolean
} = {
  listUsers: [],
  isCreated: false
}

interface IUser {
  email: string,
  name: string
}

export const fetchListUsers = createAsyncThunk(
  'users/fetchByIdStatus',
  async () => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data
  },
)

export const fetchCreateUser = createAsyncThunk(
  'users/fetchCreateUser',
  async (payload: any, thunkApi) => {
    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify({ ...payload }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    if (data && data.id) {
      thunkApi.dispatch(fetchListUsers());
    }
    toast('🦄 Create User success');
    return data
  },
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (payload: any, thunkApi) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    if (data ) {
      thunkApi.dispatch(fetchListUsers());
    }
    toast('🦄 update user success');
    return data
  },
)

export const DeleteUser = createAsyncThunk(
  'users/updateUser',
  async (payload: any, thunkApi) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "Delete",
    });
    const data = await res.json();
    if (data ) {
      thunkApi.dispatch(fetchListUsers());
    }
    toast('🦄 delete user success');
    return data
  },
)

interface IUser {
  id: number,
  name: string,
  email: string
}

export const UserSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetCreated: (state) => {
      state.isCreated = false;
    }
  }, extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      state.listUsers = action.payload

    }),
    builder.addCase( updateUser.fulfilled, (state) => {
        state.isCreated = true
        console.log("state.isCreated", state.isCreated);
    }),
    builder.addCase(fetchCreateUser.fulfilled, (state) => {
      state.isCreated = true
      console.log("state.isCreated", state.isCreated);
  })
  },
})

export const { resetCreated } = UserSlice.actions

export default UserSlice.reducer