import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const login = createAsyncThunk('loginData', async (loginData)=>{
  const response = await fetch("http://localhost:5000/api/v1/users/login",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body : JSON.stringify(loginData)
  })
  if(!response.ok){
    throw new Error ("Failed to login")

  }
  // console.log(await response.json());
  return await response.json()
})


const loginSlice = createSlice({
    name:"Login",
    initialState:{
    data:{},
    loading:false,
    error:null,
    loggedIn:false,
    },
    reducers:{
      logout: (state) => {
        state.data = {};
        state.loading = false;
        state.loggedIn = false;
        state.error = null;
      }
    },
    extraReducers:(builder)=>{
    builder
    .addCase(login.pending,(state)=>{
        state.loading=true
    })
    .addCase(login.fulfilled,(state,action)=>{
        state.loading=false,
        state.loggedIn=true,
        state.data = action.payload
        console.log('Login State Set :', state.data)
    })
    .addCase(login.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.error.message
        console.log('Rejected Case :', state.error)

    })

    }

})
export const { logout } = loginSlice.actions
export default loginSlice.reducer

