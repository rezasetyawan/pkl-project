import BackButtonIcon from "../../public/icon/back-button-icon.svg";
import UserIcon from "../../public/icon/user-icon.svg";
import LogOutButtonIcon from "../../public/icon/logout-button-icon.svg";
import EditButtonIcon from "../../public/icon/edit-button-icon.svg";
export default function StudentProfile() {
  return (
    <article className="w-full pb-6 bg-white mx-auto sm:max-w-md sm:shadow-md">
      <div className="flex items-center justify-center gap-20 pt-8 min-[425px]:gap-28">
        <button className="p-3 hover:scale-110 transition-transform hover:ring-2 rounded-md">
          <BackButtonIcon />
        </button>
        <h2 className="font-sans text-2xl font-semibold">Profile</h2>
        <button className="p-3 hover:scale-110 transition-transform hover:ring-2 rounded-md">
          <LogOutButtonIcon />
        </button>
      </div>
      <section className="text-center w-full font-medium ">
        <div className="overflow-hidden rounded-[50%] w-24 h-24 mx-auto border flex justify-center p-1 mt-8">
          <UserIcon />
        </div>
        <h3 className="font-sans text-xl mt-3">Reza Setyawan</h3>
        <h4 className="font-sans text-black/60 text-sm">XI PPLG 3</h4>
        <h4 className="font-sans text-black/60 text-sm">10146</h4>
        <button className="flex mt-2 gap-1 items-center mx-auto font-sans text-[#5e5e5e] p-1 border border-[#717171] rounded-md hover:">
          Manage <EditButtonIcon />
        </button>
      </section>
      <section className="mx-10 my-6 px-3 py-4 border border-[#717171] rounded-md">
        <h4 className="font-sans font-sm font-medium text-center">
          Inter Detail
        </h4>
        <div className="text-sm font-normal">
          <div className="my-3">
            <h5 className="font-sans font-medium">PKL Place</h5>
            <p className="border-black/40 border-b-[1px] font-sans">
              Tokopedia
            </p>
          </div>

          <div className="my-3">
            <h5 className="font-sans font-medium">PKL Address</h5>
            <p className="border-black/40 border-b-[1px] font-sans">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              sit amet lacinia neque, ac pharetra ante. Proin velit risus,
              viverra at tellus sed, mattis tempor sem. Quisque rhoncus quam in
              volutpat pellentesque. Mauris pharetra placerat est, nec
              vestibulum libero gravida nec.
            </p>
          </div>

          <div className="mt-3">
            <h5 className="font-sans font-medium">PKL Date</h5>
            <div className="flex gap-5 font-normal text-center">
              <p className="w-[50%] border-black/40 border-b-[1px] font-sans">
                18-06-2023
              </p>
              -
              <p className="w-[50%] border-black/40 border-b-[1px] font-sans">
                20-12-2023
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
