import InputPklMarkForm from "@/components/company/InputPklMark";
import Link from "next/link";

export default function TestPage() {
  return (
    <>
      <header className=" min-h-[50px] bg-white border-b-[1px] px-5 py-2 md:px-10 md:py-3 grid grid-cols-2 justify-end items-center">
        <Link href="/company/" className="">
          <h1 className="font-sans text-primary-color font-bold text-base min-[425px]:text-xl md:text-2xl drop-shadow-md shadow-blue-600/50">
            Intern Wolu
          </h1>
        </Link>
        <button className="text-right">log out</button>
      </header>
      <InputPklMarkForm></InputPklMarkForm>
    </>
  );
}
