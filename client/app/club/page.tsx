"use client"

import React from 'react'
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";


export default function Page() {

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  return (
    <div className="p-6 animate-fade-up">
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white">The history of the club</h2>
      <div className="sm:px-16">
        <p className="mb-6 text-lg font-normal text-white lg:text-xl xl:px-48 dark:text-white">On 11 October 1911, a group of young sports enthusiasts led by Mr Marcel Michelin decided to set up a multi-sports facility for the people of Clermont-Ferrand. Registered with the Puy-de-Dôme Prefecture on 10 May 1912, the ASM was approved by the Ministry of War on 29 July 1912.</p>
        <ol className="relative border-s border-white dark:border-white">
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-white dark:border-white dark:bg-white"></div>
            <h3 className="mb-1 text-lg font-bold leading-none text-white dark:text-white"> 2023 - 2024</h3>
            <p className="mb-4 text-base font-normal text-white dark:text-white">In January 2023, Christophe URIOS replaces Jono GIBBES as head coach. In June 2023, Manufacture Michelin became the Club's sole shareholder and Jean-Claude PATS was appointed Chairman of ASM Clermont Auvergne.</p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-white dark:border-white dark:bg-white"></div>
            <h3 className="mb-1 text-lg font-bold leading-none text-white dark:text-white">2020 - 2023</h3>
            <p className="mb-4 text-base font-normal text-white dark:text-white">In 2020, following the death of Eric de Cromières, Jean-Michel Guillon took over as President of the Club. In 2021, Jono Gibbes was appointed coach of ASM CA.</p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-white dark:border-white dark:bg-white"></div>
            <h3 className="mb-1 text-lg font-bold leading-none text-white dark:text-white"> 2014 - 2019</h3>
            <p className="mb-4 text-base font-normal text-white dark:text-white">The start of the 2013-14 season was marked by a change of president: Eric de Cromières succeeded René Fontes. In July 2014, Franck Azéma took over the reins of the team, assisted by Jono Gibbes and Xavier Sadourny: the squad was overhauled (8 departures and 7 arrivals), and rejuvenated (average age -2)... On 2 May 2015, at the end of a fine European season, the ‘yellow and blues’ lost to RC Toulon in the European Cup final at Twickenham. In June 2017, after losing the Champions Cup Final to Saracens, Franck Azéma's men triumphed at the Stade de France and won the second Brennus in their history against RC Toulon. The 2017-18 season was a complicated one. The Auvergnats bounced back and used the European Challenge to get back on track. They achieved a perfect record in this competition by winning the third European Challenge in the club's history against La Rochelle. A few weeks later, they were again in the Top 14 Final, where they lost to Stade Toulousain.</p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-white dark:border-white dark:bg-white"></div>
            <h3 className="mb-1 text-lg font-bold leading-none text-white dark:text-white"> 2004 - 2013</h3>
            <p className="mb-4 text-base font-normal text-white dark:text-white">René Fontes took over as chairman in 2004. After a disastrous start to the season, the club made a spectacular recovery under Olivier Saisset to qualify for the European Cup. That same year, ASM became ASM Clermont Auvergne. The 2005-06 season was a gloomy one, during which the club lost its last ticket for the European Cup. The arrival of Vern Cotter in 2006-07 ushered in a new era for the club. His tenure was crowned by 4 consecutive French championship finals from 2007 onwards, including the club's first Brennus Shield in 2010, 1 European challenge and a European Cup final. The Yellow and Blue came close to their first major European title when they lost to RC Toulonnais in Dublin. His game became a benchmark...
              2011 will be marked by centenary celebrations, in particular the match against Aironi on 18 November 2011, which will bring together ex-Montferranders and players from the match. </p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-white dark:border-white dark:bg-white"></div>
            <h3 className="mb-1 text-lg font-bold leading-none text-white dark:text-white"> 1988 - 2003</h3>
            <p className="mb-4 text-base font-normal text-white dark:text-white">In 1986, ASM won another Challenge Yves Du Manoir trophy against Grenoble. In 1994, at the Parc des Princes against Stade Toulousain, ASM, led by its emblematic captain Jean-Marc Lhermet, lost once again in the championship final.On 27 August 1995, the IRB put an end to the amateur rule. This announcement made most clubs realise that nothing would ever be the same again... </p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-white dark:border-white dark:bg-white"></div>
            <h3 className="mb-1 text-lg font-bold leading-none text-white dark:text-white"> 1961 - 1971</h3>
            <p className="mb-4 text-base font-normal text-white dark:text-white">After some convincing victories in France's rugby strongholds, the team went from strength to strength, reaching the final of the French championship in 1970... only to be denied the long-awaited shield by La Voulte. </p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-white dark:border-white dark:bg-white"></div>
            <h3 className="mb-1 text-lg font-bold leading-none text-white dark:text-white"> 1940 - 1960</h3>
            <p className="mb-4 text-base font-normal text-white dark:text-white">In the aftermath of the Second World War, Montferrand rugby was still going strong, but it lost the French Cup final twice, to Agen in 1945 and Toulouse in 1947. </p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-white dark:border-white dark:bg-white"></div>
            <h3 className="mb-1 text-lg font-bold leading-none text-white dark:text-white"> 1925 - 1939</h3>
            <p className="mb-4 text-base font-normal text-white dark:text-white">In 1925, Montferrand beat Biarritz to win the French honours championship and move up to Excellence, the elite level of French rugby, where they have remained ever since. During the 1935-1936 season, the Yellow Jackets reached the final of the French championship for the first time in their history, losing to RC Narbonne. The following year, the club reached the final of the championship again, and were hot favourites to beat CS Vienne. Despite the dominance of their forwards, ASM failed to reach the championship final for the second time in succession. In 1938, the club claimed its first major title, winning the Challenge Yves du Manoir at the expense of USA Perpignan.</p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-white dark:border-white dark:bg-white"></div>
            <h3 className="mb-1 text-lg font-bold leading-none text-white dark:text-white"> 1922</h3>
            <p className="mb-4 text-base font-normal text-white dark:text-white">In 1922, following a new French law prohibiting associations from bearing the name of a company, AS Michelin became AS Montferrandaise. </p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-white dark:border-white dark:bg-white"></div>
            <h3 className="mb-1 text-lg font-bold leading-none text-white dark:text-white"> 1911</h3>
            <p className="mb-4 text-base font-normal text-white dark:text-white">Originally, the three letters ASM stood for Association Sportive Michelin. The initial aim of this Association, on the initiative of Marcel-Michelin, was to entertain and instil a taste for physical effort in the staff of the Michelin Manufacture. From the outset, the club opted for an all-sports formula. The first three sections were cross-country running, football and rugby, soon joined by fencing, cycling, tennis and boules. </p>
          </li>
        </ol>
      </div>
    </div>
  );
}
