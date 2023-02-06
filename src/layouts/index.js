import Head from "next/head";
import React from "react";

const Layout = ({children}) => {
  return (
    <>
    <Head>
      <title>ToDo App</title>
    </Head>
    <main>{children}</main>
    </>
  );
};

export default Layout;
