import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { marketingContents } from "../utils/marketingContents";
import MarketingSlide from "./MarketingSlide";

const MarketingSlides = ({ contents, title, imgSrc }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop
      modules={[Pagination, Autoplay]}
      pagination={{ dynamicBullets: true }}
    >
      {marketingContents.map((data, index) => {
        return (
          <SwiperSlide key={data.title + index}>
            <MarketingSlide
              title={data.title}
              imgSrc={data.imgSrc}
              contents={data.contents}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MarketingSlides;
