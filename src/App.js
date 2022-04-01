import React from "react";

import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main/Main";
export default function App() {
  return (
    <Layout>
      <Sidebar />
      <Main />
    </Layout>
  );
}
