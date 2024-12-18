"use client";

import Link from "next/link";
import { Button } from "./button";
import { ModeToggle } from "./mode-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useSession, signIn, signOut } from "next-auth/react";

import { Menu, House, FileText, Mail, Settings, User } from "lucide-react";
import React from "react";
const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="p-4">
      <header className='relative rounded-lg border-b-2 bg-[url("/background.jpg")] bg-cover bg-center px-4 py-6 shadow-xl sm:p-8 md:px-16 lg:px-24 xl:px-24'>
        <div className="rounded-ld absolute inset-0 bg-white/70 dark:bg-black/70"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-zinc-50">
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl">
                Viterr.
              </h1>
            </Link>

            <div className="flex items-center gap-2 fill-current sm:gap-4">
              <ModeToggle />
              {session?.user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="rounded-full px-2 py-6">
                      <img
                        src={session.user.image || ""}
                        alt="User profile"
                        className="h-8 w-8 rounded-full"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <div className="flex flex-col items-center">
                      <p className="text-sm">Bonjour, {session.user.name}</p>
                      <Button
                        variant="ghost"
                        className="mt-4"
                        onClick={() => signOut()}
                      >
                        Déconnexion
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-zinc-900 hover:text-zinc-50 hover:text-zinc-900 dark:text-zinc-50"
                      aria-label="Profile"
                    >
                      <User className="size-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="">
                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        className="flex w-full items-center justify-start gap-2 px-4 py-6"
                        onClick={() => signIn("google")}
                      >
                        <img src="/google.svg" className="size-5" alt="" />
                        Se connecter avec google
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-zinc-900 dark:text-zinc-50"
                  >
                    <Menu />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <div className="flex w-full flex-col">
                    <div className="border-b-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-6"
                      >
                        <Link className="flex items-center gap-2" href="/">
                          <House className="size-4" />
                          Home
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-6"
                      >
                        <Link className="flex items-center gap-2" href="/about">
                          <FileText className="size-4" />
                          About
                        </Link>
                      </Button>
                    </div>
                    <div className="">
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-6"
                      >
                        <Link
                          className="flex items-center gap-2"
                          href="/settings"
                        >
                          <Settings className="size-4" />
                          Settings
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-6"
                      >
                        <Link
                          className="flex items-center gap-2"
                          href="/contact"
                        >
                          <Mail className="size-4" />
                          Contact
                        </Link>
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
