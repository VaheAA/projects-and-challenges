import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllCountries = createAsyncThunk('countru/fetchAll',
  async (_, thunkAPI) => { });