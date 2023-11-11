import { ADD_ERROR, ADD_SUCCESS,REMOVE_MESSAGE } from "../actionTypes";
import { MESSAGE_TYPES } from "../../constants";

export default (state={type: null, message: null}, action) => {
    switch(action.type) {
        case ADD_ERROR:
            return {...state, type: MESSAGE_TYPES.error ,message: action.res.message};
        case ADD_SUCCESS:
            return {...state, type: MESSAGE_TYPES.success, message: action.res.message};
        case REMOVE_MESSAGE:
            return {...state, type: null, message: null};
        default:
            return state;
    }
};