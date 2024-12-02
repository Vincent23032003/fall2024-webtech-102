"use client"

import React from 'react';
import "aos/dist/aos.css";
import AOS from "aos";

export default function LegendsPage() {
  return (
    <div>
      <h2 className="m-4 text-4xl font-extrabold leading-none tracking-tight text-white">Team Roster</h2>
      <div className="sm:px-16">
        <p className="mb-6 text-lg font-normal text-white lg:text-xl xl:px-48 dark:text-white">Here's the most likely starting line-up for matches in the 2024-2025 season, with a short presentation for each player. These players proudly wear the ASM colours and will take us as far as possible in competitions. Let's support them, they're going to need our help all season long!</p>
        <div className="grid grid-cols-3 gap-8 p-4">
          <div className="relative h-full w-full rounded-xl overflow-hidden animate-fade-left bg-transparent group">
            <img
              src="/assets/falgoux.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 w-52 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              Pillar
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Etienne FALGOUX</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Etienne FALGOUX</h3>
                <p className="text-base mt-2">Age : 31 years old</p>
                <p className="text-base mt-1">Nationality : French</p>
                <p className="text-base mt-1">Size : 1,83m</p>
                <p className="text-base mt-1">Weight : 105kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2008</p>
              </div>
            </div>
          </div>
          <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[400ms] bg-transparent group">

            {/* Image du joueur */}
            <img
              src="/assets/faingaa.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              Pillar
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Folau FAINGA'A</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Folau FAINGA'A</h3>
                <p className="text-base mt-2">Age : 29 years old</p>
                <p className="text-base mt-1">Nationality : Samoan</p>
                <p className="text-base mt-1">Size : 1,78m</p>
                <p className="text-base mt-1">Weight : 106kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2023</p>
              </div>
            </div>
          </div>
          <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[800ms] bg-transparent group">
            <img
              src="/assets/montagne.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              Pillar
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Régis MONTAGNE</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Régis MONTAGNE</h3>
                <p className="text-base mt-2">Age : 24 years old</p>
                <p className="text-base mt-1">Nationality : French</p>
                <p className="text-base mt-1">Size : 1,86m</p>
                <p className="text-base mt-1">Weight : 132kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2024</p>
              </div>
            </div>
          </div>
          <div
            className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[1200ms] bg-transparent group">
            <img
              src="/assets/yato.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute top-10 h-3/4 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              3rd line
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Peceli YATO</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Peceli YATO</h3>
                <p className="text-base mt-2">Age : 31 years old</p>
                <p className="text-base mt-1">Nationality : Fijian</p>
                <p className="text-base mt-1">Size : 1,96m</p>
                <p className="text-base mt-1">Weight : 120kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2013</p>
              </div>
            </div>
          </div>
          <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[1600ms] bg-transparent group">
            <img
              src="/assets/ceyte.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute top-10 h-3/4 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              2nd line
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Thomas CEYTE</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Thomas CEYTE</h3>
                <p className="text-base mt-2">Age : 33 years old</p>
                <p className="text-base mt-1">Nationality : French</p>
                <p className="text-base mt-1">Size : 1,96m</p>
                <p className="text-base mt-1">Weight : 117kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2024</p>
              </div>
            </div>
          </div>
          <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[2000ms] bg-transparent group">
            <img
              src="/assets/fischer.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              3rd line
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Alexandre FISCHER</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Alexandre FISCHER</h3>
                <p className="text-base mt-2">Age : 26 years old</p>
                <p className="text-base mt-1">Nationality : French</p>
                <p className="text-base mt-1">Size : 1,88m</p>
                <p className="text-base mt-1">Weight : 107kg</p>
                <p className="text-base mt-1">Arrival at ASM  : Training club</p>
              </div>
            </div>
          </div>
          <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[1600ms] bg-transparent group">
            <img
              src="/assets/lee.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute top-10 h-3/4 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              3rd line
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Fritz LEE</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Fritz LEE</h3>
                <p className="text-base mt-2">Age : 36 years old</p>
                <p className="text-base mt-1">Nationality : Samoan</p>
                <p className="text-base mt-1">Size : 1,88m</p>
                <p className="text-base mt-1">Weight : 108kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2013</p>
              </div>
            </div>
          </div>

          <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[2000ms] bg-transparent group">
            <img
              src="/assets/kremer.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              3rd line
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Marcos KREMER</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Marcos KREMER</h3>
                <p className="text-base mt-2">Age : 27 years old</p>
                <p className="text-base mt-1">Nationality : Argentinian</p>
                <p className="text-base mt-1">Size : 1,95m</p>
                <p className="text-base mt-1">Weight : 110kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2023</p>
              </div>
            </div>
          </div>
          <div className="relative h-full w-full rounded-xl overflow-hidden animate-fade-left bg-transparent group">
            <img
              src="/assets/bezy.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 w-52 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              Scrum-half
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Sébastien BEZY</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Sébastien BEZY</h3>
                <p className="text-base mt-2">Age : 33 years old</p>
                <p className="text-base mt-1">Nationality : French</p>
                <p className="text-base mt-1">Size : 1,74m</p>
                <p className="text-base mt-1">Weight : 76kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2020</p>
              </div>
            </div>
          </div>
          <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[400ms] bg-transparent group">

            {/* Image du joueur */}
            <img
              src="/assets/urdapilleta.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              Opening-half
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Benjamin URDAPILLETA</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Benjamin URDAPILLETA</h3>
                <p className="text-base mt-2">Age : 38 years old</p>
                <p className="text-base mt-1">Nationality : Argentinian</p>
                <p className="text-base mt-1">Size : 1,78m</p>
                <p className="text-base mt-1">Weight : 86kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2023</p>
              </div>
            </div>
          </div>
          <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[800ms] bg-transparent group">
            <img
              src="/assets/jurand.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              Rear
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Joris JURAND</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Joris JURAND</h3>
                <p className="text-base mt-2">Age : 29 years old</p>
                <p className="text-base mt-1">Nationality : French</p>
                <p className="text-base mt-1">Size : 1,88m</p>
                <p className="text-base mt-1">Weight : 106kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2023</p>
              </div>
            </div>
          </div>
          <div
            className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[1200ms] bg-transparent group">
            <img
              src="/assets/moala.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute top-10 h-3/4 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              Center
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">George MOALA</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">George MOALA</h3>
                <p className="text-base mt-2">Age : 34 years old</p>
                <p className="text-base mt-1">Nationality : Neo-zeland</p>
                <p className="text-base mt-1">Size : 1,88m</p>
                <p className="text-base mt-1">Weight : 99kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2018</p>
              </div>
            </div>
          </div>
          <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[1600ms] bg-transparent group">
            <img
              src="/assets/darricarrere.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute top-10 h-3/4 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              Center
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Léon DARRICARRERE</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Léon DARRICARRERE</h3>
                <p className="text-base mt-2">Age : 20 years old</p>
                <p className="text-base mt-1">Nationality : French</p>
                <p className="text-base mt-1">Size : 1,87m</p>
                <p className="text-base mt-1">Weight : 98kg</p>
                <p className="text-base mt-1">Arrival at ASM  : Training Club</p>
              </div>
            </div>
          </div>

          <div className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[2000ms] bg-transparent group">
            <img
              src="/assets/tauzin.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute h-3/4 top-10 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              Wingman
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Lucas TAUZIN</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Lucas TAUZIN</h3>
                <p className="text-base mt-2">Age : 26 years old</p>
                <p className="text-base mt-1">Nationality : French</p>
                <p className="text-base mt-1">Size : 1,87m</p>
                <p className="text-base mt-1">Weight : 94kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2024</p>
              </div>
            </div>
          </div>
          <div
            className="relative w-full h-96 rounded-xl overflow-hidden animate-fade-left animate-delay-[1200ms] bg-transparent group">
            <img
              src="/assets/newsome.png" // Remplacez avec l'image réelle du joueur
              alt="Joueur"
              className="absolute top-10 h-3/4 left-1/2 -translate-x-1/2 object-cover z-10 rounded-xl"
            />

            {/* Badge du rôle */}
            <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-sm z-20 font-medium shadow-md backdrop-blur-sm">
              Rear
            </div>

            {/* Nom du joueur */}
            <div className="absolute bottom-6 left-4 z-20 text-white">
              <h3 className="text-2xl font-semibold">Alex NEWSOME</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div>
                <h3 className="text-xl font-semibold">Alex NEWSOME</h3>
                <p className="text-base mt-2">Age : 29 years old</p>
                <p className="text-base mt-1">Nationality : Australian</p>
                <p className="text-base mt-1">Size : 1,89m</p>
                <p className="text-base mt-1">Weight : 93kg</p>
                <p className="text-base mt-1">Arrival at ASM  : 2022</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}