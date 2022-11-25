import { useEffect, useState } from "react";

const useSeller = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [isSellerLoading, setIsSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_serverUrl}/seller/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsSeller(data.status);
          setIsSellerLoading(false);
        });
    }
  }, [email]);
  return [isSeller, isSellerLoading];
};

export default useSeller;
