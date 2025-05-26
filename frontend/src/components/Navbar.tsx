import { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
// import { LogoIcon } from "./Icons";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/interviews",
    label: "View Interviews",
  },
  {
    href: "/post-interview",
    label: "Post Interview",
  },
  {
    href: "/chatbot",
    label: "Chatbot",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // This would come from your auth context/state management
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link
              rel="noreferrer noopener"
              to="/"
              className="ml-2 font-bold text-xl flex"
            >
              {/* <LogoIcon /> */}
              InterviewInsight
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    InterviewInsight
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      rel="noreferrer noopener"
                      key={label}
                      to={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  {isLoggedIn ? (
                    <span className={buttonVariants({ variant: "secondary" })}>
                      {username}
                    </span>
                  ) : (
                    <>
                      <Link
                        rel="noreferrer noopener"
                        to="/signup"
                        className={`w-[110px] ${buttonVariants({
                          variant: "secondary",
                        })}`}
                      >
                        Sign Up
                      </Link>
                      <Link
                        rel="noreferrer noopener"
                        to="/login"
                        className={`w-[110px] ${buttonVariants({
                          variant: "secondary",
                        })}`}
                      >
                        Log In
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                rel="noreferrer noopener"
                to={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            {isLoggedIn ? (
              <span className={`border ${buttonVariants({ variant: "secondary" })}`}>
                {username}
              </span>
            ) : (
              <>
                <Link
                  rel="noreferrer noopener"
                  to="/signup"
                  className={`border ${buttonVariants({ variant: "secondary" })}`}
                >
                  Sign Up
                </Link>
                <Link
                  rel="noreferrer noopener"
                  to="/login"
                  className={`border ${buttonVariants({ variant: "secondary" })}`}
                >
                  Log In
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
