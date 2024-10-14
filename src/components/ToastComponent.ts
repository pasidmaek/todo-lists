import toast from "react-hot-toast";

export const toastComplete = (msg: string) => toast.success(msg, {
  duration: 4000,
  position: 'top-right',
  className: 'font-regular'
});

export const toastError = (msg: string) => toast.error(msg, {
  duration: 4000,
  position: 'top-right',
  className: 'font-regular'
});