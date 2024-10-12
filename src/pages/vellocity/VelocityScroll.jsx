// src/components/ScrollVel.js
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VelocityScroll.module.css'; // Import CSS module

gsap.registerPlugin(ScrollTrigger);

const VelocityScroll = () => {



    useEffect(() => {
        let proxy = { skew: 0 };
        const skewSetter = gsap.quickSetter('.skewElem', 'skewY', 'deg');
        const clamp = gsap.utils.clamp(-20, 20);

        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -300);
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, {
                        skew: 0,
                        duration: 0.8,
                        ease: 'power3',
                        overwrite: true,
                        onUpdate: () => skewSetter(proxy.skew),
                    });
                }
            },
        });

        gsap.set('.skewElem', { transformOrigin: 'right center', force3D: true });

        return () => {
            ScrollTrigger.kill();
        };
    }, []);

    return (

        <div className="gallery flex flex-wrap" style={{ height: '200vh' }} >
            {/* Generate 10 images for better demonstration */}
            {[...Array(10)].map((_, index) => (
                <img
                    key={index}
                    className="skewElem"
                    src={`https://picsum.photos/600/600?random=${index + 1}`}
                    alt={`Random Image ${index + 1}`}
                    style={{ width: '600px', height: '400px', margin: '2px', objectFit: 'cover' }} // Adjust size for two columns
                />
            ))}
        
        </div>
    );
};

export default VelocityScroll;
