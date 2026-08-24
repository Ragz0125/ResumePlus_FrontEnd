"use client"

import Image from "next/image";
import HomeScreen from "./pages/home/page";
import LandingModal from "./components/LandingModal/page";
import { useContext } from "react";
import { AppContext } from "./store/store";
import LoginModal from "./components/Login&SignUp/loginModal";

export default function Home() {
  const {state, setState}:any = useContext(AppContext)

  return (
    <>
    {state?.openModal && !state?.isLoggedIn && <LandingModal/>}
    <HomeScreen/>
    </>
  );
}
