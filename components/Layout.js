import { Work_Sans, Poppins } from "next/font/google";

const work_sans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work",
});

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function Layout({ children }) {
  return (
    <main
      className={`${work_sans.variable} ${poppins.variable} font-sans`}
    >
      {children}
    </main>
  );
}
