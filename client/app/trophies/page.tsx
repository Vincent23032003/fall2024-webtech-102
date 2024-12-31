import React from "react"
import Image from "next/image"
import "aos/dist/aos.css";
import AOS from "aos";

export default function awardsPage() {
    return (
        <div>
            <h2 className="m-4 text-4xl font-extrabold leading-none tracking-tight text-white">Trophies won</h2>
            <p className="ml-16 text-lg font-normal text-white lg:text-xl xl:px-48 dark:text-white">All the trophies won by ASM are listed on this page. ASM has won numerous trophies, making it a world-renowned team. Unfortunately, ASM has not been able to win many finals, particularly in the French championship. </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

                <div className="w-full h-full bg-white animate-fade-left rounded-lg shadow-md flex flex-col justify-center items-center relative p-6">

                    <div className="flex justify-between items-center mb-4">
                        <div className="absolute top-6 left-6">
                            <Image
                                src="/assets/shield-trophy.png"
                                alt=""
                                width={150}
                                height={150}
                            >

                            </Image>
                        </div>

                        <div className="absolute top-4 right-6 text-9xl font-light text-gray-200">
                            2x
                        </div>
                    </div>


                    <div className="flex flex-col flex-wrap items-center text-center">
                        <h3 className="text-2xl font-bold text-center text-blue-900 mt-24">
                            FRENCH CHAMPION
                        </h3>


                        <div className="flex gap-4 flex-col text-xl text-center text-gray-500 mt-4">
                            <p>2010</p>
                            <p>2017</p>
                        </div>
                    </div>
                </div>



                <div className="w-full h-full bg-white animate-fade-left animate-delay-[400ms] rounded-lg shadow-md flex flex-col justify-center items-center relative p-6">

                    <div className="grid grid-cols-2 flex items-center justify-center mb-16">
                        <div className="absolute top-6 left-6">
                            <Image
                                src="/assets/trophy.png"
                                alt=""
                                width={150}
                                height={150}
                            >

                            </Image>
                        </div>

                        <div className="absolute top-4 right-6 text-9xl font-light text-gray-200">
                            3x
                        </div>
                    </div>


                    <div className="flex flex-col flex-wrap items-center text-center">
                        <h3 className="text-2xl font-bold text-center text-blue-900 mt-24">
                            EUROPEAN CHALLENGE CHAMPION
                        </h3>


                        <div className="flex gap-4 flex-col text-xl text-center text-gray-500 mt-4">
                            <p>1999</p>
                            <p>2007</p>
                            <p>2019</p>
                        </div>
                    </div>
                </div>


                <div className="w-full h-full bg-white animate-fade-left animate-delay-[800ms] rounded-lg shadow-md flex flex-col justify-center items-center relative p-6">

                    <div className="grid grid-cols-2 flex items-center justify-center mb-16">
                        <div className="absolute top-6 left-6">
                            <Image
                                src="/assets/glass-award.png"
                                alt=""
                                width={150}
                                height={150}
                            >

                            </Image>
                        </div>

                        <div className="absolute top-4 right-6 text-9xl font-light text-gray-200">
                            3x
                        </div>
                    </div>


                    <div className="flex flex-col flex-wrap items-center text-center">
                        <h3 className="text-2xl font-bold text-center text-blue-900 mt-24">
                            YVES DU MANOIR CHALLENGE
                        </h3>


                        <div className="flex gap-4 flex-col text-xl text-center text-gray-500 mt-4">
                            <p>1936</p>
                            <p>1976</p>
                            <p>1986</p>
                        </div>
                    </div>
                </div>


                <div className="w-full h-full bg-white animate-fade-left animate-delay-[1200ms] rounded-lg shadow-md flex flex-col justify-center items-center relative p-6">

                    <div className="grid grid-cols-2 flex items-center justify-center mb-16">
                        <div className="absolute top-6 left-6">
                            <Image
                                src="/assets/glass-award.png"
                                alt=""
                                width={150}
                                height={150}
                            >

                            </Image>
                        </div>

                        <div className="absolute top-4 right-6 text-9xl font-light text-gray-200">
                            1x
                        </div>
                    </div>


                    <div className="flex flex-col flex-wrap items-center text-center">
                        <h3 className="text-2xl font-bold text-center text-blue-900 mt-4">
                            LEAGUE CUP
                        </h3>


                        <div className="flex gap-4 flex-col text-xl text-center text-gray-500 mt-4">
                            <p>2001</p>
                        </div>
                    </div>
                </div>


                <div className="w-full h-full bg-white animate-fade-left animate-delay-[1600ms] rounded-lg shadow-md flex flex-col justify-center items-center relative p-6">

                    <div className="grid grid-cols-2 flex items-center justify-center mb-16">
                        <div className="absolute top-6 left-6">
                            <Image
                                src="/assets/2nd-place.png"
                                alt=""
                                width={150}
                                height={150}
                            >

                            </Image>
                        </div>
                        <div className="absolute top-4 right-6 text-9xl font-light text-gray-200">
                            12x
                        </div>
                    </div>


                    <div className="flex flex-col flex-wrap items-center text-center">
                        <h3 className="text-2xl font-bold text-center text-blue-900 mt-24">
                            RUNNER-UP IN FRANCE
                        </h3>


                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex gap-4 flex-col text-xl text-center text-gray-500 mt-4">
                                <p>1936</p>
                                <p>1937</p>
                                <p>1970</p>
                                <p>1978</p>
                            </div>
                            <div className="flex gap-4 flex-col text-xl text-center text-gray-500 mt-4">
                                <p>1994</p>
                                <p>1999</p>
                                <p>2001</p>
                                <p>2007</p>
                            </div>
                            <div className="flex gap-4 flex-col text-xl text-center text-gray-500 mt-4">
                                <p>2008</p>
                                <p>2009</p>
                                <p>2015</p>
                                <p>2019</p>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="w-full h-full bg-white animate-fade-left animate-delay-[2000ms] rounded-lg shadow-md flex flex-col justify-center items-center relative p-6">

                    <div className="grid grid-cols-2 flex items-center justify-center mb-16">
                        <div className="absolute top-6 left-6">
                            <Image
                                src="/assets/2nd-place.png"
                                alt=""
                                width={150}
                                height={150}
                            >

                            </Image>
                        </div>

                        <div className="absolute top-4 right-6 text-9xl font-light text-gray-200">
                            3x
                        </div>
                    </div>


                    <div className="flex flex-col flex-wrap items-center text-center">
                        <h3 className="text-2xl font-bold text-center text-blue-900 mt-16">
                            EUROPEAN CUP FINALIST
                        </h3>


                        <div className="flex gap-4 flex-col text-xl text-center text-gray-500 mt-4">
                            <p>2013</p>
                            <p>2015</p>
                            <p>2017</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}