import Link from "next/link";
import React from 'react'
import '../../styles/globals.css';


export default function Page() {
  return (
    <div className="p-6">
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white">Support page</h2>
      <p className="mb-6 text-lg font-normal text-white lg:text-xl xl:px-48 dark:text-white">We will be glad to answer any questions or suggestions about this project! </p>

      <ul className="space-y-6 flex flex-col items-center">
        <li className="bg-green-50 p-4 rounded-lg shadow-md w-1/2 text-center">
          <p className="text-xl font-semibold">Vincent BARE</p>
          <Link href="mailto:vincent.bare@edu.ece.fr" className="text-blue-900 hover:underline">
            Contact Vincent!
          </Link>
        </li>
        <li className="bg-green-50 p-4 rounded-lg shadow-md w-1/2 text-center">
          <p className="text-xl font-semibold">Jules FEDIT</p>
          <Link href="mailto:jules.fedit@edu.ece.fr" className="text-blue-900 hover:underline">
            Contact Jules!
          </Link>
        </li>
      </ul>

    </div>
  );
}
