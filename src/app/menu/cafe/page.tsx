"use client";


export type APIResponse<T> = AxiosResponse<{
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}>;

export type Categories = APIResponse<
  {
    id: number;
    documentId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    icon: {
      id: number;
      documentId: string;
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: string[] | null;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
    items: {
      id: number;
      documentId: string;
      name: string;
      description: string;
      price: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      image: {
        id: number;
        documentId: string;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: string[] | null;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: string | null;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
    }[];
  }[]
>;
import Api, { BASE_URL_MEDIA } from "@/service/service";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";
import Card from "./_components/card";
import Category from "./_components/category";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Cafepage = () => {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      Api.get("/categories?populate[icon]=*&populate[items][populate][0]=image"),
  });

  const [showSplash, setShowSplash] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setStartAnimation(true);
    }, 5000);

    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 6000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeout);
    };
  }, []);

  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  const getImgUrl = (url?: string) => {
    if (!url) return undefined;
    return BASE_URL_MEDIA + url;
  };

  const categories = categoriesQuery.data?.data?.data;

  if (showSplash) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F6D5AE]">
        <motion.div
          initial={{ scale: 0.8, opacity: 1 }}
          animate={startAnimation ? { scale: 1.2, opacity: 0 } : {}}
          transition={{ duration: 2 }}
          className="flex flex-col items-center"
        >
          <Image src={"/logosplash.svg"} alt="logocafe" height={130} width={270} />
          <div className="mt-4">
            <Oval visible={true} height={50} width={50} color="#028066" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-4 relative max-w-[500px] bg-[#F6D5AE]  rounded-t-full flex flex-col items-center px-6 pt-2  overflow-hidden font-peyda">
      <div className="mx-auto fixed -z-10 inset-0 max-w-[500px] h-screen bg-backgrund bg-no-repeat bg-cover"></div>
      
      {/* logo cafe */}
      <div className="pt-20">
        <Image src={"/main-logo.svg"} alt="logocafe" height={100} width={200} />
      </div>

      {/* دسته‌بندی‌ها */}
      {categoriesQuery.isLoading ? (
        <div className="flex flex-col flex-1 justify-center items-center gap-2">
          <Oval visible={true} height="30" width="30" color="#028066" strokeWidth={5} ariaLabel="oval-loading" />
          <p className="text-center text-[#028066] text-sm font-medium">ممنون از صبرتون</p>
        </div>
      ) : (
        <div className="sticky top-0 z-10  w-full py-3 flex gap-2 overflow-x-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {categories?.map((category) => (
            <div key={category.id} className="py-3 flex-shrink-0">
              <Category
                onClick={() => setCategoryId(category.id)}
                isActive={categoryId === category.id}
                id={category.id}
                imageUrl={getImgUrl(category.icon.url)}
                name={category.name}
              />
            </div>
          ))}
        </div>
      )}

      {/* بخش آیتم‌های منو */}
      <div className="overflow-y-auto w-full max-h-[70vh] mt-4">
        {categories?.map((category) => {
          if (category.items?.length === 0) return null;
          return (
            <div key={category.id} className="py-3 flex-shrink-0">
              <h1 id={category.id?.toString()} className="text-right text-lg font-bold text-black pb-2">
                {category.name}
              </h1>
              <div className="flex flex-col gap-3">
                {category.items?.map((item) => (
                  <Card
                    key={item.id}
                    imageUrl={getImgUrl(item?.image?.url)}
                    title={item.name}
                    description={item.description}
                    price={item.price}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cafepage;
