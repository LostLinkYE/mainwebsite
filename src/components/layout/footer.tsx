import * as React from "react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-4 md:py-6 text-xs md:text-sm text-zinc-600 dark:border-zinc-800">
      <div className="container flex flex-col items-center justify-between gap-2 md:gap-3 md:flex-row">
        <p className="text-center md:text-left">© {new Date().getFullYear()} LostLink. Representing, A Branch Of Young Enterprise. All rights reserved.</p>
        <div className="flex items-center gap-3 md:gap-5">
          <a href="#" className="hover:text-black">Privacy</a>
          <a href="#" className="hover:text-black">Terms</a>
          <a href="#" className="hover:text-black">Contact</a>
        </div>
      </div>
    </footer>
  );
}
