import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function NavBar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="flex justify-between items-center py-5">
      <div className="flex items-center gap-6">
        <Link href={"/"}>
          <h1 className="font-semibold text-3xl">
            Shunkyz<span className="text-blue-500 leading-relaxed">Blog</span>
          </h1>
        </Link>
        <div className="hidden md:flex items-center gap-6 font-bold">
          <Link
            href={"/"}
            className="text-md font-md hover:text-blue-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href={"/dashboard"}
            className="text-md font-md hover:text-blue-500 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between">
        {user ? (
          <div className="flex items-center gap-6">
            <p className="text-sm lowercase first-letter:uppercase">{user.given_name}</p>
            <div className="">
              <LogoutLink className={buttonVariants({ variant: "secondary" })}>
                Log out
              </LogoutLink>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 font-bold">
            <LoginLink className={buttonVariants()}>Login</LoginLink>
            <RegisterLink
              className={buttonVariants({ variant: "destructive" })}
            >
              Sign up
            </RegisterLink>
          </div>
        )}
        ;
      </div>
    </nav>
  );
}
