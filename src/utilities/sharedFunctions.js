import { toast } from "react-toastify";

export const requestJwtToken = (mail) => {
  // const email = {
  //   email: mail,
  // };
  // fetch("https://koni-s-kitchen-server-side.vercel.app/jwt-token", {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   body: JSON.stringify(email),
  // }).then((res) =>
  //   res.json().then((data) => {
  //     if (data.status) {
  //       localStorage.setItem("accessToken", data.data);
  //     }
  //   })
  // );
  return;
};

export const notifySuccess = (massage) => {
  toast.success(massage, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const notifyWarn = (massage) => {
  toast.warn(massage, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const notifyError = (massage) => {
  toast.error(massage, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
