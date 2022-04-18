import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { data: session, status } = useSession();

  // If the client session is loading, do this.
  if (status === "loading") {
    return <p>Loading Session</p>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Google Student Developer Club - KSU</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* If Session does not exist, invalid or client has not logged in, do this. */}
      {!session && (
        <>
          <button onClick={() => signIn()}>Login</button>
        </>
      )}

      {/* If Session does exist and the client has logged in, do this. */}
      {session && (
        <>
          <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to <a href="https://nextjs.org">Next.js!</a> with{" "}
              <a href="https://mui.com/">Material-UI!</a>
            </h1>
            <p className={styles.description}>
              Get started by editing{' '}
              <code className={styles.code}>pages/index.js</code>
            </p>
            <p className={styles.description}>
              Email:{' '}
              <code className={styles.code}>{session.user.email}</code>
            </p>
            <br />
            <button onClick={() => signOut()}>Logout</button>
          </main>
        </>
      )}
    </div>
  )
}
