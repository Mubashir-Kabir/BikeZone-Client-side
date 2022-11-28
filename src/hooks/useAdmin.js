import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_serverUrl}/admin/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsAdmin(data.status);
          setIsAdminLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsAdminLoading(false);
        });
    } else {
      setIsAdminLoading(false);
    }
  }, [email]);
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
