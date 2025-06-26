'use client'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import Link from 'next/link'
import { resolve } from "styled-jsx/css";





export default function Home() {

  const [active, setActive] = useState({
    firstName: false,
    email: false,
    message: false,
  })

  const [form, setForm] = useState({
    firstName: '',
    email: '',
    message: ''
  })

  const [touch, setTouch] = useState(false)
  console.log(form)

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

  const formHandler = async (e) => {
    e.preventDefault();
    if(!form.firstName || !form.email || !form.message) throw new Error('please input all fields')

    await fetch('/api/messages', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    }).then(response =>{
      if(!response.ok){
        throw new Error('network response 404' + response.statusText)
      }
    }).then(data => {
      if(data){
        setForm({
          firstName: '',
          email:'',
          message:''
        })
      }
    }).catch(error => {
      console.error(error)
    })
  } 


  return (
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
                  <button className="button-style">
                    <span className="placeholder-text" >Resume🎉</span>
                    <span className="placeholder-text" >Resume👋</span>
                  </button>
                  <button className="button-style">
                    <span className="placeholder-text" >GitHub🎉</span>
                    <span className="placeholder-text" >Github👋</span>
                  </button>
                  <button className="button-style">
                    <span className="placeholder-text" >LinkedIn🎉</span>
                    <span className="placeholder-text" >LinkedIn👋</span>
                  </button>
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
            <div className="marquee__group" style={{ animationDuration: '55s' }}>
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
            <div className="marquee__group" style={{ animationDuration: '55s' }}>
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
        <img src="/gear.svg" className="gear-svg"/>
        <img src="/gear.svg" className="gear-svg-small"/>
        <section className="portfolio-container">
          <div className="cube-container">
            <div className="cube ">
              <img src="/naanautopreview.jpg" className="thumbnail" />
              <span className="title">Naan-auto | Car Dealership website</span>
              <div className="link-bg">
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
            <div className="cube-description">
              <div className="portfolio-description">
                My first real world experience in building a car dealership website that has garnered 30 users a week and has already helped them sell cars after just the first week!
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
                <img src="/arrow.svg" className="arrow-svg" />
              </div>
              <div className="cube-description">
                <span>More of my past work</span>
              </div>
            </div>
          </Link>
        </section>
      </section>
      <section className="panel">
        <div className="flex-center full-height">
          <section className="flex">
            <section className="group-info__container">
              <div className="hello">
                <p>
                  I am available to contact at anytime. Whether you would like to know about my web dev experience or you would like to talk about my portfolio send a message my way!
                </p>
                <p>- Ian Sills</p>
              </div>
              <button className="button-style">
                <span className="placeholder-text" >Resume🎉</span>
                <span className="placeholder-text" >Resume👋</span>
              </button>
              <button className="button-style">
                <span className="placeholder-text" >GitHub🎉</span>
                <span className="placeholder-text" >Github👋</span>
              </button>
              <button className="button-style">
                <span className="placeholder-text" >LinkedIn🎉</span>
                <span className="placeholder-text" >LinkedIn👋</span>
              </button>
              <div className="flex-column info-text">
                <p>iansills04@gmail.com </p><img src="/email.svg" className="svg"/>
                <p>Navarre, FL </p><img src="/mailbox.svg" className="svg"/>
              </div>
            </section>
            <form className="flex-center" onSubmit={(e) => formHandler(e)}>
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
              <button type="submit" className="button-style">
                <span className="placeholder-text" >Submit</span>
                <span className="placeholder-text" >Submit</span>
              </button>
            </form>
          </section>
        </div>
      </section>
    </section>
  );
}
