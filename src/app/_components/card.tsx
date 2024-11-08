import Image from "next/image";
import Tomanicon from "../../../public/icon/toman";

interface CardProps {
  imageUrl?: string;
  title: string;
  description: string;
  price: number;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, description, price }) => {
  return (
    <div className="bg-white rounded-2xl flex shadow-lg">
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
    </div>
  );
};

export default Card;
