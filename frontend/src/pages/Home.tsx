import Layout from "../components/Layout";
// import { useNavigate } from "react-router-dom";
export default function Home() {
  // const navigate = useNavigate();
  return (
    <Layout>
<section className="flex flex-col items-center justify-center text-center py-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text 
                       bg-linear-to-r from-green-200 via-green-400 to-green-800
                       bg-size-[200%_200%] animate-gradient-colors text-glow
                       leading-tight">
          Welcome to the Task Manager!
        </h2>
        <p className="text-green-400 max-w-xl mb-8">
          Manage your tasks efficiently and stay organized with our intuitive task management application.
        </p>
 
      </section>
    </Layout>
  );
}