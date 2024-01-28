import { createSlice } from '@reduxjs/toolkit';

const updateArray = (state, data, key) => {
    const index = state.findIndex((val) => val[key] === data[key]);

    if (index !== -1) {
        state[index] = data;
    } else {
        state.push(data);
    }
};

const createListSlice = (name, key) => {
    return createSlice({
        name,
        initialState: [],
        reducers: {
            setItem: (state, action) => updateArray(state, action.payload, key),
        },
    });
};

export const listSlice = createListSlice('list', 'current');
export const itemSlice = createListSlice('item', 'id');

export const { setItem: setList } = listSlice.actions;
export const { setItem } = itemSlice.actions;

export const listReducer = listSlice.reducer;
export const itemReducer = itemSlice.reducer;
