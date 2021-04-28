import {React} from 'react';


export default function Footer() {

    return (
        <footer className="bg-white">
        <div className="container mx-auto px-8">
          <div className="w-full flex flex-col md:flex-row py-6">
            <div className="flex-1 mb-6 text-black">
              <a className="text-black-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="/">
                Your Spotify Stats
              </a>

              <p>
                We are not related to Spotify AB or any of it´s partners in any way
              </p>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Links</p>
              <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="/" className="no-underline hover:underline text-gray-800 hover:text-blue-500">Home</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="/privacy" className="no-underline hover:underline text-gray-800 hover:text-blue-500">Privacy</a>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </footer>
    )
}