import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { slides } from "./slides.data";
import ChartPromptSlide from "./ChartPromptsSlide";
import { Card, CardBody } from "reactstrap";

const ChatErrorSlides = ({}) => {
  return (
    <div className="chat-chart-error mt-1">
      <Card className="rounded-3">
        <CardBody>
          <p className="white-space-prewrap">
            AI_PRODUCT_NAME could not produce your requested chart:
            <small>
              AI_PRODUCT_NAME has been trained to build certain charts at this present
              moment. i.e. Flowchart, Sequence Diagram, Class Diagram, State
              Diagram, Entity Relationship Diagram, User Journey, Gantt, Pie
              Chart, Requirement Diagram, Gitgraph, (Git) Diagram, C4C Diagram
              (Context) Diagram, Mindmaps, Timeline.
            </small>
          </p>
        </CardBody>
      </Card>
      {/* <Swiper
        spaceBetween={50}
        slidesPerView={1}
        centeredSlides
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        loop
        modules={[Pagination, Autoplay]}
        pagination={{ dynamicBullets: true }}
      >
        {slides.map((data, index) => {
          return (
            <SwiperSlide key={data.chartType + index}>
              <ChartPromptSlide
                chartType={data.chartType}
                imgSrc={data.imgSrc}
                prompts={data.prompts}
              />
            </SwiperSlide>
          );
        })}
      </Swiper> */}
    </div>
  );
};

export default ChatErrorSlides;
