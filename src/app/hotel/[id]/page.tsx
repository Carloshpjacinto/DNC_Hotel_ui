import { getHotelById } from "@/app/api/hotels/route"; 
import Link from "@/components/Link";
import Image from "next/image";

type Params = {
  id: string;
};

type PageProps = {
  params: Params;
};

const HotelDetalhePage = async ({ params }: PageProps) => {
  console.log({ params });
  const { id } = params;
  const hotel = await getHotelById(Number(id));

  return (
    <div className="flex flex-col w-full px-10 py-20 sm:px-20 md:px-32 lg:px-56 xl:px-72">
      <section className="w-full">
        <Link href="/">Voltar</Link>
      </section>
      <div className="relative w-full h-80 mt-2">
        <Image
          quality={100}
          src={hotel.image ?? "/no-hotel.jpg"}
          alt=""
          fill
          className="object-cover rounded-3xl"
        />
      </div>
    </div>
  );
};

export default HotelDetalhePage;
