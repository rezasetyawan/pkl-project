import { useRouter } from "next/router";
import Link from "next/link";
import BackButtonIcon from "../../public/icon/back-button-icon.svg";
import { useState } from "react";
import Loading from "../Loading";

export default function CompanyDetail({ companyDetailData }) {
  const router = useRouter();  
  
  return (
    <article className="w-full text-center relative h-full bg-white pt-10">
      <div className="absolute top-8 left-3 min-[425px]:left-5">
        <button
          onClick={() => router.back()}
          className="text-center p-3 hover:scale-110 transition-transform hover:ring-2 rounded-md"
        >
          <BackButtonIcon />
        </button>
      </div>
      <div>
        <h2 className="font-bold font-poppins tracking-wide text-lg sm:text-xl">
          DETAIL PERUSAHAAN
        </h2>
        <section className="px-10 mt-10">
          <h3 className="font-poppins text-lg font-bold text-[#404040] tracking-wide border-b border-[#c0c0c0] w-max mb-6 text-left max-w-full">
            {companyDetailData.name || "-"}
            <sup
              className={`font-bold text-[10px] leading-4 ml-1 text-[#0066ff] ${
                !companyDetailData.isMOU && "hidden"
              }`}
            >
              MOU
            </sup>
          </h3>
          <div className="flex my-3">
            <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
              City
            </h4>
            <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
              {companyDetailData.city || "-"}
            </p>
          </div>
          <div className="flex my-3">
            <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
              Address
            </h4>
            <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
              {companyDetailData.address || "-"}
            </p>
          </div>
          <div className="flex my-3">
            <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
              Field
            </h4>
            <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
              {companyDetailData.field || "-"}
            </p>
          </div>
          <div className="flex my-3">
            <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
              Major target
            </h4>
            <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] uppercase">
              {companyDetailData.major_target || "-"}
            </p>
          </div>
          <div className="flex my-3">
            <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
              Phone
            </h4>
            <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
              {companyDetailData.phone || "-"}
            </p>
          </div>
          <div className="flex my-3">
            <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
              Website
            </h4>
            {companyDetailData.website ? (
              <Link
                href={`https://${companyDetailData.website}`}
                className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] text-blue-600 underline hover:scale-105 transition-transform"
                target="blank"
                rel="noopener noreferrer"
              >
                {companyDetailData.website}
              </Link>
            ) : (
              <span className="text-black/60">-</span>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
