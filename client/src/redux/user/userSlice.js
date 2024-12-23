import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser : null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signInStart: (state) => {
        console.log('signInStart triggered');
        state.loading = true;
      },
      signInSuccess: (state, action) => {
        console.log('signInSuccess triggered with payload:', action.payload);
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
      },
      signInFailure: (state, action) => {
        console.log('signInFailure triggered with payload:', action.payload);
        state.error = action.payload;
        state.loading = false;
      },
    },
  });
  

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         signInStart: (state) => {
//             state.loading = true;
//         },
//         signInSuccess: (state, action) => {
//             state.currentUser = action.payload;
//             state.loading = false;
//             state.error = null;
//         },
//         signInFailure: (state, action) => {
//             state.error = action.payload;
//             state.loading = false;
//         }
//     }
// });

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;

export default userSlice.reducer;