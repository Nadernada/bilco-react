
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import React from "react";



gsap.registerPlugin(useGSAP, ScrollTrigger);

const ZoomIn = ({ font }) => {

  const brickRef = useRef(null);
  const brickSectionRef = useRef(null);
  const customRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Handle image load event to ensure the image is fully loaded before animating
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
 // Handle image load event to ensure the image is fully loaded before animating
// Call ScrollTrigger.refresh() when the layout changes (image load, window resize, etc.)
useEffect(() => {
  if (isImageLoaded) {
    ScrollTrigger.refresh(); // Force recalculation of ScrollTrigger positions
  }
}, [isImageLoaded]);

// Initialize GSAP animation using useLayoutEffect (ensures it runs after the layout is ready)
useLayoutEffect(() => {
  if (!isImageLoaded) return; // Ensure GSAP runs only after the image is loaded

  const animationContext = gsap.context(() => {
    if (brickRef.current && brickSectionRef.current) {
      // Set initial styles for the brick image
      gsap.set(brickRef.current, { scale: 2.5, willChange: "transform" });

      // Create the ScrollTrigger animation
      gsap.to(brickRef.current, {
        scale: 1,
        scrollTrigger: {
          trigger: brickSectionRef.current,
          start: "top center", // Adjust this dynamically if needed
          end: "bottom center", // Adjust this dynamically if needed
          scrub: true,
          pin: true,
          pinSpacing: true,
          // pinnedContainer: brickSectionRef.current,
          // pinSpacer: brickSectionRef.current,
          markers: true, // Enable markers for debugging
        },
      });

      // Refresh ScrollTrigger to ensure it's aware of the DOM after initial render
      ScrollTrigger.refresh();
    }
  }, brickSectionRef.current);

  return () => {
    animationContext.revert(); // Clean up the GSAP context and animations
  };
}, [isImageLoaded]); 
  

  return (
    <div className="mt-40 lg:pt-24 flex flex-col items-center this-section">
        <img src="/images/yellow-brick.png" alt="brick-img" width={1300} height={356} className="mt-12 mb-20 lg:hidden scale-[2.5] md:scale-150" />
        <img src="/images/yellow-brick.png" alt="brick-img" width={1300} height={356} className="my-16 lg:hidden" />

        <h2 className={`font-[Urdwin] antialiased text-[#F3F3F6] font-bold text-[3rem] lg:text-[5.25rem] leading-[3rem] lg:leading-[5.3rem] uppercase text-center`}>Weather Any Weather</h2>
        <p className="text-[#969696] text-base lg:text-[1.375rem] lg:leading-[1.75rem] text-center w-4/5 lg:w-full" >Endure the wear and tear of typical fading and sun damage. Build it brighter. Build it to last.</p>
        <div className="flex flex-col justify-center max-w-[1300px] mt-12 " ref={brickSectionRef} >

          <img src="/images/yellow-brick.png" alt="brick-img" width={1300} height={356} className="mt-0 pb-48 mx-auto hidden lg:block lg:w-4/5 xl:w-[90%] 2xl:w-[1300px] scale-[2.5] max-w-none" style={{ transformOrigin: 'top center'}} ref={brickRef}         onLoad={handleImageLoad} // Add an event listener for image load
  />
        </div>


        <div className="mt-28 py-28 lg:pt-0 flex flex-col lg:flex-row justify-between items-center lg:items-start w-full lg:w-[77%] bg-black lg:bg-transparent max-w-[1300px]">
          <h2 className={` font-[Urdwin] antialiased text-[#F3F3F6] text-center lg:text-left font-bold text-[3rem] lg:text-[5.25rem] leading-[3rem] lg:leading-[5.3rem] uppercase fade-up-zoom`}>Custom<br /> Created</h2>
          <p className="text-[#969696] text-base lg:text-[1.375rem] lg:leading-[1.75rem]  w-4/5 lg:w-1/2 text-center lg:text-left fade-up-zoom">Unlike mass produced clay bricks, every batch of the Bilco Professional Line is <span className="text-[#f3f3f6]">made to order.</span> <br/><br/>Through this personalized manufacturing process, the bricks are guaranteed to reflect your vision.</p>
          <img src="/images/brick-pattern-mobile.png" alt="brick-img" width={1302} height={463} className="mt-24 w-full max-w-none aspect-auto object-cover flex sm:hidden fade-up-zoom" />
        </div>

        <img src="/images/brick-pattern.png" alt="brick-img" width={1302} height={463} className="lg:mt-24 w-auto lg:w-full max-w-none lg:max-w-full h-svh lg:h-auto hidden sm:flex fade-up-zoom" />
      </div>
  );
};

export default ZoomIn;