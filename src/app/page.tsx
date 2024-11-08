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
import { cubicBezier, motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

const Cafepage = () => {
  const categoriesQuery = useQuery<{ data: { data: any[] } }>({
    queryKey: ["categories"],
    queryFn: () =>
      Api.get(
        "/categories?populate[icon]=*&populate[items][populate][0]=image"
      ),
  });

  // const [showSplash, setShowSplash] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setStartAnimation(true);
    }, 2000);

    // const timeout = setTimeout(() => {
    //   setShowSplash(false);
    // }, 6000);

    return () => {
      clearTimeout(initialTimeout);
      // clearTimeout(timeout);
    };
  }, []);

  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  const getImgUrl = (url?: string) => {
    if (!url) return undefined;
    return BASE_URL_MEDIA + url;
  };

  const categories = categoriesQuery.data?.data?.data.filter((category) => category.items.length > 0);

  const showSplash = categoriesQuery.isLoading || !startAnimation;


  // if (showSplash) {
  //   return (
  //     <motion.div layoutId="container" className="flex items-center justify-center h-screen bg-[#F6D5AE]">
  //       <motion.div
  //         initial={{ scale: 0.8, opacity: 1 }}
  //         // animate={startAnimation ? { scale: 1.2, opacity: 0 } : {}}
  //         transition={{ duration: 2 }}
  //         className="flex flex-col items-center"
  //         layoutId="logo"
  //       >
  //         <Image src={"/logosplash.svg"} alt="logocafe" height={130} width={270} />
  //         <div className="mt-4">
  //           <Oval visible={true} height={50} width={50} color="#028066" />
  //         </div>
  //       </motion.div>
  //     </motion.div>
  //   );
  // }

  return (
    <motion.div
      initial={{ paddingTop: "0" }}
      transition={{ duration: 0.5 }}
      animate={!showSplash ? { paddingTop: "32px" } : {}}
      className="flex justify-center items-center h-screen"
    >
      <motion.div
        initial={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }}
        transition={{ duration: 0.5 }}
        animate={
          !showSplash
            ? { borderTopLeftRadius: "300px", borderTopRightRadius: "300px" }
            : {}
        }
        className="h-full relative max-w-full sm:max-w-[500px] bg-[#F6D5AE]  rounded-t-full flex flex-col items-center px-6 pt-2  overflow-hidden font-peyda"
      >
        <div className="mx-auto fixed -z-10 inset-0 max-w-full sm:max-w-[500px] h-screen bg-backgrund bg-no-repeat bg-cover"></div>

        {/* logo cafe */}
        <motion.div
          initial={{ scale: 1.5, paddingTop: "200px" }}
          transition={{ delay: 0.5, duration: 1 }}
          animate={!showSplash ? { scale: 1, paddingTop: "80px" } : {}}
          className="pt-20 transform"
        >
          <Image
            src={"/main-logo.svg"}
            alt="logocafe"
            height={100}
            width={200}
          />
        </motion.div>

          {/* دسته‌بندی‌ها */}
        <AnimatePresence>
          {showSplash ? (
            <motion.div
              transition={{ duration: 0 }} 
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex  w-[500px] flex-col mt-36 justify-center items-center gap-2"
            >
              <Oval
                visible={true}
                height="30"
                width="30"
                color="#028066"
                strokeWidth={5}
                ariaLabel="oval-loading"
              />
              <p className="text-center text-[#028066] text-sm font-medium">
                ممنون از صبرتون
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div

                className="  w-full py-3  flex-shrink-0 flex gap-2 overflow-x-auto overflow-y-hidden   scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100"
              >
                {categories?.map((category) => (
                  <motion.div
                  initial={{ opacity: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  animate={{ opacity: 1 }}
                    key={category.id}
                    className="py-3 flex-shrink-0 h-[100px]"
                  >
                    <Category
                      onClick={() => setCategoryId(category.id)}
                      isActive={categoryId === category.id}
                      id={category.id}
                      imageUrl={getImgUrl(category.icon.url)}
                      name={category.name}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* بخش آیتم‌های منو */}
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
                animate={{ opacity: 1 }}
                className="overflow-y-auto w-full"
              >
                {categories?.map((category) => {
                  if (category.items?.length === 0) return null;
                  return (
                    <div key={category.id} className="py-3 flex-shrink-0">
                      <h1
                        id={category.id?.toString()}
                        className="text-right text-lg font-bold text-black pb-2"
                      >
                        {category.name}
                      </h1>
                      <div className="flex flex-col gap-3">
                        {category.items?.map((item: any) => (
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
              </motion.div>
            </>

          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Cafepage;
