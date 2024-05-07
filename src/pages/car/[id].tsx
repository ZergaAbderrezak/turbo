import { type GetStaticProps, type NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaDollarSign, FaGasPump, FaMapMarkedAlt } from "react-icons/fa";
import { GiGearStick } from "react-icons/gi";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const SingleCarPage: NextPage<{ id: string }> = ({ id }) => {
  const { data: car, isLoading } = api.cars.getCarById.useQuery({ id });
  // const { data: userData } = useSession();

  if (isLoading) return <div>Loading...</div>;
  if (!car) return <div>404</div>;

  const { data: user } = api.users.getUserById.useQuery({ id: car.ownerId });

  return (
    <div className="p4 container m-auto mt-4 flex flex-col  overflow-hidden rounded shadow-lg">
      <Image
        width={1200}
        height={1200}
        className="w-1/2 self-center"
        src={`/${car.make}.webp`}
        alt="Car image"
      />
      <div className="flex flex-row justify-around">
        <div key={car.id} className="m-4 flex flex-row p-1 ">
          <div className="flex w-full flex-col gap-3 px-6 py-4">
            <div className="mb-2 text-3xl font-bold text-black">
              {car.make} {car.model} {car.year}
            </div>
            <div className="my-4 flex flex-col gap-3 px-6 text-gray-700">
              <div className="flex flex-row items-center gap-2">
                <FaGasPump className="h-6 w-6" />
                <span className="text-xl capitalize">{car.fuel}</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <GiGearStick className="h-6 w-6" />
                <span className="text-xl capitalize">{car.type}</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <FaMapMarkedAlt className="h-6 w-6" />
                <span className="text-xl capitalize">{car.location}</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <FaDollarSign className="h-6 w-6" />
                <span className="text-xl capitalize">
                  {car.pricePerDay.toLocaleString()} DZD
                </span>
              </div>
            </div>
            {/* {userData?.user.id === car.ownerId && (
              <button
                onClick={() => handleDelete(car.id)}
                className="w-24 self-center rounded-lg bg-red-600 py-1 text-center text-white hover:bg-red-800"
              >
                Delete
              </button>
            )} */}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center p-10">
          <Image
            width={240}
            height={240}
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src={user?.image || "/car.png"}
            alt="Profile image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">
            {user?.name}
          </h5>
          <span className="text-sm text-gray-500 ">{user?.email}</span>
          <div className="mt-4 flex space-x-3 md:mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.cars.getCarById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
export default SingleCarPage;
