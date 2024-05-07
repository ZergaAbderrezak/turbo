import { type Car } from "@prisma/client";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaGasPump, FaMapMarkedAlt, FaDollarSign } from "react-icons/fa";
import { GiGearStick } from "react-icons/gi";
import React, { useState, useEffect } from "react";
import { Input } from "~/components/input";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const Search: NextPage = () => {
  const { data, isLoading } = api.cars.getAllCars.useQuery();
  const { mutate } = api.cars.deleteCar.useMutation();
  const { data: userData } = useSession();

  const [model, setModel] = useState("");
  const [make, setMake] = useState("");
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(2024);
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(10000);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  const handleMakeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMake(e.target.value);
  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setModel(e.target.value);
  const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStartYear(parseInt(e.target.value));
  const handleEndYearChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEndYear(parseInt(e.target.value));
  const handleStartPriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStartPrice(parseInt(e.target.value));
  const handleEndPriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEndPrice(parseInt(e.target.value));
  const handleDelete = (id: string) => {
    mutate({ id });
    setFilteredCars((cars) => cars.filter((car: Car) => car.id !== id));
  };

  const handleFilter = () => {
    if (data) {
      const filtered = data.filter(
        (car) =>
          car.make.toLowerCase().includes(make.toLowerCase()) &&
          car.model.toLowerCase().includes(model.toLowerCase()) &&
          (!isNaN(startYear) ? car.year >= startYear : car.year) &&
          (!isNaN(endYear) ? car.year <= endYear : car.year) &&
          (!isNaN(startPrice)
            ? car.pricePerDay >= startPrice
            : car.pricePerDay) &&
          (!isNaN(endPrice) ? car.pricePerDay <= endPrice : car.pricePerDay)
      );
      setFilteredCars(filtered);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    data && setFilteredCars(data);
  }, [data]);

  if (isLoading) return <LoadingPage />;

  const displayedCars = filteredCars.length > 0 ? filteredCars : [];

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = displayedCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div className="flex flex-row items-start bg-white text-black">
      <div className="m-8 grid w-full max-w-xl gap-6  rounded border bg-white p-8 shadow-md">
        <Input
          className="col-span-2"
          id="make"
          name="Name"
          placeholder=""
          onChange={handleModelChange}
          type="text"
          value={model}
        ></Input>
        <Input
          className="col-span-2"
          id="model"
          name="Brand"
          placeholder=""
          onChange={handleMakeChange}
          type="text"
          value={make}
        ></Input>
        <Input
          id="syear"
          name="Starting Year"
          placeholder=""
          onChange={handleStartYearChange}
          type="number"
          value={startYear}
        ></Input>
        <Input
          id="eyear"
          name="Ending Year"
          placeholder=""
          onChange={handleEndYearChange}
          type="number"
          value={endYear}
        ></Input>
        <Input
          id="sprice"
          name="Starting Price"
          placeholder=""
          onChange={handleStartPriceChange}
          type="number"
          value={startPrice}
        ></Input>
        <Input
          id="eprice"
          name="Ending Price"
          placeholder=""
          onChange={handleEndPriceChange}
          type="number"
          value={endPrice}
        ></Input>

        <button
          onClick={handleFilter}
          className="my-1 rounded-md bg-indigo-700 px-4 py-3 text-white hover:bg-indigo-800"
        >
          Filter
        </button>
      </div>
      <div className="mt-4 flex w-full max-w-6xl flex-col gap-4">
        {currentCars.length == 0 ? (
          <div className="m-4">
            no cars available, please update your filter!
          </div>
        ) : (
          currentCars.map((car: Car) => (
            <div
              key={car.id}
              className="m-4 flex flex-row rounded border p-1 shadow-md"
            >
              <Image
                src={`/${car.make}.webp`}
                width={640}
                height={640}
                className="w-128"
                alt="Car image"
              />
              <div className="flex w-full flex-col gap-3 px-6 py-4">
                <div className="mb-2 text-center text-3xl font-bold text-black">
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
                <Link
                  href={"car/" + car.id}
                  className="my-4 inline-flex items-center self-center rounded-lg bg-indigo-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 "
                >
                  View car
                  <svg
                    aria-hidden="true"
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </Link>
                {userData?.user.id === car.ownerId && (
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="w-24 self-center rounded-lg bg-red-600 py-1 text-center text-white hover:bg-red-800"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}

        <div className="mt-8 flex justify-center space-x-2">
          {Array(Math.ceil(displayedCars.length / carsPerPage))
            .fill({})
            .map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`rounded-md px-4 py-2 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-blue-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
