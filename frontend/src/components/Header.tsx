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
      try {
        /*const res = await fetch(`${API_URL}/api/auth/profile/me`, {
          headers: { Authorization: `Bearer` },
        });
        if (res.ok) {
          const data = await res.json();
          setUserName(data.name);
        }*/
      } catch (err) {
        console.error(err);
      }
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
    </nav>
  );
}