"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';

const images = [
    '/assets/carousel_1.jpg', // Replace these paths with the actual image paths
    '/assets/carousel_2.jpg',
    '/assets/carousel_3.jpg',
    '/assets/carousel_4.jpg'
];

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto slide change every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 3000); // Change interval time as needed
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    // Function to navigate to a specific slide
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg">
            {/* Carousel Slides */}
            <div
                className="relative w-full h-full flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {images.map((src, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        <Image src={src} alt={`Slide ${index + 1}`} width={1280}
                            height={720} layout="responsive" objectFit="cover" />
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-300'}`}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );

    {/* <div id="default-carousel" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <Image
                        src="/assets/carousel_1.jpg"
                        width={1000}
                        height={700}
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..." />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <Image
                        src="/assets/carousel_2.jpg"
                        width={1000}
                        height={700}
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..." />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <Image
                        src="/assets/carousel_3.jpg"
                        width={1000}
                        height={700}
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..." />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <Image
                        src="/assets/carousel_4.jpg"
                        width={1000}
                        height={700}
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..." />
                </div>
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
            </div>
        </div> */}

}