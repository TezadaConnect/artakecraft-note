'use client';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, getProviders, signOut, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<any>(null);
  const isRendered = useRef(true);
  const [animateRef] = useAutoAnimate();

  useEffect(() => {
    if (isRendered.current) {
      isRendered.current = false;
      const handlgeGetProviders = async () => {
        const res = await getProviders();
        setProviders(res);
      };
      handlgeGetProviders();
    }
  }, []);

  return (
    <nav className="py-2 flex justify-center top-0 z-10 sticky bg-slate-950 text-slate-300 w-full">
      <div className="w-10/12 flex justify-between items-center">
        <Link href={session?.user ? '/dashboard' : '/'} className="font-semibold text-lg">
          Artakecraft Note
        </Link>

        {/* DESKTOP NAVIGATION */}
        {session?.user ? (
          <span className="flex gap-5 items-center" ref={animateRef}>
            <Link className="btn-dark px-5 py-2 text-slate-200" href="/dashboard?isProject=true">
              + Create
            </Link>
            <button
              className="btn-border-dark px-5 py-2 text-slate-200"
              onClick={async () => await signOut({ callbackUrl: 'http://localhost:3000/' })}
            >
              Sign Out
            </button>
            <Link href="/dashboard" className="flex gap-2 flex-center">
              <Image src={session?.user.image ?? ''} width={30} height={30} className="rounded-full" alt="profile" />
            </Link>
          </span>
        ) : (
          <span className="flex gap-5 items-center" ref={animateRef}>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id, {
                      callbackUrl: 'http://localhost:3000/dashboard'
                    });
                  }}
                  className="btn-dark px-5 py-2"
                >
                  Sign in
                </button>
              ))}
            <Link href="/about" className="hover:text-teal-600 text-sm">
              About
            </Link>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
