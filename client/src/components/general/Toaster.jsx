import PropTypes from 'prop-types';
import { useEffect } from 'react';
import toast, { Toaster as RToaster } from 'react-hot-toast';

export default function Toaster({type,message,children,func}){
    const notify = () => {
        if(type && message){
            type=type.toLowerCase()
            if(type==="success") toast.success(message);
            if(type==="error") toast.error(message);
            if(type==="loading") toast.loading(message);
        }
    }


    return (
        <>
            <button onClick={notify}>
                {children}
            </button>
            <RToaster/>
        </>
    )
}


Toaster.propTypes = {
    type:PropTypes.string,
    message: PropTypes.string,
    children:PropTypes.object,
  }