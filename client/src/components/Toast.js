import React from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({onSuccessDone, onErrorDone}) => {

    const handleToastClose = (event, type, status) => {
        if (type === toast.TYPE.SUCCESS && status === "removed") {
            onSuccessDone && onSuccessDone();
        } else if (type === toast.TYPE.ERROR && status === "removed") {
            onErrorDone && onErrorDone();
        }
    };
    
    return (
          <ToastContainer
            position="top-center"
            autoClose={2000}
            style={{width: "max-content"}}
            limit={3}
            closeOnClick={false}
            onClose={(event, type, status) => handleToastClose(event, type, status)}
          />
    )
}

export default Toast;