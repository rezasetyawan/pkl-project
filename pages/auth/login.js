import Head from "next/head";
import SignInForm from "@/components/SignIn";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignInForm></SignInForm>
      <Link href={'/'}>home</Link>
    </>
  );
}
