import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import AppStoreButton from './AppStoreButton';
import PlayStoreButton from './PlayStoreButton';

import { heroDetails } from '@/data/hero';

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-5"
        >
            <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
                {/*                 <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#93c94333_1px,transparent_1px),linear-gradient(to_bottom,#93c94333_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
                </div> */}
            </div>

            <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(147,201,67,0.3)] to-[rgba(147,201,67,0.5)]">
            </div>

            <div className="text-center">
                <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto">{heroDetails.heading}</h1>
                <p className="mt-4 text-xl text-foreground max-w-lg mx-auto">{heroDetails.subheading}</p>
                <div className="mt-6 flex flex-col sm:flex-row items-center sm:gap-4 w-fit mx-auto">
                    {/*                     <AppStoreButton dark />
                    <PlayStoreButton dark /> */}
                    <Link href="#cta" className="text-white text-xl bg-primary hover:bg-primary-accent px-8 py-3 rounded-full transition-colors">
                        Get Started
                    </Link>
                </div>
                <Image
                    src={heroDetails.centerImageSrc}
                    width={300}
                    height={340}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 384px"
                    priority={true}
                    unoptimized={true}
                    alt="avocado"
                    className='relative mt-12 md:mt-16 mx-auto z-10'
                />
            </div>
        </section>
    );
};

export default Hero;
