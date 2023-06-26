import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from 'redux/operations';
import {
  handleAddFulfilled,
  handleDeleteFulfilled,
  handleGetFulfilled,
  handlePending,
  handleRejected,
} from '../handlers';


const initialState = {
  items: [],
  isLoading: false,
  error: null,
};


const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleGetFulfilled)
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, handleAddFulfilled)
      .addCase(addContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleDeleteFulfilled)
      .addCase(deleteContact.rejected, handleRejected);
  },
});
export default contactsSlice.reducer;
