import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';

import 'bootstrap';

function Home() {
  const {data, revalidate} = useSWR('/api/me', async function(args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }


  return (
    <div>
    <Head>
      <title>Demetra Life</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <h1>Inizia ora la tua Diretta su Demetra Life</h1>

    <h2>Inserisci le credenziali per accedere.</h2>
    {loggedIn && (
      <>
        <p>Welcome {data.email}!</p>
        <button
          onClick={() => {
            cookie.remove('token');
            revalidate();
          }}>
          Logout
        </button>
      </>
    )}
    {!loggedIn && (
      <>
        <Link href="/login">Login</Link>
        <p>or</p>
        <Link href="/signup">Sign Up</Link>
      </>
    )}
  </div>
    
  );

    }

export default Home;