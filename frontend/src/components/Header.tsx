import { useEffect } from "react";
//import { getToken } from "../services/authService"; //clearToken
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const holoLinkClass = `
    relative
    px-4 py-2
    text-green
    font-semibold
    rounded-lg
    transition-all
    duration-300
    hover:text-green-400
    hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.9)]
    before:absolute
    before:inset-0
    before:rounded
    before:bg-green-400
    before:opacity-20
    before:blur-xl
    before:scale-110
    before:transition-all
    before:duration-300
    hover:before:opacity-50
    hover:before:scale-125
    before:pointer-events-none
  `;

  useEffect(() => {

    const fetchUser = async () => {
    };
    fetchUser();
  }, []);

  return (
    <nav className="flex gap-6 justify-center mt-6">
      <a href="/" className={holoLinkClass}>
        Home
      </a>
      <button
        onClick={() => {
          navigate('/');
        
        }}
         className={holoLinkClass}
        >
        {}
        </button>
        <a href="/admin" className={holoLinkClass}>
          Admin
        </a>
        <button
        onClick={() => {
          navigate('/');
        
        }}
         className={holoLinkClass}
        >
        {}
        </button>

    </nav>
  );
}