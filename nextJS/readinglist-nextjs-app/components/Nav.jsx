"use client";

import Link from "next/link";
import { signOut, useSession, getProviders } from "next-auth/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <Navbar
      className="bg-white border-gray-200 light:bg-gray-900 w-full"
      variant="floating"
    >
      <NavbarBrand>
        <Link href="/" className="flex gap-2 flex-center">
          <img className="w-10 h-10 rounded-full" src="/logo.jpeg" alt="" />
          <p className="font-bold text-inherit">ReadingList</p>
        </Link>
      </NavbarBrand>
      <NavbarContent></NavbarContent>

      {session?.user ? (
        <>
          <NavbarContent className="justify-end">
            <NavbarItem>
              <img
                className="w-10 h-10 rounded-full"
                src={session.user.image}
                alt=""
              />
            </NavbarItem>
            <NavbarItem>
              <p>{session.user.email}</p>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent className="justify-end">
            <NavbarItem>
              <Link href="/add-book" className="purple_btn">
                Add Book
              </Link>
            </NavbarItem>
            <NavbarItem>
              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>
            </NavbarItem>
          </NavbarContent>
        </>
      ) : (
        <></>
      )}
    </Navbar>
  );
};
export default Nav;
