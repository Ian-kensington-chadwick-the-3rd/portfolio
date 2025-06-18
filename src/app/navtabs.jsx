'use client'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let scrollTween = null
const handleClick = (n) => {
    scrollTween = gsap.to(window, {
        scrollTo: { y: i * innerHeight, autoKill: false },
        onStart: () => {
            if (observer) {
                observer.disable();
                observer.enable();
            }
            console.log(scrollTween)
        },
        duration: 1,
        onComplete: () => (scrollTween = null),
        overwrite: true,
    });

}

const Nav = () => {
    return (
        <div >
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
    )
}

export default Nav;