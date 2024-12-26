import React from "react"
import Image from "next/image"
import "aos/dist/aos.css";
import AOS from "aos";

export default function awardsPage() {
    return (
        <div>
            <h2 className="m-4 text-4xl font-extrabold leading-none tracking-tight text-white">Results</h2>
            <p className="ml-16 text-lg font-normal text-white">All results of ASM this season are listed here, including French Championship and Champions Cup. </p>
            <div className="gap-4 p-4">
                <div className="h-44 m-4">
                    <div className="w-full h-full bg-white animate-fade-left rounded-lg shadow-md flex items-center mb-4">
                        {/* Left Section */}
                        <div className="flex flex-col justify-center items-center w-2/5 h-full bg-gray-200 p-4 text-center rounded-l-lg">
                            <p className="text-3xl font-bold text-blue-900">TOP 14</p>
                            <p className="text-lg font-bold mt-2">21 déc. 2024 à 14H30</p>
                            <p className="text-lg text-black mt-1">Stade Marcel-Deflandre</p>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center w-4/5 p-4 bg-white rounded-lg">
                            {/* Team 1 */}
                            <div className="flex-1 flex items-center justify-end pr-4">
                                <Image
                                    src="/assets/Stade_rochelais.png" // Replace with your actual image URL
                                    alt="Stade Rochelais Logo"
                                    width={75}
                                    height={75}
                                    className="object-contain mx-2"
                                />
                                <p className="ml-2 text-lg">Stade Rochelais</p>
                            </div>

                            {/* Score */}
                            <div className="flex items-center">
                                <p className="text-2xl font-bold">20</p>
                                <p className="mx-4 text-lg font-semibold text-gray-700">-</p>
                                <p className="text-2xl">15</p>
                            </div>

                            {/* Team 2 */}
                            <div className="flex-1 flex items-center justify-start pl-4">
                                <p className="ml-2 text-lg">ASM Clermont Auvergne</p>
                                <Image
                                    src="/assets/Logo_ASM.svg" // Replace with your actual image URL
                                    alt="ASM Clermont Auvergne Logo"
                                    width={75}
                                    height={75}
                                    className="object-contain mx-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-44 m-4">
                    <div className="w-full h-full bg-white animate-fade-left animate-delay-[400ms] rounded-lg shadow-md flex items-center mb-4">
                        {/* Left Section */}
                        <div className="flex flex-col justify-center items-center w-2/5 h-full bg-gray-200 p-4 text-center rounded-l-lg">
                            <p className="text-3xl font-bold text-blue-900">CHAMPION CUP</p>
                            <p className="text-lg font-bold mt-2">14 déc. 2024 à 18H30</p>
                            <p className="text-lg text-black mt-1">Aviva stadium</p>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center w-4/5 p-4 bg-white rounded-lg">
                            {/* Team 1 */}
                            <div className="flex-1 flex items-center justify-end pr-4">
                                <Image
                                    src="/assets/Leinster.svg" // Replace with your actual image URL
                                    alt="Leinster Logo"
                                    width={75}
                                    height={75}
                                    className="object-contain mx-2"
                                />
                                <p className="ml-2 text-lg">Leinster</p>
                            </div>

                            {/* Score */}
                            <div className="flex items-center">
                                <p className="text-2xl font-bold">15</p>
                                <p className="mx-4 text-lg font-semibold text-gray-700">-</p>
                                <p className="text-2xl">7</p>
                            </div>

                            {/* Team 2 */}
                            <div className="flex-1 flex items-center justify-start pl-4">
                                <p className="ml-2 text-lg">ASM Clermont Auvergne</p>
                                <Image
                                    src="/assets/Logo_ASM.svg" // Replace with your actual image URL
                                    alt="ASM Clermont Auvergne Logo"
                                    width={75}
                                    height={75}
                                    className="object-contain mx-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-44 m-4">
                    <div className="w-full h-full bg-white animate-fade-left animate-delay-[800ms] rounded-lg shadow-md flex items-center mb-4">
                        {/* Left Section */}
                        <div className="flex flex-col justify-center items-center w-2/5 h-full bg-gray-200 p-4 text-center rounded-l-lg">
                            <p className="text-3xl font-bold text-blue-900">CHAMPION CUP</p>
                            <p className="text-lg font-bold mt-2">7 déc. 2024 à 14H00</p>
                            <p className="text-lg text-black mt-1">Stade Marcel-Michelin</p>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center w-4/5 p-4 bg-white rounded-lg">
                            {/* Team 1 */}
                            <div className="flex-1 flex items-center justify-start pl-4">

                                <Image
                                    src="/assets/Logo_ASM.svg" // Replace with your actual image URL
                                    alt="ASM Clermont Auvergne Logo"
                                    width={75}
                                    height={75}
                                    className="object-contain mx-2"
                                />
                                <p className="ml-2 text-lg">ASM Clermont Auvergne</p>
                            </div>
                            {/* Score */}
                            <div className="flex items-center">
                                <p className="text-2xl font-bold">28</p>
                                <p className="mx-4 text-lg font-semibold text-gray-700">-</p>
                                <p className="text-2xl">0</p>
                            </div>

                            {/* Team 2 */}

                            <div className="flex-1 flex items-center  pr-4">
                                <p className="ml-2 text-lg">Benetton Rugby</p>
                                <Image
                                    src="/assets/Benetton.svg" // Replace with your actual image URL
                                    alt="Benetton Logo"
                                    width={75}
                                    height={75}
                                    className="object-contain mx-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-44 m-4">
                    <div className="w-full h-full bg-white animate-fade-left animate-delay-[1200ms] rounded-lg shadow-md flex items-center mb-4">
                        {/* Left Section */}
                        <div className="flex flex-col justify-center items-center w-2/5 h-full bg-gray-200 p-4 text-center rounded-l-lg">
                            <p className="text-3xl font-bold text-blue-900">TOP 14</p>
                            <p className="text-lg font-bold mt-2">30 nov. 2024 à 16H30</p>
                            <p className="text-lg text-black mt-1">Stade Marcel-Michelin</p>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center w-4/5 p-4 bg-white rounded-lg">
                            {/* Team 1 */}
                            <div className="flex-1 flex items-center justify-end pr-4">
                                <Image
                                    src="/assets/Logo_ASM.svg" // Replace with your actual image URL
                                    alt="ASM Clermont Auvergne Logo"
                                    width={75}
                                    height={75}
                                    className="object-contain mx-2"
                                />
                                <p className="ml-2 text-lg">ASM Clermont Auvergne</p>
                            </div>

                            { }
                            <div className="flex items-center">
                                <p className="text-2xl font-bold">47</p>
                                <p className="mx-4 text-lg font-semibold text-gray-700">-</p>
                                <p className="text-2xl">10</p>
                            </div>

                            {/* Team 2 */}
                            <div className="flex-1 flex items-center justify-start pl-4">

                                <Image
                                    src="/assets/Castres_Olympique.svg" // Replace with your actual image URL
                                    alt="Castres_Olympique Logo"
                                    width={75}
                                    height={75}
                                    className="object-contain mx-2"
                                />
                                <p className="ml-2 text-lg">Castres Olympique</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-44 m-4">
                    <div className="w-full h-full bg-white animate-fade-left animate-delay-[1600ms] rounded-lg shadow-md flex items-center mb-4">
                        {/* Left Section */}
                        <div className="flex flex-col justify-center items-center w-2/5 h-full bg-gray-200 p-4 text-center rounded-l-lg">
                            <p className="text-3xl font-bold text-blue-900">TOP 14</p>
                            <p className="text-lg font-bold mt-2">23 nov. 2024 à 16H30</p>
                            <p className="text-lg text-black mt-1">Matmut Stadium de Gerland</p>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center w-4/5 p-4 bg-white rounded-lg">
                            {/* Team 1 */}
                            <div className="flex-1 flex items-center justify-end pr-4">
                                <Image
                                    src="/assets/Lyon.png" // Replace with your actual image URL
                                    alt="Lyon Logo"
                                    width={75}
                                    height={75}
                                    className="object-contain mx-2"
                                />
                                <p className="ml-2 text-lg">Lyon</p>

                            </div>

                            { }
                            <div className="flex items-center">
                                <p className="text-2xl ">22</p>
                                <p className="mx-4 text-lg font-semibold text-gray-700">-</p>
                                <p className="text-2xl font-bold">30</p>
                            </div>

                            {/* Team 2 */}
                            <div className="flex-1 flex items-center justify-start pl-4">
                                <p className="ml-2 text-lg">ASM Clermont Auvergne</p>
                                <Image
                                    src="/assets/Logo_ASM.svg" // Replace with your actual image URL
                                    alt="ASM Clermont Auvergne Logo"
                                    width={75}
                                    height={75}
                                    className="object-contain mx-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}