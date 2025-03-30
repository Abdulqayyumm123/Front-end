import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateAd = createAsyncThunk('updateAd', async ({ id, updatedData }) => {
    // console.log("Id Recieved by Update Thunk : ", id);
    const response = await fetch(`http://localhost:5000/api/v1/users/uid/${id}`, {
        method: "PUT",
        headers: {
         "Content-Type": "application/json"
         },
        body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
        throw new Error("Failed to Update Ad!");
    }
    return await response.json();
});

const updateAdSlice = createSlice({
    name: "UpdateAd",
    initialState :{
    loading:false,
    error:null ,
    updated : false 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateAd.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAd.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload
                state.updated = true;
            })
            .addCase(updateAd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default updateAdSlice.reducer;
