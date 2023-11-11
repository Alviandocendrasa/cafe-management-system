import { apiCall } from '../../services/api';
import { LOAD_WORKSLOTS } from '../actionTypes';
import { addError, addSuccess, removeMessage } from './messageAction';
import { addLoading, removeLoading } from './loadingAction';

export const loadWorkslots = workslots => ({
    type: LOAD_WORKSLOTS,
    workslots
})

export const fetchWorkslots = () => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("get", `/api/workslots`);
        dispatch(removeLoading());

        dispatch(loadWorkslots(res.data));
   } catch(err){
        dispatch(removeLoading());

        if(err){
            dispatch(addError(err));
        }
        else{
            console.log(err);
        }
   }
}

export const createNewWorkslot = (workslot, navigate) => async (dispatch) => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("post", `/api/workslots`, workslot);
        dispatch(removeLoading());

        dispatch(addSuccess(res));
        setTimeout(() => navigate(0), 4000);
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    } 
}

export const updateWorkslot = (workslot, id) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("patch", `/api/workslots/${id}`, workslot);
        dispatch(removeLoading());

        dispatch(addSuccess(res));
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}

export const deleteWorkslot = (id, navigate) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("delete", `/api/workslots/${id}`);
        dispatch(removeLoading());

        dispatch(addSuccess(res));
        setTimeout(() => navigate('/'), 4000);
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}