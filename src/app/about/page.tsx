import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Take notes on your next story venture!'
};

const AboutPage = () => {
  return (
    <section className="mt-14 text-slate-400">
      <div className="text-center p-4 flex items-center flex-col">
        <h1 className="text-2xl text-slate-100">
          Hello crafters, <span className="cursor-pointer blue_gradient font-bold">Tezada</span> here!
        </h1>
        <p className="mt-6 mx-6 xl:w-2/4 lg:w-3/4 font-light">
          The <span className="font-semibold">Artakecraft Note Project</span> was designed with novelists in mind. I aspire to produce simple writing
          notes for everyone who writes. I guarantee that you will adore this program, regardless of your skill level. level—professional or novice.
        </p>

        <p className="mt-6 mx-6 xl:w-2/4 lg:w-3/4 font-light">
          The application currently has three major functions: the writing system or <span className="font-semibold">writing sheet</span>,{' '}
          <span className="font-semibold">character profiling</span>, and <span className="font-semibold">scene note-taking.</span> In future updates,
          I foresee myself implementing an AI program to boost writers productivity.
        </p>

        <p className="mt-6 mx-6 xl:w-2/4 lg:w-3/4 font-light">
          I hope the Artakecraft Note will help you craft a nerve-wracking, tear-jerking, or out-of this world comedy story.{' '}
          <span className="font-semibold">Many thanks people!</span>
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
