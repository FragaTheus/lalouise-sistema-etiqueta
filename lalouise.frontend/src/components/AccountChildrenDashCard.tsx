"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  UserGroupIcon,
  UserPlusIcon,
  HomeIcon,
  CheckBadgeIcon,
  ShoppingBagIcon,
  ArchiveBoxIcon,
  TagIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

interface IStatus {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function SwiperWrapper({ data }: { data: IStatus[] }) {
  return (
    <div className="w-full h-35 ">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        allowTouchMove={false}
        className="h-full"
      >
        {data.map((item, idx) => (
          <SwiperSlide
            key={idx}
            className="flex flex-col items-start justify-between"
          >
            <div className="text-primary">{item.icon}</div>
            <div className="flex flex-col mt-10">
              <p className="font-bold text-primary text-xl leading-none">
                {item.value}
              </p>
              <small className="font-semibold text-primary/60 text-[10px] mt-1 uppercase">
                {item.label}
              </small>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export const AccountContent = () => (
  <SwiperWrapper
    data={[
      { icon: <UserGroupIcon className="w-6" />, value: "12", label: "Ativas" },
      { icon: <UserPlusIcon className="w-6" />, value: "3+", label: "Hoje" },
    ]}
  />
);

export const SectorContent = () => (
  <SwiperWrapper
    data={[
      { icon: <HomeIcon className="w-6" />, value: "4", label: "Setores" },
      {
        icon: <CheckBadgeIcon className="w-6" />,
        value: "OK",
        label: "Status",
      },
    ]}
  />
);

export const ProductContent = () => (
  <SwiperWrapper
    data={[
      {
        icon: <ShoppingBagIcon className="w-6" />,
        value: "142",
        label: "Estoque",
      },
      {
        icon: <ArchiveBoxIcon className="w-6" />,
        value: "8",
        label: "Categorias",
      },
    ]}
  />
);

export const TagContent = () => (
  <SwiperWrapper
    data={[
      { icon: <TagIcon className="w-6" />, value: "28", label: "Etiquetas" },
      { icon: <HashtagIcon className="w-6" />, value: "Sinc", label: "Cloud" },
    ]}
  />
);
