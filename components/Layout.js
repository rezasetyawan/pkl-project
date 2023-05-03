import { Work_Sans, Poppins } from "next/font/google";

const work_sans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work",
});

export default function Layout({ children }) {
  return (
    <main className={`${work_sans.variable} font-sans bg-slate-50 h-screen`}>
      {children}
    </main>
  );
}
