"use client";

import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { useEffect } from "react";
import { TfiTicket } from "react-icons/tfi";

const Header = () => {
  const { data: session, status } = useSession(); // Get session data
  // console.log("Session data:", session);
  // useEffect(() => {
  //   console.log("Session status:", status); // will log 'loading', 'authenticated', or 'unauthenticated'
  //   if (status === "authenticated") {
  //     console.log("Session data:", session); // log session data when authenticated
  //   }
  // }, [session, status]); // triggers every time session or status changes
  useEffect(() => {
    console.log("Session status:", status); // Logs the session status ('loading', 'authenticated', or 'unauthenticated')
    if (status === "authenticated") {
      console.log("Session data:", session); // Log session data when authenticated
      console.log("User data:", session?.user); // Log user data when authenticated
    }
  }, [session, status]);
  

  // Only render the header after the session status is no longer 'loading'
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <nav className="drop-shadow-2xl flex items-center justify-between p-3 border-b border-slate-200 border-spacing-0 bg-slate-100 h-24">
      <div className="hover-inverse flex items-center justify-center gap-2">
        <Link
          href={"/"}
          className="text-3xl font-bold max-sm:text-2xl bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent"
        >
          <Image
            src={"/images/logo.png"}
            alt="logo"
            height={90} // Aspect ratio control
            width={90} // Aspect ratio control
            className="hover-inverse w-full h-auto max-w-[120px] max-h-[120px] py-4"
          />
        </Link>
      </div>

      <div className="flex justify-center items-center gap-4">
        <div className="flex items-center justify-center gap-5 font-semibold max-md:hidden">
          <Link
            href={"/"}
            className="flex items-center justify-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all"
          >
            <div className="scale-110">
              <HomeIcon />
            </div>
            <p>Home</p>
          </Link>

          <Link
            href={"/events"}
            className="flex items-center justify-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all"
          >
            <div className="scale-110">
              <CgProfile />
            </div>
            <p>Events</p>
          </Link>

          <Link
            href={"/artists"}
            className="flex items-center justify-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all"
          >
            <div className="scale-110">
              <PersonIcon />
            </div>
            <p>Artists</p>
          </Link>

          <Link
            href={"/tags"}
            className="flex items-center justify-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all"
          >
            <div className="scale-110">
              <TfiTicket />
            </div>
            <p>Tags</p>
          </Link>

          {/* Conditionally render "Create Event" link if user is logged in */}
          {session?.user && (
            <Link
              href={"/create-event"}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
            >
              Create Event
            </Link>
          )}

          {/* Display login or logout button based on session */}
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn("google")} // Trigger Google OAuth login
              className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
            >
              Login
            </button>
          )}
        </div>
        <div className="flex justify-center items-center gap-4 max-sm:gap-1"></div>
      </div>
    </nav>
  );
};

export default Header;
