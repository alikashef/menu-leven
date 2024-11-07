"use client";

import Image from "next/image";
import { Oval } from "react-loader-spinner";



const Themenupage = () => {
  return (
    // main background
    <div className="mx-auto max-w-[375px] px-6 pt-14 h-screen bg-backgrund rounded-lg">
      {/* menu background */}
      <div className="bg-[#F6D5AE] w-[335px] h-full rounded-t-full flex flex-col items-center justify-center boxsh">
        {/* logo cafe */}
        <div className="pb-32">
          <Image
            src={"/logocafe.png"}
            alt="logocafe"
            height={130}
            width={270}
          />
        </div>
        <div className="bg-red w-screen h-screen">
        <div className="flex flex-col items-center  gap-2">
          {/* looding circle */}
          <Oval
            visible={true}
            height="30"
            width="30"
            color="#028066"
            strokeWidth={5}
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          {/* loading text */}
          <p className="text-center text-[#028066] text-sm font-medium">
            ممنون از صبرتون
          </p>
        </div>
        </div>
      
      </div>
    </div>
  );
};

export default Themenupage;
