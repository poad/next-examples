import Image from 'next/image';
import * as css from './page.css';

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.description}>
        <p className={css.paragraphInDescription}>
          Get started by editing&nbsp;
          <code className={css.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={css.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={css.center}>
        <Image
          className={css.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={css.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={css.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={css.cardH2}>
            Docs <span className={css.cardSpan}>-&gt;</span>
          </h2>
          <p className={css.cardP}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={css.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={css.cardH2}>
            Learn <span className={css.cardSpan}>-&gt;</span>
          </h2>
          <p className={css.cardP}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={css.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={css.cardH2}>
            Templates <span className={css.cardSpan}>-&gt;</span>
          </h2>
          <p className={css.cardP}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={css.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={css.cardH2}>
            Deploy <span className={css.cardSpan}>-&gt;</span>
          </h2>
          <p className={css.cardP}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
