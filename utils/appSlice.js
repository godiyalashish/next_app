const { createSlice } = require("@reduxjs/toolkit");

const AppSlice = createSlice({
    name:'app',
    initialState:{
    },

    reducers:{
        updateCache:(state, action)=>{
            console.log(action)
            state= Object.assign(state, action.payload);
        }
    }
})


export const{updateCache} = AppSlice.actions;
export default AppSlice.reducer;