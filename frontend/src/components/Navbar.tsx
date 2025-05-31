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
import { useAuth } from "@/lib/auth-context";
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
  const { user, logout, isAuthenticated } = useAuth();

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
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="h-6 w-6"
                  onClick={() => setIsOpen(true)}
                />
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-4">
                  {routeList.map((route: RouteProps, i) => (
                    <Link
                      rel="noreferrer noopener"
                      to={route.href}
                      key={i}
                      className={`text-[17px] ${buttonVariants({
                        variant: "ghost",
                      })}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {route.label}
                    </Link>
                  ))}
                  {isAuthenticated ? (
                    <>
                      <span className={buttonVariants({ variant: "secondary" })}>
                        {user?.name}
                      </span>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className={buttonVariants({ variant: "destructive" })}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        rel="noreferrer noopener"
                        to="/signup"
                        className={`w-[110px] ${buttonVariants({
                          variant: "secondary",
                        })}`}
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </Link>
                      <Link
                        rel="noreferrer noopener"
                        to="/login"
                        className={`w-[110px] ${buttonVariants({
                          variant: "secondary",
                        })}`}
                        onClick={() => setIsOpen(false)}
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

          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <span className={buttonVariants({ variant: "secondary" })}>
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className={buttonVariants({ variant: "destructive" })}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  rel="noreferrer noopener"
                  to="/signup"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Sign Up
                </Link>
                <Link
                  rel="noreferrer noopener"
                  to="/login"
                  className={buttonVariants({ variant: "secondary" })}
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
