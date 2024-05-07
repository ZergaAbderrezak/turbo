import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "~/components/input";
import { LoadingSpinner } from "~/components/loading";
import { type CarProps } from "~/server/api/routers/cars";
import { getServerAuthSession } from "~/server/auth";

import { api } from "~/utils/api";

const New: NextPage = () => {
  const [carDetails, setCarDetails] = useState<CarProps>({
    make: "",
    model: "",
    color: "",
    fuel: "gasoline",
    type: "manual",
    year: 0,
    location: "",
    pricePerDay: 0,
  });
  const { mutate, isLoading, isSuccess, error } = api.cars.addCar.useMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type == "number") {
      return setCarDetails({
        ...carDetails,
        [event.target.name]: parseInt(event.target.value),
      });
    }
    setCarDetails({ ...carDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(carDetails);
  };

  return (
    <div className="container mx-auto mt-10 flex flex-col gap-36 bg-white sm:flex-row sm:gap-16">
      <Image
        className="h-[640px] w-[500px]"
        width={500}
        height={50}
        alt="road image"
        src={"/hero-background.jpg"}
      />
      <form
        className="mb-4 grid w-full max-w-2xl gap-6 rounded border bg-white px-8 pb-8 pt-6 shadow-md sm:pt-0"
        onSubmit={handleSubmit}
      >
        <h1 className="pt-4 text-xl font-bold">Add a new car</h1>
        <Input
          className="col-span-2"
          id="model"
          name="Model"
          placeholder="Name"
          onChange={handleChange}
          type="text"
          value={carDetails.model}
        />
        <Input
          id="make"
          name="Brand"
          placeholder="Brand"
          onChange={handleChange}
          type="text"
          value={carDetails.make}
        />
        <Input
          id="color"
          name="Color"
          placeholder="Color"
          onChange={handleChange}
          type="text"
          value={carDetails.color}
        />
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Fuel
          </label>
          <select
            id="category"
            defaultValue={carDetails.fuel}
            className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          >
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Type
          </label>
          <select
            id="category"
            defaultValue={carDetails.type}
            className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          >
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>
        <Input
          id="year"
          name="Year"
          placeholder="Year"
          onChange={handleChange}
          type="number"
          value={carDetails.year}
        />
        <Input
          id="pricePerDay"
          name="Price per day"
          placeholder="Price per day"
          onChange={handleChange}
          type="number"
          value={carDetails.pricePerDay}
        />
        <Input
          className="col-span-2"
          id="location"
          name="Location"
          placeholder="Location"
          onChange={handleChange}
          type="text"
          value={carDetails.location}
        />

        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline h-12 w-36 rounded-lg bg-indigo-700 px-4 py-2 font-bold text-white hover:bg-indigo-800 focus:outline-none"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <LoadingSpinner /> Loading
              </div>
            ) : (
              "Add Car"
            )}
          </button>
          <p>{isSuccess && "Success!"}</p>
          <p>{error && error.message}</p>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default New;
