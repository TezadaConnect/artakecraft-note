'use client';
import Navbar from '@src/components/common/Navbar';
import Link from 'next/link';
import { Fragment } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AppPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return router.replace('/dashboard');
  }

  return (
    <Fragment>
      <div>
        <Navbar />
        <section className="w-full text-center">
          <div className="mt-24 flex items-center flex-col gap-6 text-slate-400">
            <h1 className="mx-5 head_text">
              Unleash the <span className="blue_gradient">writesmith</span> within!
            </h1>
            <p className="md:w-3/4 mx-5 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ad laborum dolores iusto consectetur, modi tempora tempore. Natus,
              facilis iusto adipisci beatae, molestias eligendi saepe temporibus culpa, fugiat eos quas!
            </p>
            <Link href="/dashboard" className="btn-blue px-10 py-4 mt-10 font-semibold">
              Try now
            </Link>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default AppPage;
