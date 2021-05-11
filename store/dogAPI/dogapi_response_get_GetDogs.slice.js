import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const dogapi_get_breeds_image_random_read = createAsyncThunk(
  "dogapi_response_get_GetDogs/dogapi_get_breeds_image_random_read",
  async payload => {
    const response = await apiService.dogapi_get_breeds_image_random_read(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const dogapi_response_get_GetDogsSlice = createSlice({
  name: "dogapi_response_get_GetDogs",
  initialState,
  reducers: {},
  extraReducers: {
    [dogapi_get_breeds_image_random_read.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [dogapi_get_breeds_image_random_read.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [dogapi_get_breeds_image_random_read.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  dogapi_get_breeds_image_random_read,
  slice: dogapi_response_get_GetDogsSlice
}
