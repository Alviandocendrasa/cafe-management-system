import React from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({onSuccessDone, onErrorDone}) => {
    toast.onChange(payload => {
        if(onSuccessDone && payload.type === toast.TYPE.SUCCESS && payload.status === "removed") {
            onSuccessDone();
        }
        else if(onErrorDone && payload.type === toast.TYPE.ERROR && payload.status === "removed") {
            onErrorDone();
        }
    });

    // const handleToastClose = (event, type, status) => {
    //     if (type === toast.TYPE.SUCCESS && status === "removed") {
    //         onSuccessDone && onSuccessDone();
    //     } else if (type === toast.TYPE.ERROR && status === "removed") {
    //         onErrorDone && onErrorDone();
    //     }
    // };
    
    return (
          <ToastContainer
            position="top-center"
            autoClose={2000}
            style={{width: "max-content"}}
            limit={3}
            closeOnClick={false}
            // onClose={(event, type, status) => handleToastClose(event, type, status)}
          />
    )
}

export default Toast;