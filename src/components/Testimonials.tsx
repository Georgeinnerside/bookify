"use client";

import { testimonials } from "@/service/testimonials";
import TestimonialCard from "@/components/cards/TestimonialCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export const Testimonial = () => {
  return (
    <section className="bg-white w-full py-10 px-4 md:px-16">
      <h3 className="text-center text-xl md:text-4xl font-bold text-gray-900 mb-12">
        Let’s see what our clients say about us
      </h3>

      <Swiper
        modules={[Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{ delay: 5000 }}
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
        className="relative"
      >
        {testimonials.map((test) => (
          <SwiperSlide key={test.id}>
            <TestimonialCard test={test} />
          </SwiperSlide>
        ))}

        <div className="flex justify-center mt-8 gap-8">
          <button className=".swiper-button-next text-gray-700 text-lg p-3 rounded cursor-pointer">
            <ArrowBackIcon />
          </button>
          <button className=".swiper-button-next text-gray-700 text-lg p-3 rounded cursor-pointer">
            <ArrowForwardIcon />
          </button>
        </div>
      </Swiper>
      <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-3 mx-auto">
        <div className="p-5">
          <p className="text-3xl text-center text-blue-600 font-bold">2M+</p>
          <p className="text-xs text-gray-600 text-center font-semibold">
            Books Available
          </p>
        </div>
        <div className="p-5">
          <p className="text-3xl text-center text-blue-600 font-bold">500K+</p>
          <p className="text-xs text-gray-600 text-center font-semibold">
            Happy Readers
          </p>
        </div>
        <div className="p-5">
          <p className="text-3xl text-center text-blue-600 font-bold">50K</p>
          <p className="text-xs text-gray-600 text-center font-semibold">
            Reviews
          </p>
        </div>
        <div className="p-5">
          <p className="text-3xl text-center text-blue-600 font-bold">99%</p>
          <p className="text-xs text-gray-600 text-center font-semibold">
            Satisfaction
          </p>
        </div>
      </div>
    </section>
  );
};
