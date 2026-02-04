import React from "react";
import { Layout } from "../components/Layout";

export default function Home() {
  return (
    <Layout>
    <section className="flex flex-col items-center justify-center text-center py-20">
      <h2 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text 
                       bg-linear-to-r from-green-200 via-green-400 to-green-800
                       bg-size-[200%_200%] animate-gradient-colors text-glow
                       leading-tight">
        Welcome to the Task Manager
        </h2>
      <p className="text-lg">Manage your tasks efficiently and effectively.</p>
    </section>
    </Layout>
  );
}