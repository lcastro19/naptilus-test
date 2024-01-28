import { createSlice } from '@reduxjs/toolkit';

const updateArray = (state, data, key) => {
    const index = state.findIndex(val => val[key] === data[key])
    if (index !== -1) {
        state[index] = data
    } else state.push(data)
}

const listSlice = createSlice({
    name: 'list',
    initialState: [],
    reducers: {
        setList: (state, action) => updateArray(state, action.payload, 'current')
    },
});


const itemSlice = createSlice({
    name: 'item',
    initialState: [],
    reducers: {
        setItem: (state, action) => updateArray(state, action.payload, 'id')
    },
});

export const { setList } = listSlice.actions;
export const { setItem } = itemSlice.actions;

export const listReducer = listSlice.reducer;
export const itemReducer = itemSlice.reducer;

