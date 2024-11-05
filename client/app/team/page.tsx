import '../../styles/globals.css';
import Link from "next/link";


export default function Page() {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="wt-title">Welcome to the Articles Page!</h1>
        <p className="text-lg text-gray-700 mb-4">Here's some articles:</p>
        <ol className="list-decimal list-inside space-y-6">
          <li className="bg-gray-100 p-4 rounded-lg shadow-md">
            <ul className="space-y-2">
              <li className="text-lg font-semibold">Content: Content of the comment.</li>
              <li>Date of creation: <span className="text-gray-500">14/10/2024</span></li>
              <li>Author: <span className="font-medium text-blue-600">Bob McLaren</span></li>
            </ul>
          </li>
          <li className="bg-gray-100 p-4 rounded-lg shadow-md">
            <ul className="space-y-2">
              <li className="text-lg font-semibold">Content: Lab 4</li>
              <li>Date of creation: <span className="text-gray-500">09/10/2024</span></li>
              <li>Author: <span className="font-medium text-blue-600">John Smith</span></li>
            </ul>
          </li>
        </ol>
      </div>
    );
}
