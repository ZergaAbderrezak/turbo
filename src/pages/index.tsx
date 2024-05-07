import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const cities = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanghasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Alger",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "M'Sila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arréridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naâma",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
    "El M'ghair",
    "El Meniaa",
    "Ouled Djellal",
    "Bordj Baji Mokhtar",
    "Beni Abbes",
    "Timimoun",
    "Touggourt",
    "Djanet",
    "In Salah",
    "In Guezzam",
  ];

  return (
    <>
      <Head>
        <title>Turbo App</title>
        <meta name="description" content="Turbo car rental" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex  flex-col items-center bg-gray-900">
        <section className="">
          <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
              Your Comfort,
              <span className="text-indigo-700"> Our Commitment </span>
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-400  sm:px-16 lg:text-xl xl:px-48">
              At Turbo, we prioritize your convenience and peace of mind.
              We&apos;re dedicated to providing you with a seamless experience
              in renting the finest cars available, ensuring every journey you
              undertake is a pleasure
            </p>
            <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
              <select
                id="cities"
                defaultValue={""}
                className=" block w-40 rounded-lg bg-gray-800 p-2.5 text-sm text-white"
              >
                <option value="" disabled hidden>
                  Select a city
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <Link
                href="search"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-900"
              >
                Search
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
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
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-screen-xl items-center gap-16 px-4 py-8 lg:grid lg:grid-cols-2 lg:px-6 lg:py-16">
            <div className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                We didn&apos;t reinvent the
                <span className="text-6xl text-indigo-700"> wheel</span>
              </h2>
              <p className="mb-4">
                We simply revolutionized the way it turns. With our innovative
                system, we&apos;ve streamlined the car rental process,
                transforming it into a seamless, intuitive, and user-friendly
                experience.
              </p>
              <p>
                Turbo boasts an extensive selection of vehicles catering to
                diverse needs and preferences. From economy cars for budget
                travelers to luxury vehicles for those seeking comfort and
                style, we have you covered. We believe in making your car rental
                experience as smooth as possible, so you can focus on the
                journey ahead. It&apos;s not just about getting from point A to
                B; it&apos;s about the ride in between.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Image
                width={1200}
                height={1200}
                className="w-full rounded-lg"
                src="/hero1.jpg"
                alt="Hero picture 1"
              />
              <Image
                width={1200}
                height={1200}
                className="mt-4  w-full rounded-lg lg:mt-10"
                src="/hero2.jpg"
                alt="Hero picture 2"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
