import { ADD_LOADING, REMOVE_LOADING } from "../actionTypes";

export default (state={isLoading: false}, action) => {
    switch(action.type) {
        case ADD_LOADING:
            return {...state, isLoading: true};        
        case REMOVE_LOADING:
            return {...state, isLoading: false};
        default:
            return state;
    }
};