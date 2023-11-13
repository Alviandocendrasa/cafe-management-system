// import { apiCall, setTokenHeader} from '../../services/api';
// import { SET_CURRENT_USER } from '../actionTypes';
// import { addError, addSuccess, removeMessage } from './messageAction';
// import { addLoading, removeLoading } from './loadingAction';

// export function setCurrentUser(user){
//     return {
//         type: SET_CURRENT_USER,
//         user
//     };
// }

// export const setAuthToken = token => {
//     setTokenHeader(token);
// }

// export const login = (userData, navigate) => async dispatch => {
//    try{
//         dispatch(removeMessage());    
//         dispatch(addLoading());    
//         const res = await apiCall("post", `/api/auth/login`, userData);
//         dispatch(removeLoading());

//         localStorage.setItem("jwtToken", res.data.token);
//         setAuthToken(res.data.token);

//         dispatch(setCurrentUser(res.data.user));
//         dispatch(removeMessage());

//         navigate('/profile');
//    } catch(err){
//         // dispatch(removeLoading());
//         dispatch(addError(err));
//    }
// }

// export const register = (userData, navigate) => async dispatch => {
//     try{
//         dispatch(removeMessage());
//         dispatch(addLoading());
//         const res = await apiCall("post", `/api/auth/register`, userData);
//         dispatch(removeLoading());

//         dispatch(addSuccess(res));
//         setTimeout(() => navigate(0), 4000);
//     } catch(err){
//         dispatch(removeLoading());
//         dispatch(addError(err));
//     }
// }

// export const logout = () => async (dispatch, getState) => {
//     localStorage.clear();
//     setAuthToken(null);

//     console.log("Logout")
//     dispatch(setCurrentUser({}));
// }
    