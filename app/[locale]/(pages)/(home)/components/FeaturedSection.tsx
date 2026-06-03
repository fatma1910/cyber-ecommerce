'use client'

import { productsSection } from "@/lib/constant";
import { HomeCardProps } from "@/lib/types";
import HomeCard from "./HomeCard";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const FeaturedSection = () => {
  const t = useTranslations("home.featuredCards");

  return (
    <>
      <section className="lg:hidden pb-4">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          centeredSlides={false}
          pagination={{ clickable: true, el: ".featured-mobile-pagination" }}
          breakpoints={{
            480: {
              slidesPerView: 1.25,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.75,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.15,
              spaceBetween: 20,
            },
          }}
          className="featured-mobile-swiper !overflow-visible"
        >
          {productsSection.map((item, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <HomeCard
                {...(item as unknown as HomeCardProps)}
                key={index}
                title={t(`${item.key}.title` as never)}
                desc={t(`${item.key}.description` as never)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="featured-mobile-pagination mt-4 flex justify-center pb-1" />
      </section>

      <section className="hidden items-stretch lg:grid lg:grid-cols-4">
        {productsSection.map((item, index) => (
          <HomeCard
            {...(item as unknown as HomeCardProps)}
            title={t(`${item.key}.title` as never)}
            desc={t(`${item.key}.description` as never)}
            key={index}
          />
        ))}
      </section>
    </>
  );
};

export default FeaturedSection;
