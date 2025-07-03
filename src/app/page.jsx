'use client'
import { useEffect, useState } from "react";
import Link from 'next/link'
import Image from 'next/image';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
import Nav from './navtabs'


export default function Home() {

  const [active, setActive] = useState({
    firstName: false,
    email: false,
    message: false,
  });

  const [form, setForm] = useState({
    firstName: '',
    email: '',
    message: ''
  });

  const [errorForm, setErrorForm] = useState({
    firstName: '',
    email: '',
    message: ''
  });

  const [touch, setTouch] = useState(false);
  const [flip, setFlip] = useState(false);
  const [section, setSection] = useState(0)
  const [jumpTo, setJumpTo] = useState(null)



  useEffect(() => {
    let panels = gsap.utils.toArray(".panel");
    let observer = null;
    let scrollTween = null;
    const triggerTracker = [];


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
      setSection(i)
      scrollTween = gsap.to(window, {
        scrollTo: { y: i * innerHeight, autoKill: false },
        onStart: () => {
          if (observer) {
            observer.disable();
            observer.enable();
          }
        },
        duration: 1,
        onComplete: () => (scrollTween = null),
        overwrite: true,
      });
    }



    panels.forEach((panel, i) => {
      const trigger = ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        // Remove this in production
        onToggle: (self) => {
          if (self.isActive) {
            if (!scrollTween) {
              goToSection(i);
            }
          }
        },
      });
      triggerTracker.push(trigger);
    });
    // removed global snap trigger
    // const snapTrigger = ScrollTrigger.create({
    //   start: 0,
    //   end: "max",
    //   snap: 1 / (panels.length - 1),
    //   onSnapComplete: () => {
    //     console.log('snap complete')
    //   }
    // });
    // triggerTracker.push(snapTrigger);

    return () => {
      triggerTracker.forEach(trigger => trigger.kill());

      document.removeEventListener("touchstart", touchHandler, {
        capture: true,
        passive: false,
      });
      
      // Clean up observer if it exists
      if (observer) {
        observer.kill();
      }
    };
  }, []);


  useEffect(() => {

    if (jumpTo !== null) {
      setSection(jumpTo)
      ScrollTrigger.getAll().forEach(trigger => trigger.disable());
      gsap.to(window, {
        scrollTo: { y: jumpTo * innerHeight, autoKill: false },
        duration: 1,
        onComplete: () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.enable());
        },
        overwrite: true,
      });

      setJumpTo(null);
    }


  }, [jumpTo]);


  useEffect(() => {
    let hover = gsap.utils.toArray('.hover')
    const hoverTriggers = [];

    hover.forEach((hover) => {
      const trigger = ScrollTrigger.create({
        trigger: hover,
        start: 'top center',
        toggleClass: 'active-view'
      })
      hoverTriggers.push(trigger)
    })

    return () => {
      hoverTriggers.forEach(trigger => trigger.kill());
    };
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setTouch(false)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  },)


  const cardFlip = () => {
    setFlip(true)
    const timer = setTimeout(() => {
      setFlip(false)
    }, 3000)
    return () => clearTimeout(timer)
  }



  const formHandler = async (e) => {
    const error = {};
    e.preventDefault();
    if (!form.firstName) {
      error.firstName = 'please fill out Name 📛'
    }

    if (!form.email) {
      error.email = 'please fill out Email 📧'
    }

    if (!form.message) {
      error.message = 'please fill out Message 📬'
    }

    if (Object.keys(error).length > 0) {
      setErrorForm({
        firstName: error.firstName,
        email: error.email,
        message: error.message
      });
      return;
    }

    await fetch('/api/messages', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    }).then(response => {
      if (!response.ok) {
        throw new Error('network response 404' + response.statusText)
      }
      return response.json();
    }).then(data => {
      if (data) {
        setForm({
          firstName: '',
          email: '',
          message: ''
        })
        cardFlip()
      }
    }).catch(error => {
      console.error(error)
    })
  }

  const handleDataFromChild = (data) => {
    setJumpTo(data)
  }



  return (
    <>
      <Nav sectionNumber={section} onDataChange={handleDataFromChild} />
      <section className="container">
        <div>
          <section className="panel" >
            <div className="card-container" onTouchStart={() => { setTouch((prev) => (!prev)); }}>
              <div className={touch ? "rotate card " : 'card'}>
                <div className="front">
                  <img className="pfp" src="/ianpfp.jpg" />
                  <div>
                    <span className="name">
                      Ian Sills
                    </span>
                  </div>
                  <p className="p">I am a develeper with experience in building mern stack applications. My main set of skills revolve around Javascript, Html, and css. My most worked with framework is react as well as nextJS . Server side I am most comfortable with mongodb but I have also worked with My SQL. When it comes to querying http endpoints I know how to use fetch and query languages like graqhql. I am very team-oriented but i also know how work in isolated environments. </p>
                </div>
                <div className="back">
                  <div className="back-group-one">
                    <a href="https://docs.google.com/document/d/1H4jagAcfe2T5PUUoDcmpWmhe5fByI5ZrsD7JqVcz_m8/edit?usp=sharing">
                      <button className="button-style">
                        <span className="placeholder-text" >Resume🎉</span>
                        <span className="placeholder-text" >Resume👋</span>
                      </button>
                    </a>
                    <a href="https://github.com/Ian-kensington-chadwick-the-3rd">
                      <button className="button-style">
                        <span className="placeholder-text" >GitHub🎉</span>
                        <span className="placeholder-text" >Github👋</span>
                      </button>
                    </a>
                    <a href="https://www.linkedin.com/in/ian-sills-668497291/">
                      <button className="button-style">
                        <span className="placeholder-text" >LinkedIn🎉</span>
                        <span className="placeholder-text" >LinkedIn👋</span>
                      </button>
                    </a>
                  </div>
                  <div className="back-group-two">
                    <h3>Languages</h3>
                    <span>Javascript | Html | CSS</span>
                    <h3>Frameworks</h3>
                    <span>React | NextJS</span>
                    <h3>Database</h3>
                    <span>MongoDb | MySQL </span>
                    <h3>Query language</h3>
                    <span>graphql</span>
                    <h3></h3>
                  </div>
                  <div className="back-group-three">
                    &copy; 2025 Ian Sills
                  </div>
                </div>
              </div>


            </div>
            {/* first group */}
            <div className="marquee" >
              <div className="marquee__group" style={{ animationDuration: '58s' }}>
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
              <div className="marquee__group" style={{ animationDuration: '47s' }} >
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
              <div className="marquee__group" style={{ animationDuration: '53s' }}>
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
              <div className="marquee__group" style={{ animationDuration: '49s' }}>
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
              <div className="marquee__group" style={{ animationDuration: '48s' }}>
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
          <img src="/gear.svg" className="gear-svg" />
          <img src="/gear.svg" className="gear-svg-small" />

          <section className="portfolio-container hover">
            <div className="cube-container " onClick={() => setTouch((prev) => !prev)}>
              <div className="cube ">
                <img src="/naanautopreview.jpg" className="thumbnail" />
                <span className="title">Naan-auto | Car Dealership website</span>
                <div className={touch ? 'link-bg link-hover' : "link-bg"}>
                  <a href="https://github.com/Ian-kensington-chadwick-the-3rd/naan-auto" className="flex">
                    <img src="/github.svg" className="link-img" />
                    <span>github</span>
                  </a>
                  <a href="https://naanauto.com" className="flex">
                    <img src="/vercel.svg" style={{ color: 'black' }} className="link-img" />
                    <span>live deployment</span>
                  </a>
                </div>
              </div>
              <div className="cube-description" id="heightfrontpage">
                <div className="portfolio-description">
                  a car dealership website that has garnered 30 users a week and has already helped them sell cars after just the first week!
                </div>
                <div className="portfolio-description">
                  <div>
                    <img className="img" src="/reactlogo.png" />
                    <img className="img" src="/htmllogo.png" />
                    <img className="img" src="/cslogo.png" />
                    <img className="img" src="javascriptlogo.png" />
                    <img className="img" src="/graphql.svg" />
                    <img className="img" src="/mongodb logo.png" />
                    <img className="img" src="/nodejs.png" />
                  </div>
                </div>
              </div>
            </div>
            <Link href={'/projects'}>
              <div className="cube-container">
                <div className="cube">
                  <img src="folder.svg" className="folder-svg" />
                </div>
                <div className="cube-description" id="cubedesc">
                  <span>More of my past work</span>
                </div>
              </div>
            </Link>
          </section>
        </section>
        <section className="panel">
          <div className="flex-center full-height">
            <section className="flex hover">
              <div className="group-info-container">
                <div className={flip ? "card-flip group-info" : "group-info"}>
                  <div className="front">
                    <div className="hello">
                      <p>
                        I am available to contact at anytime. Whether you would like to know about my web dev experience or you would like to give me pointers my portfolio send a message my way!
                      </p>
                      <p className="name-description">- Ian Sills</p>
                    </div>
                    <a href="https://docs.google.com/document/d/1H4jagAcfe2T5PUUoDcmpWmhe5fByI5ZrsD7JqVcz_m8/edit?usp=sharing">
                      <button className="button-style five-mar" id="displaynone">
                        <span className="placeholder-text" >Resume🎉</span>
                        <span className="placeholder-text" >Resume👋</span>
                      </button>
                    </a>
                    <a href="https://github.com/Ian-kensington-chadwick-the-3rd">
                      <button className="button-style five-mar" id="displaynone">
                        <span className="placeholder-text" >GitHub🎉</span>
                        <span className="placeholder-text" >Github👋</span>
                      </button>
                    </a>
                    <a href="https://www.linkedin.com/in/ian-sills-668497291/">
                      <button className="button-style five-mar" id="displaynone">
                        <span className="placeholder-text" >LinkedIn🎉</span>
                        <span className="placeholder-text" >LinkedIn👋</span>
                      </button>
                    </a>
                    <div className="flex-column info-text">
                      <p>iansills04@gmail.com </p><img src="/email.svg" className="svg" />
                      <p>Navarre, FL </p><img src="/mailbox.svg" className="svg" />
                    </div>
                  </div>
                  <div className="back">
                    <div className="back-message">
                      thank you I will get back to you as soon as possible 😃
                    </div>
                  </div>
                </div>
              </div>
              <form className="flex-center" onSubmit={(e) => formHandler(e)}>
                <label>
                  <input type="text" name="firstName" className="fields" maxLength={20}
                    onFocus={() => setActive((prev) => ({ ...prev, firstName: true }))}
                    onBlur={() => setActive((prev) => ({ ...prev, firstName: false }))}
                    onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))} />
                  <span className={active.firstName || form.firstName || errorForm.firstName ? "floating-labels active-lb" : 'floating-labels'}
                    style={errorForm.firstName ? { color: 'red' } : undefined}>
                    {errorForm.firstName ? `${errorForm.firstName}` : 'Name 📛'}
                  </span>
                </label>

                <label>
                  <input type="text" name="email" className="fields" maxLength={50}
                    onFocus={() => setActive((prev) => ({ ...prev, email: true }))}
                    onBlur={() => setActive((prev) => ({ ...prev, email: false }))}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
                  <span className={active.email || form.email || errorForm.email ? "floating-labels active-lb" : 'floating-labels'}
                    style={errorForm.email ? { color: 'red' } : undefined}>
                    {errorForm.email ? `${errorForm.email}` : 'Email 📧'}
                  </span>
                </label>

                <label>
                  <textarea name="message " className="fields textarea" maxLength={500}
                    onFocus={() => setActive((prev) => ({ ...prev, message: true }))}
                    onBlur={() => setActive((prev) => ({ ...prev, message: false }))}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))} />
                  <span className={active.message || form.message || errorForm.message ? "floating-labels active-lb" : 'floating-labels'}
                    style={errorForm.message ? { color: 'red' } : undefined}>
                    {errorForm.message ? `${errorForm.message}` : 'Message 📬'}
                  </span>
                </label>
                <button type="submit" className="button-style">
                  <span className="placeholder-text" >Submit</span>
                  <span className="placeholder-text" >Submit</span>
                </button>
              </form>
            </section>
          </div>
        </section>
      </section>
    </>
  );
}
