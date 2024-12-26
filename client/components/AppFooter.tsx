import React from 'react'
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-blue-900 rounded-lg shadow">
      <div className="w-full max-w-screen-xl p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/assets/Logo_ASM.svg"
              width={70}
              height={70}
              alt="asm-logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              ASM Clermont Auvergne
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
            <li>
              <a href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fasm_rugby_officiel%2F%3Fhl%3Dfr&is_from_rle" className="px-4 me-4 md:me-6 hover:text-yellow-400">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  strokeWidth={1.5} stroke="currentColor" className="size-9" 
                >
                  <path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 00-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://x.com/ASMOfficiel?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="px-4 me-4 md:me-6 hover:text-yellow-400">
                <svg fill="none" viewBox="0 0 15 15" strokeWidth={0.4} stroke="currentColor" className="size-9">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M7.233 4.696c0-1.727 1.4-3.127 3.127-3.127 1.014 0 1.823.479 2.365 1.175a5.246 5.246 0 001.626-.629 2.634 2.634 0 01-1.148 1.45l.002.003a5.26 5.26 0 001.5-.413l-.001.002c-.337.505-.76.95-1.248 1.313.026.177.04.354.04.53 0 3.687-2.809 7.975-7.975 7.975a7.93 7.93 0 01-4.296-1.26.5.5 0 01-.108-.748.45.45 0 01.438-.215c.916.108 1.83-.004 2.637-.356a3.086 3.086 0 01-1.69-1.876.45.45 0 01.103-.448 3.07 3.07 0 01-1.045-2.31v-.034a.45.45 0 01.365-.442 3.068 3.068 0 01-.344-1.416c0-.468.003-1.058.332-1.59a.45.45 0 01.323-.208.5.5 0 01.538.161 6.964 6.964 0 004.46 2.507v-.044zm-1.712 7.279a6.936 6.936 0 01-2.249-.373 5.318 5.318 0 002.39-1.042.45.45 0 00-.27-.804 2.174 2.174 0 01-1.714-.888c.19-.015.376-.048.556-.096a.45.45 0 00-.028-.876 2.18 2.18 0 01-1.644-1.474c.2.048.409.077.623.084a.45.45 0 00.265-.824A2.177 2.177 0 012.48 3.87c0-.168.003-.317.013-.453a7.95 7.95 0 005.282 2.376.5.5 0 00.513-.61 2.127 2.127 0 012.071-2.614c1.234 0 2.136 1.143 2.136 2.432 0 3.256-2.476 6.974-6.975 6.974z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/@asm.clermont.auvergne/?locale=fr_FR" className="px-4 me-4 md:me-6 hover:text-yellow-400">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  strokeWidth={0.4} stroke="currentColor" className="size-9"
                >
                  <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-32 736H663.9V602.2h104l15.6-120.7H663.9v-77.1c0-35 9.7-58.8 59.8-58.8h63.9v-108c-11.1-1.5-49-4.8-93.2-4.8-92.2 0-155.3 56.3-155.3 159.6v89H434.9v120.7h104.3V848H176V176h672v672z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.asm-rugby.com/" className="px-4 me-4 md:me-6 hover:text-yellow-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  strokeWidth={0.1} stroke="currentColor" className="size-9"
                >
                  <path d="M16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2 0-.68.06-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.923 7.923 0 019.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8.008 8.008 0 015.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.65 15.65 0 00-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="/support" className="hover:text-yellow-400">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  strokeWidth={0.4} stroke="currentColor" className="size-9"
                >
                  <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z" />
                </svg>

              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-white sm:text-center">
          © 2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            ASM Clermont Auvergne
          </a>
          . All Rights Reserved. Web Technologies 2024 project.
        </span>
      </div>
    </footer>
  );
};