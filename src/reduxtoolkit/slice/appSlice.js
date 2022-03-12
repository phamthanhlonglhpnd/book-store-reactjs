import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllAuthorsAPI, getAllLanguagesAPI, getAllPublishersAPI, getAllTypeAPI } from '../apiService';

export const getAllType = createAsyncThunk(
    'app/getAllType',
    async () => {
        try {
            const response = await getAllTypeAPI();
            return response;
        } catch (e) {
            return e;
        }
    }
)

export const getAllLanguage = createAsyncThunk(
    'app/getAllLanguage',
    async () => {
        try {
            const response = await getAllLanguagesAPI();
            return response;
        } catch (e) {
            return e;
        }
    }
)

export const getAllPublisher = createAsyncThunk(
    'app/getAllPublisher',
    async () => {
        try {
            const response = await getAllPublishersAPI();
            return response;
        } catch (e) {
            return e;
        }
    }
)

export const getAllAuthor = createAsyncThunk(
    'app/getAllAuthor',
    async () => {
        try {
            const response = await getAllAuthorsAPI();
            return response;
        } catch (e) {
            return e;
        }
    }
)

const initialState = {
    types: [],
    languages: [],
    publishers: [],
    authors: [],
}

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {

    },
    extraReducers: {
        // get all type of handbook
        [getAllType.pending]: (state, action) => {
            state.types = []
        },
        [getAllType.fulfilled]: (state, action) => {
            state.types = action.payload.types;
        },
        [getAllType.rejected]: (state, action) => {
            state.types = []
        },

        // get all languages
        [getAllLanguage.pending]: (state, action) => {
            state.languages = []
        },
        [getAllLanguage.fulfilled]: (state, action) => {
            state.languages = action.payload.languages
        },
        [getAllLanguage.rejected]: (state, action) => {
            state.languages = []
        },

        // get all publishers
        [getAllPublisher.pending]: (state, action) => {
            state.publishers = []
        },
        [getAllPublisher.fulfilled]: (state, action) => {
            let array = action.payload.publishers;
            let newPublishers = array && array.length > 0 && array.map(item => {
                let newObject = {};
                newObject.id = item.id;
                newObject.name = item.name;
                return newObject;
            })
            state.publishers = newPublishers
        },
        [getAllPublisher.rejected]: (state, action) => {
            state.publishers = []
        },

        // get all authors
        [getAllAuthor.pending]: (state, action) => {
            state.authors = []
        },
        [getAllAuthor.fulfilled]: (state, action) => {
            let array = action.payload.authors;
            let newAuthors = array && array.length > 0 && array.map(item => {
                let newObject = {};
                newObject.id = item.id;
                newObject.name = item.name;
                return newObject;
            })
            state.authors = newAuthors
        },
        [getAllAuthor.rejected]: (state, action) => {
            state.authors = []
        },
    }
})

export default app.reducer;