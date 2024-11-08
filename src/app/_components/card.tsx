import Image from "next/image";
import Tomanicon from "../../../public/icon/toman";

interface CardProps {
  imageUrl?: string;
  title: string;
  description: string;
  price: string;
  exist: boolean;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  price,
  exist = true,
}) => {
  return (
    <div
      className={
        "bg-white rounded-2xl flex shadow-lg relative overflow-hidden" +
        (!exist ? " filter grayscale" : "")
      }
    >
      <div className="w-1/2">
        {imageUrl && (
          <Image
            className="rounded-l-2xl"
            src={imageUrl}
            alt="menu"
            height={300}
            width={300}
          />
        )}
      </div>
      <div className="w-1/2 flex flex-col justify-center text-right px-4 py-2">
        <p className="text-black text-lg font-bold">{title}</p>
        <p className="text-black text-xs font-normal">{description}</p>
        <div className="flex flex-row-reverse gap-1 items-center mt-2">
          <p className="text-black text-lg font-bold">{price}</p>
          <Tomanicon />
        </div>
      </div>

      {!exist && (
        <div className="absolute top-0  flex items-start px-3 py-3 right-0 w-full h-full bg-gradient-to-l from-transparent to-[#028066] opacity-50">
         
         <span className="bg-white text-xs rounded-lg py-2 px-4 text-black font-semibold">

          ناموجود
         </span>
        </div>
      )}
    </div>
  );
};

export default Card;
