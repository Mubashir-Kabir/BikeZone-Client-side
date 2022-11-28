import React, { useEffect, useState } from "react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Slide from "./Slide";
import Spinner from "./Spinner";
import axios from "axios";

const Slider = () => {
  const [advertizedProducts, setAdvertizeProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_serverUrl}/advertize`)
      .then(function (response) {
        // handle success
        if (response.data.status) {
          setAdvertizeProducts(response?.data?.data);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  // const { data, isLoading } = useQuery({
  //   queryKey: ["advertize"],
  //   queryFn: () =>
  //     fetch(`${process.env.REACT_APP_serverUrl}/advertize`).then((res) =>
  //       res.json()
  //     ),
  // });

  // if (!isLoading) {
  //   if (data?.status) {
  //     advertizedProducts = data.data;
  //     console.log(advertizedProducts);
  //   }
  // }

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (!advertizedProducts?.length) {
    return <></>;
  }

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      slidesPerView={1}
      navigation
      autoplay={true}
    >
      {advertizedProducts?.map((product) => {
        if (product?.isSold) {
          return "";
        } else {
          return (
            <SwiperSlide key={product._id}>
              <Slide product={product}></Slide>
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
};

export default Slider;
