import { LOAD_WORKSLOTS } from "../actionTypes";

export default (state={}, action) => {
    switch(action.type) {
        case LOAD_WORKSLOTS:
            return [...action.workslots];    
        default:
            return state;
    }
};