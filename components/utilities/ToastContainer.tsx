import React from "react";
import { ToastContainer as BaseToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastContainer({ ...props }) {
  return (
    <BaseToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={true}
      closeButton={false}
      newestOnTop={true}
      closeOnClick={false}
      pauseOnHover={true}
      draggable={true}
      {...props}
    />
  );
}

export const useAppToast = () => {
  return toast;
};
