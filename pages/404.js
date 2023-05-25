import NotFoundVector from "../public/logo/404-vector.svg";
export default function Error404() {
  return (
    <article className="w-full h-screen flex justify-center items-center">
      <div>
        <NotFoundVector />
        <h2 className="font-sans font-bold text-lg text-center">Page Not Found</h2>
      </div>
    </article>
  );
}
