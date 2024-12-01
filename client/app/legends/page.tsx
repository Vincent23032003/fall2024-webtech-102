"use client"

import React from 'react';
import "aos/dist/aos.css";
import AOS from "aos";

export default function LegendsPage() {
    return (
        <div>
            <h2 className="m-4 text-4xl font-extrabold leading-none tracking-tight text-white">Legends of the club</h2>
            <div className="sm:px-16">
                <p className="mb-6 text-lg font-normal text-white lg:text-xl xl:px-48 dark:text-white">Here's a quick presentation of the modern legends of ASM Clermont Auvergne. All these players have left their mark on the club's history and on the minds of its supporters through their sporting exploits. </p>
                <div className="grid grid-cols-3 gap-8 p-4">
                    <div className="relative h-full w-full rounded-xl overflow-hidden animate-fade-left bg-transparent group">
                        <img
                            src="/assets/rougerie.png" // Remplacez avec l'image réelle du joueur
                            alt="Joueur"
                            className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 w-52 object-cover z-10 rounded-xl"
                        />

                        {/* Badge du rôle */}
                        <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
                            Center
                        </div>

                        {/* Nom du joueur */}
                        <div className="absolute bottom-6 left-4 z-20 text-white">
                            <h3 className="text-2xl font-semibold">Aurélien ROUGERIE</h3>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                            <div>
                                <h3 className="text-xl font-semibold">Aurélien ROUGERIE</h3>
                                <p className="text-base mt-2">Age : 44 years old</p>
                                <p className="text-base mt-1">Nationality : French</p>
                                <p className="text-base mt-1">Size : 1,93m</p>
                                <p className="text-base mt-1">Weight : 103kg</p>
                                <p className="text-base mt-1">Period at ASM  : 1999 - 2018</p>
                                <p className="text-base mt-1">Status : Team Manager of ASM</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[400ms] bg-transparent group">

                        {/* Image du joueur */}
                        <img
                            src="/assets/parra.png" // Remplacez avec l'image réelle du joueur
                            alt="Joueur"
                            className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
                        />

                        {/* Badge du rôle */}
                        <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
                        Scrum-half
                        </div>

                        {/* Nom du joueur */}
                        <div className="absolute bottom-6 left-4 z-20 text-white">
                            <h3 className="text-2xl font-semibold">Morgan PARRA</h3>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                            <div>
                                <h3 className="text-xl font-semibold">Morgan PARRA</h3>
                                <p className="text-base mt-2">Age : 36 years old</p>
                                <p className="text-base mt-1">Nationality : French</p>
                                <p className="text-base mt-1">Size : 1,80m</p>
                                <p className="text-base mt-1">Weight : 82kg</p>
                                <p className="text-base mt-1">Period at ASM  : 2009 - 2022</p>
                                <p className="text-base mt-1">Status : Retired player</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[800ms] bg-transparent group">
                        <img
                            src="/assets/brock.png" // Remplacez avec l'image réelle du joueur
                            alt="Joueur"
                            className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
                        />

                        {/* Badge du rôle */}
                        <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
                        Opening half
                        </div>

                        {/* Nom du joueur */}
                        <div className="absolute bottom-6 left-4 z-20 text-white">
                            <h3 className="text-2xl font-semibold">James BROCK</h3>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                            <div>
                                <h3 className="text-xl font-semibold">James BROCK</h3>
                                <p className="text-base mt-2">Age : 43 years old</p>
                                <p className="text-base mt-1">Nationality : Australien</p>
                                <p className="text-base mt-1">Size : 1,79m</p>
                                <p className="text-base mt-1">Weight : 80kg</p>
                                <p className="text-base mt-1">Period at ASM  : 2006 - 2016</p>
                                <p className="text-base mt-1">Status : Hawkey's Bay coach</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[1200ms] bg-transparent group">
                        <img
                            src="/assets/cudmore.png" // Remplacez avec l'image réelle du joueur
                            alt="Joueur"
                            className="absolute top-10 h-3/4 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
                        />

                        {/* Badge du rôle */}
                        <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
                        2nd line
                        </div>

                        {/* Nom du joueur */}
                        <div className="absolute bottom-6 left-4 z-20 text-white">
                            <h3 className="text-2xl font-semibold">Jamie CUDMORE</h3>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                            <div>
                                <h3 className="text-xl font-semibold">Jamie CUDMORE</h3>
                                <p className="text-base mt-2">Age : 46 years old</p>
                                <p className="text-base mt-1">Nationality : Canadien</p>
                                <p className="text-base mt-1">Size : 1,96m</p>
                                <p className="text-base mt-1">Weight : 120kg</p>
                                <p className="text-base mt-1">Period at ASM  : 2005 - 2016</p>
                                <p className="text-base mt-1">Status : Coach of the Toronto Arrows</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[1600ms] bg-transparent group">
                        <img
                            src="/assets/domingo.png" // Remplacez avec l'image réelle du joueur
                            alt="Joueur"
                            className="absolute top-10 h-3/4 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
                        />

                        {/* Badge du rôle */}
                        <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
                        Pillar
                        </div>

                        {/* Nom du joueur */}
                        <div className="absolute bottom-6 left-4 z-20 text-white">
                            <h3 className="text-2xl font-semibold">Thomas DOMINGO</h3>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                            <div>
                                <h3 className="text-xl font-semibold">Thomas DOMINGO</h3>
                                <p className="text-base mt-2">Age : 39 years old</p>
                                <p className="text-base mt-1">Nationality : French</p>
                                <p className="text-base mt-1">Size : 1,73m</p>
                                <p className="text-base mt-1">Weight : 90kg</p>
                                <p className="text-base mt-1">Period at ASM  : 2006 - 2017</p>
                                <p className="text-base mt-1">Status : Coach of the Paloise section</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[2000ms] bg-transparent group">
                        <img
                            src="/assets/wesley.png" // Remplacez avec l'image réelle du joueur
                            alt="Joueur"
                            className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
                        />

                        {/* Badge du rôle */}
                        <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
                        Wingman
                        </div>

                        {/* Nom du joueur */}
                        <div className="absolute bottom-6 left-4 z-20 text-white">
                            <h3 className="text-2xl font-semibold">Wesley FOFANA</h3>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                            <div>
                                <h3 className="text-xl font-semibold">Wesley FOFANA</h3>
                                <p className="text-base mt-2">Age : 36 years old</p>
                                <p className="text-base mt-1">Nationality : French</p>
                                <p className="text-base mt-1">Size : 1,82m</p>
                                <p className="text-base mt-1">Weight : 80kg</p>
                                <p className="text-base mt-1">Period at ASM  : 2009 - 2022</p>
                                <p className="text-base mt-1">Status : Retired player</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}