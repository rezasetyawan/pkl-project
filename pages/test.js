import NavbarPR from "@/components/public-relation/Navbar";
import PublicRelationHome from "@/components/public-relation/Home";
import { useState } from "react";
import CompanyList from "@/components/CompanyList";
import Link from "next/link";
import AddCompanyAccountForm from "@/components/public-relation/AddCompanyAccountForm";

export default function TestPage() {
  const [sidebar, setSideBar] = useState(false);
  return (
    <>
      <AddCompanyAccountForm></AddCompanyAccountForm>
    </>
  );
}
