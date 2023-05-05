import { useRouter } from "next/router";
import BackButtonIcon from "../../public/icon/back-button-icon.svg";
import Link from "next/link";
export default function CompanyDetail({ companyDetailData }) {
  const router = useRouter();
  const mou = true;
  return (
    <article className="w-full text-center relative h-full">
      <div className="absolute -top-2 left-3">
        <button
          onClick={() => router.back()}
          className="text-center py-4 px-5 "
        >
          <BackButtonIcon />
        </button>
      </div>
      <div className="mx-auto mt-10">
        <h3 className="font-bold font-poppins tracking-wide text-xl">
          DETAIL PERUSAHAAN
        </h3>
        <section className="px-10 mt-10">
          <h4 className="font-poppins text-lg font-bold text-[#404040] tracking-wide border-b border-[#c0c0c0] w-max mb-6 text-left max-w-full">
            {companyDetailData.name || "-"}
            <sup
              className={`font-bold text-[10px] leading-4 ml-1 text-[#0066ff] ${
                !mou && "hidden"
              }`}
            >
              MOU
            </sup>
          </h4>
          <div className="flex my-3">
            <h5 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
              City
            </h5>
            <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
              {companyDetailData.city || "-"}
            </p>
          </div>
          <div className="flex my-3">
            <h5 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
              Address
            </h5>
            <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
              {companyDetailData.address || "-"}
            </p>
          </div>
          <div className="flex my-3">
            <h5 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
              Major target
            </h5>
            <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] uppercase">
              {companyDetailData.major_target || "-"}
            </p>
          </div>
          <div className="flex my-3">
            <h5 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
              Phone
            </h5>
            <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
              {companyDetailData.phone || "-"}
            </p>
          </div>
          <div className="flex my-3">
            <h5 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
              Website
            </h5>
            <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
              {companyDetailData.website || "-"}
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
