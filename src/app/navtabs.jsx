'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link'

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let scrollTween = null;
const handleClick = (n) => {
    scrollTween = gsap.to(window, {
        scrollTo: { y: n * innerHeight, autoKill: false },
        duration: 1,
        onComplete: () => (scrollTween = null),
        overwrite: true,
    });
}

const Nav = () => {
    const [projectPath, setProjectPath] = useState(false)
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.includes('/projects')) {
            setProjectPath(true);
        }

        return () => setProjectPath(false)
    }, [pathname])


    return (
        <div>
            <Link href='/'>
                <div className="backbutton" style={projectPath ? undefined : { display: 'none' }}
                >&#8619;
                </div>
            </Link>
            <div style={projectPath ? { display: 'none' } : undefined}>
                <span className="block" onClick={() => { handleClick(0) }}>
                    <img src='/face.png' />
                    <span className="navhover">
                        Bio
                    </span>
                </span>
                <span className="block" onClick={() => { handleClick(1) }}>
                    <img src="/work.png" />
                    <span className="navhover">
                        Portfolio
                    </span>
                </span>
                <span className="block" onClick={() => { handleClick(2) }}>
                    <img src="phone.png" />
                    <span className="navhover">
                        Contact Me
                    </span>
                </span>
            </div>
        </div>
    )
}

export default Nav;