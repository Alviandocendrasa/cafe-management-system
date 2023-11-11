import { ADD_ERROR, ADD_SUCCESS, REMOVE_MESSAGE } from "../actionTypes";

export const addError = res => ({
    type: ADD_ERROR,
    res
})

export const addSuccess = res => ({
    type: ADD_SUCCESS,
    res
})

export const removeMessage = () => ({
    type: REMOVE_MESSAGE
})