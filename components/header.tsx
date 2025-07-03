import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";
import { ModeToggle } from "./switch-theme";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm bg-white dark:bg-gray-950">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <Layers className="h-6 w-6 text-primary" />
        <span className="sr-only">Home</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Button asChild variant="outline">
          <Link href="/todo">Todo Example</Link>
        </Button>
        <ModeToggle />
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  );
}
