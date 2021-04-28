import {React } from 'react';

export default function NavBar(props) {

    function renderLogin() {
        return (<ul className="list-reset lg:flex justify-end flex-1 items-center">
        <li>
            <button
              id="navAction"
              className="mx-auto lg:mx-0 hover:underline bg-black text-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 
                  focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out
                  "
                  
              onClick={props.onLogin}
            >
                Login to Spotify
            </button>
        </li>
        
      </ul>);
    }

    function renderLogout() {
        return (<ul className="list-reset lg:flex justify-end flex-1 items-center">
        <li>
          <button
              id="navAction"
              className="mx-auto w-64 lg:mx-0 hover:underline bg-black 
              text-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline
               transform transition hover:scale-105 duration-300 ease-in-out"
              onClick={props.onLogout}
            >
                Logout from Spotify
            </button>
        </li>
        
      </ul>);
    }

  return (
   <nav id="header" className="fixed w-full z-30 top-0 text-white">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <a className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="/">
          Your Spotify Stats
          </a>
        </div>

        <div className="lg:flex lg:w-auto w-64  lg:mt-0  lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
          {props.isLogged === true ? renderLogout() : renderLogin() }
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
}
