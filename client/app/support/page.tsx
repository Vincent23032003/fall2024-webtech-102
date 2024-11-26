import Link from "next/link";
import React from 'react'
import '../../styles/globals.css';


export default function Page() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="wt-title">Welcome to the Contact Page!</h1>
      <p className="text-lg text-gray-700 mb-4">
        We will be glad to answer any questions or suggestions about this project!
      </p>
      <ul className="space-y-6">
        <li className="bg-green-50 p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold">Vincent BARE</p>
          <Link href="mailto:vincent.bare@edu.ece.fr" className="text-blue-500 hover:underline">
            Contact Vincent!
          </Link>
        </li>
        <li className="bg-green-50 p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold">Jules FEDIT</p>
          <Link href="mailto:jules.fedit@edu.ece.fr" className="text-blue-500 hover:underline">
            Contact Jules!
          </Link>
        </li>
      </ul>
    </div>
  );
}
