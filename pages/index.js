import Head from 'next/head'
import Navbar from '@/components/Navbar';
import Layout from '@/components/Layout';
import { useState } from "react";
import {auth} from '@/lib/firebase'
import {onAuthStateChanged} from "firebase/auth";
import { useRouter } from "next/router";
import Link from 'next/link';

export default function Home() {
  const [navBar, setNavbar] = useState(false);
  const router = useRouter()
  return (
    <>
      <Head>
        <title>PKL PROJECT</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      {onAuthStateChanged(auth, (user) => {
          if(!user) {
            router.push('auth/login')
          }
          router.push('/student')
        })}
       
      </Layout>
    </>
  )
}
