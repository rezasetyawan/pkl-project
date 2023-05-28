import BackButtonIcon from "../public/icon/back-button-icon.svg";
import { useRouter } from "next/router";

export default function About() {
  const router = useRouter();
  return (
    <article className="w-full full h-screen mx-auto bg-white">
      <div className="relative max-w-xl mx-auto">
      <button
        className="absolute top-3 left-3 p-3 hover:scale-110 transition-transform  min-[425px]:left-2"
        onClick={() => router.back()}
      >
        <BackButtonIcon />
      </button>
      <h2 className="font-sans text-2xl font-semibold p-4 text-center">
        About Us
      </h2>
      <div>
        <h3 className="text-center font-sans text-xl text-primary-color font-semibold mt-10">
          WHO WE ARE
        </h3>
        <p className="px-6 py-4 font-sans font-medium text-xs text-justify">
          &quot;Our group consists of highly motivated students who are working
          together to create a web project for our final school assessment. Each
          member brings unique skills and experiences to the table, allowing us
          to collaborate effectively and produce a high-quality result. Despite
          the challenges we have faced along the way, we have remained committed
          to our goal and have worked tirelessly to ensure that our project
          meets the requirements and exceeds expectations. We are proud of what
          we have accomplished so far and are excited to share our project with
          our peers and instructors.&quot;
        </p>
      </div>
      <div className="mt-20">
        <h2 className="font-sans text-2xl font-semibold p-2 text-center">
          Contact Us
        </h2>
        <div className="border border-black/60 mx-6 rounded-md">
          <h3 className="font-sans text-sm font-semibold p-4 text-center">
            SMK Negeri 8 Semarang
          </h3>
          <ul>
            <li className="mx-6 font-sans font-medium text-xs my-2 list-disc">
              SMK Negeri 8 Semarang Jl. Pandanaran II No.12 Mugassari, Semarang
              Selatan, Kota Semarang, Jawa Tengah,50249
            </li>
            <li className="mx-6 font-sans font-medium text-xs my-2 list-disc">
              Telp: (024) 8312190 Email:{" "}
            </li>
            <li className="mx-6 font-sans font-medium text-xs my-2 pb-4 list-disc">
              Email: smkn8_semarang@yahoo.com
            </li>
          </ul>
        </div>
      </div>
      </div>
    </article>
  );
}
