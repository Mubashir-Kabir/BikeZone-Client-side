import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} -Bike Zone`;
  }, [title]);
};

export default useTitle;
