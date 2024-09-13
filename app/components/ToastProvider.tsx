// components/ToastProvider.js
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastProvider = ({ children }: { children: React.ReactNode}) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};
