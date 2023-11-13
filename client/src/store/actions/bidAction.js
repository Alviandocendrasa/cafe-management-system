import { apiCall } from '../../services/api';
import { LOAD_BIDS } from '../actionTypes';
import { addError, addSuccess, removeMessage } from './messageAction';
import { addLoading, removeLoading } from './loadingAction';

export const loadBids = bids => ({
    type: LOAD_BIDS,
    bids
})

export const fetchBidsFromStaff = (auth) => async (dispatch, getState) => {
    let { auth } = getState();

    const staffId = auth.user.userId;
    
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("get", `/api/bids/cafe-staff-id/${staffId}`);
        dispatch(removeLoading());

        dispatch(loadBids(res.data));
        dispatch(removeMessage());
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

export const createBid = (bidData, navigate) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("post", `/api/bids`, bidData);
        dispatch(removeLoading());

        dispatch(addSuccess(res));
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}

export const updateBid = (bidData, id) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("patch", `/api/bids/${id}`, bidData);
        dispatch(removeLoading());

        dispatch(addSuccess(res));        
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}

export const deleteBid = (id, navigate) => async dispatch => {
    try{
        dispatch(removeMessage());
        dispatch(addLoading());
        const res = await apiCall("delete", `/api/bids/${id}`);
        dispatch(removeLoading());

        dispatch(addSuccess(res));
        setTimeout(() => navigate(0), 4000);
    } catch(err){
        dispatch(removeLoading());
        dispatch(addError(err));
    }  
}