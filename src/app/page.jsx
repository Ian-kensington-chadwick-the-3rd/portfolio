'use client'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);



export default function Home() {

  const [active, setActive] = useState({
    firstName: false,
    email: false,
    message: false,
  })

  const [form, setForm] = useState({
    firstName: '',
    phoneNumber: '',
    message: ''
  })


  useEffect(() => {
    let panels = gsap.utils.toArray(".panel");
    let observer = null;
    let scrollTween = null;
    console.log(panels)

    if (ScrollTrigger.isTouch === 1) {
      observer = ScrollTrigger.normalizeScroll(true);
    }

    const touchHandler = (e) => {
      if (scrollTween) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    document.addEventListener("touchstart", touchHandler, {
      capture: true,
      passive: false,
    });

    function goToSection(i) {

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

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        markers: true, // Remove this in production
        onToggle: (self) => {
          console.log(`onToggle for section ${i}, isActive: ${self.isActive} `)
          if (self.isActive) {
            if (scrollTween) {
              return
            } else {
              goToSection(i)
            }
          }
        },
      });
    });

    ScrollTrigger.create({
      start: 0,
      end: "max",
      snap: 1 / (panels.length - 1),
      onSnapComplete: () => {
        console.log('snap complete')
      }
    });

    return () => {
      document.removeEventListener("touchstart", touchHandler);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="container">
      <div>
        <section className="panel" >
          <div className="card">
            <img className="pfp" src="/ianpfp.jpg" />
            <div>
              <span style={{zIndex:'2', color:'white'}}>
                Ian Sills
              </span>
            </div>
            <p className="p">I am a develeper with experience in building mern stack applications. My main set of skills revolve around Javascript, Html, and css. My most worked with framework is react as well as nextJS . Server side I am most comfortable with mongodb but I have also worked with My SQL. When it comes to querying http endpoints I know how to use fetch and query languages like graqhql. I am very team-oriented but i also know how work in isolated environments. </p>
          </div> 
          {/* first group */}
          <div className="marquee" >
            <div className="marquee__group" style={{animationDuration:'55s'}}>
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item"
              />
              <img src="/nodejs.png"
                className="marquu__item"
              />
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item"
              />
              <img src="/nodejs.png"
                className="marquu__item"
              />
            </div>
          </div>
          {/* second group */}
          <div className="marquee" >
            <div className="marquee__group"  >
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
            </div>
            <div className="marquee__group" >
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
            </div>
          </div>
          {/* third group */}
          <div className="marquee">
            <div className="marquee__group" style={{animationDuration:'55s'}}>
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
            </div>
            <div className="marquee__group">
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />

              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
            </div>
          </div>
          {/* fourth group */}
          <div className="marquee">
            <div className="marquee__group" style={{animationDuration:'58s'}}>
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
            </div>
            <div className="marquee__group">
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />

              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
            </div>
          </div>
          {/* fifth group */}
          <div className="marquee">
            <div className="marquee__group" >
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
            </div>
            <div className="marquee__group" >
              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />

              <img src='/htmllogo.png'
                className="marquu__item"
              />
              <img src="/cslogo.png"
                className="marquu__item"
              />
              <img src="javascriptlogo.png"
                className="marquu__item"
              />
              <img src="reactlogo.png"
                className="marquu__item"
              />
              <img src="/next.svg"
                className="marquu__item" />

              <img src="/nodejs.png"
                className="marquu__item"
              />
            </div>
          </div>
        </section>


      </div>
      <section className="panel" >
        portfolio & mvps
      </section>
      <section className="panel" >
        <div className="flex-center full-height">
          <section className="flex">
            <section className="group-info__container">
              Contact
              <hr />
              <a><span>iansills04@gmail.com</span></a>
              <a><span>linkedin.com/in/ian-sills-668497291/</span></a>
              <a><span>github.com/Ian-kensington-chadwick-the-3rd</span></a>
            </section>

            <form className="flex-center">
              <label>
                <input type="text" name="firstName" className="fields"
                  onFocus={() => setActive((prev) => ({ ...prev, firstName: true }))}
                  onBlur={() => setActive((prev) => ({ ...prev, firstName: false }))}
                  onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))} />
                <span className={active.firstName || form.firstName ? "floating-labels hover" : 'floating-labels'}>
                  First Name
                </span>
              </label>

              <label>
                <input type="text" name="email" className="fields"
                  onFocus={() => setActive((prev) => ({ ...prev, email: true }))}
                  onBlur={() => setActive((prev) => ({ ...prev, email: false }))}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
                <span className={active.email || form.email ? "floating-labels hover" : 'floating-labels'}>
                  Phone Number
                </span>
              </label>

              <label>
                <textarea name="message " className="fields textarea"
                  onFocus={() => setActive((prev) => ({ ...prev, message: true }))}
                  onBlur={() => setActive((prev) => ({ ...prev, message: false }))}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))} />
                <span className={active.message || form.message ? "floating-labels hover" : 'floating-labels'}>
                  Message
                </span>
              </label>


              <button type="submit">
                <span className="placeholder-text" style={{ color: 'green' }}>Submit</span>
                <span className="placeholder-text" style={{ color: 'red' }}>Submit</span>
              </button>
            </form>
          </section>
        </div>
      </section>
    </section>
  );
}
