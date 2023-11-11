import { LOAD_BIDS } from "../actionTypes";

export default (state={}, action) => {
    switch(action.type) {
        case LOAD_BIDS:
            return [...action.bids];    
        default:
            return state;
    }
};