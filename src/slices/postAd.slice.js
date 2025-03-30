import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "../slices/login.slice";

// Post advertisement
export const postAd = createAsyncThunk('postAd', async (postData) => {
    const response = await fetch("http://localhost:5000/api/v1/advertisement", {
        method: "POST",
        body: postData 
    });

    if (!response.ok) {
        throw new Error("Failed to Post Ad!");
    }
    return await response.json();
});

export const editAd = createAsyncThunk('editAd', async ({ adId, updatedData, token }, { rejectWithValue, dispatch }) => {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/advertisement/aid/${adId}`, {
            method: "PUT",
            headers: {
                "X-Auth-Token": token
            },
            body: updatedData
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.message === "session expired") {
                dispatch(logout());
            }
            return rejectWithValue(errorData.message);
        }
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Delete an advertisement
export const deleteAd = createAsyncThunk('deleteAd', async ({ adId, token }, { rejectWithValue, dispatch }) => {

    const response = await fetch(`http://localhost:5000/api/v1/advertisement/aid/${adId}`, {
        method: "DELETE",
        headers: {
            "X-Auth-Token": token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "session expired") {
            dispatch(logout()); 
        }
        return rejectWithValue(errorData.message);
    }
    return await response.json();
});

const postAdSlice = createSlice({
    name: "PostAd",
    initialState: {
        data: {},
        loading: false,
        error: null  
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postAd.pending, (state) => {
                state.loading = true;
            })
            .addCase(postAd.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(postAd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editAd.pending, (state) => {
                state.loading = true;
            })
            .addCase(editAd.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(editAd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteAd.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteAd.fulfilled, (state, action) => {
                state.loading = false;
                state.data = {}  
            })
            .addCase(deleteAd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                if (action.payload === "session expired") {
                    console.log("Session expired! Logging out user...");
                }
            });
    }
});

export default postAdSlice.reducer;