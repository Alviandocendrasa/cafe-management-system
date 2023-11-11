import React, {useEffect} from "react";

import { MESSAGE_TYPES } from "../constants";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({messages}) => {


    useEffect(()=>{
        if(!messages.message) return;

        switch(messages.type){
            case MESSAGE_TYPES.success:
                toast.success(messages.message);
                break;
            case MESSAGE_TYPES.error:
                toast.error(messages.message);
                break;
            case MESSAGE_TYPES.warning:
                toast.warning(messages.message);
                break;
            case MESSAGE_TYPES.info:
                toast.info(messages.message);
                break;
            default:
                break;
        }
    }, [messages]);
    
    return (
          <ToastContainer
            position="top-center"
            autoClose={3000}
            style={{width: "max-content"}}
            limit={1}
            newestOnTop={false}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
    )
}

export default Toast;