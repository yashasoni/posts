const initialState={
    data:null
}
const reducer = (state=initialState, action) => {
    
    if(action.type === 'STATUSHANDLER'){
        return{
            data:{...action.data},
    
        }
    }
    return state;
}
export default reducer;