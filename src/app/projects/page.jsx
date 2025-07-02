'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {

    // controlls link slide up for mobile on touchStart
    const [touch, setTouch] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false
    })

    // if view size bigger than 796vw set touch to false
    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth >= 796) {
                setTouch({
                    1: false,
                    2: false,
                    3: false,
                    4: false,
                    5: false,
                    6: false,
                    7: false,
                    8: false
                })
            }
        }
        window.addEventListener('resize', handleResize);
        return () => removeEventListener('resize', handleResize);
    }, [])

    // if mobile user dragging set touch will not be set to true
    useEffect(() => {
        const handleTouchMove = () => {
            setTouch({
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
                8: false
            })
        }

        window.addEventListener('touchmove', handleTouchMove);
        return () => removeEventListener('click', handleTouchMove);
    },)

    useEffect(() => {
        const hover = gsap.utils.toArray('.hover');

        hover.forEach((hover) => {
            ScrollTrigger.create({
                trigger: hover,
                start: 'top bottom',
                toggleClass: 'active-view',
                markers: false
            })
        })
    }, [])


    return (
        <>
            <Link href='/'>
                <div className="backbutton" >
                    &#8619;
                </div>
            </Link>
            <div className="flex-center projects-page ">
                <section className="portfolio-container ">
                    <div className="cube-container hover" onTouchStart={() => {
                        const timer = setTimeout(() => {
                            setTouch((prev) => ({ ...prev, 1: !prev[1] }))
                        }, 1000)
                        return () => clearTimeout(timer)
                    }}>
                        <div className="cube ">
                            <img src="/mongo_dbroutes.gif" className="thumbnail" />
                            <span className="title">mongo db routes</span>
                            <div className={touch[1] ? "link-bg link-rise" : "link-bg"}>
                                <a href="https://github.com/Ian-kensington-chadwick-the-3rd/mongo_dbroutes" className="flex">
                                    <img src="/github.svg" className="link-img" />
                                    <span>github</span>
                                </a>
                            </div>
                        </div>
                        <div className={touch[1] ? 'cube-touch cube-description' : "cube-description"}>
                            <div className="portfolio-description">
                                server-side application that uses mongodb + express to create RESTful routes that gets, updates, adds, and deletes any user, friend, thought, and reaction.
                            </div>
                            <div className="portfolio-description">
                                <div>
                                    <img className="img" src="javascriptlogo.png" />
                                    <img className="img" src="/mongodb logo.png" />
                                    <img className="img" src="/nodejs.png" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="cube-container hover" onTouchStart={() => { setTouch((prev) => ({ ...prev, 2: !prev[2] })) }}>
                        <div className="cube">
                            <img src="/readmegenerator.gif" className="thumbnail" />
                            <span className="title">Read Me Generator</span>
                            <div className={touch[2] ? "link-bg link-rise" : "link-bg"}>
                                <a href="https://github.com/Ian-kensington-chadwick-the-3rd/Readme.md-generator" className="flex">
                                    <img src="/github.svg" className="link-img" />
                                    <span>github</span>
                                </a>
                            </div>
                        </div>
                        <div className={touch[2] ? 'cube-touch cube-description' : "cube-description"}>
                            <div className="portfolio-description">
                                Readme.md-generator generates a read me using a readme template taking in answers then uses file system to input data in the readme template.
                            </div>
                            <div className="portfolio-description">
                                <div>
                                    <img className="img" src="javascriptlogo.png" />
                                    <img className="img" src="/nodejs.png" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="cube-container hover" onTouchStart={() => { setTouch((prev) => ({ ...prev, 3: !prev[3] })) }}>
                        <div className="cube ">
                            <img src="/readmegenerator.gif" className="thumbnail" />
                            <span className="title">Logo Generator</span>
                            <div className={touch[3] ? "link-bg link-rise" : "link-bg"}>
                                <a href="https://github.com/Ian-kensington-chadwick-the-3rd/logo-generator" className="flex">
                                    <img src="/github.svg" className="link-img" />
                                    <span>github</span>
                                </a>
                            </div>
                        </div>
                        <div className={touch[3] ? 'cube-touch cube-description' : "cube-description"}>
                            <div className="portfolio-description">
                                logo-generator generates a logo using inquirer to use your terminal as an answer/questions system to take input
                                and read that input with file system which is then tested using jest to make sure the application completes all tests.
                            </div>
                            <div className="portfolio-description">
                                <div>
                                    <img className="img" src="javascriptlogo.png" />
                                    <img className="img" src="/nodejs.png" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="cube-container hover" onTouchStart={() => { setTouch((prev) => ({ ...prev, 4: !prev[4] })) }}>
                        <div className="cube ">
                            <img src="/employeedb.gif" className="thumbnail" />
                            <span className="title">employee-db</span>
                            <div className={touch[4] ? "link-bg link-rise" : "link-bg"}>
                                <a href="https://github.com/Ian-kensington-chadwick-the-3rd/employee-db" className="flex">
                                    <img src="/github.svg" className="link-img" />
                                    <span>github</span>
                                </a>
                            </div>
                        </div>
                        <div className={touch[4] ? 'cube-touch cube-description' : "cube-description"}>
                            <div className="portfolio-description">
                                employee-db is server side application that uses sql, node, express, and inquirer to give you the ability to view,add,update employees,roles, managers, and departments in your database application
                            </div>
                            <div className="portfolio-description">
                                <div>
                                    <img className="img" src="javascriptlogo.png" />
                                    <img className="img" src="/nodejs.png" />
                                    <img className='img' src='/mysql.svg'></img>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="cube-container hover" onTouchStart={() => { setTouch((prev) => ({ ...prev, 5: !prev[5] })) }}>
                        <div className="cube ">
                            <img src="/notetaker.gif" className="thumbnail" />
                            <span className="title">note taker</span>
                            <div className={touch[5] ? "link-bg link-rise" : "link-bg"}>
                                <a href="https://github.com/Ian-kensington-chadwick-the-3rd/Note-maker" className="flex">
                                    <img src="/github.svg" className="link-img" />
                                    <span>github</span>
                                </a>
                            </div>
                        </div>
                        <div className={touch[5] ? 'cube-touch cube-description' : "cube-description"}>
                            <div className="portfolio-description">
                                Note-maker Is a website application that uses express and node.js to save your data to a data base json folder.
                            </div>
                            <div className="portfolio-description">
                                <div>
                                    <img className='img' src='htmllogo.png' />
                                    <img className='img' src="/cslogo.png" />
                                    <img className="img" src="javascriptlogo.png" />
                                    <img className="img" src="/nodejs.png" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="cube-container hover" onTouchStart={() => { setTouch((prev) => ({ ...prev, 6: !prev[6] })) }}>
                        <div className="cube ">
                            <img src="/spacejam.gif" className="thumbnail" />
                            <span className="title">space-jam-X</span>
                            <div className={touch[6] ? "link-bg link-rise" : "link-bg"}>
                                <a href="https://github.com/dee-here/space-jam-x" className="flex">
                                    <img src="/github.svg" className="link-img" />
                                    <span>github</span>
                                </a>
                            </div>
                        </div>
                        <div className={touch[6] ? 'cube-touch cube-description' : "cube-description"}>
                            <div className="portfolio-description">
                                This application is designed to highlight the plethora of information available through NASA web APIs.
                            </div>
                            <div className="portfolio-description">
                                <div>
                                    <img className='img' src='htmllogo.png' />
                                    <img className='img' src="/cslogo.png" />
                                    <img className="img" src="javascriptlogo.png" />
                                    <img className="img" src="/nodejs.png" />
                                    <img className='img' src='/mysql.svg' />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="cube-container hover" onTouchStart={() => { setTouch((prev) => ({ ...prev, 7: !prev[7] })) }}>
                        <div className="cube ">
                            <img src="/demo.gif" className="thumbnail" />
                            <span className="title">Darwnism</span>
                            <div className={touch[7] ? "link-bg link-rise" : "link-bg"}>
                                <a href="https://github.com/Antedbell20/darwnism" className="flex">
                                    <img src="/github.svg" className="link-img" />
                                    <span>github</span>
                                </a>
                            </div>
                        </div>
                        <div className={touch[7] ? 'cube-touch cube-description' : "cube-description"}>
                            <div className="portfolio-description">
                                interactive quiz experience that challenges you to explore history, geography, science, sports, entertainment, and more.
                            </div>
                            <div className="portfolio-description">
                                <div>
                                    <img className="img" src='/htmllogo.png' />
                                    <img className="img" src="/cslogo.png" />
                                    <img className="img" src="javascriptlogo.png" />
                                    <img className="img" src="/nodejs.png" />
                                    <img className='img' src='/mysql.svg'></img>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="cube-container hover" onTouchStart={() => { setTouch((prev) => ({ ...prev, 8: !prev[8] })) }}>
                        <div className="cube ">
                            <img src="/whitechapel.png" className="thumbnail" />
                            <span className="title">White Chapel Mysteries</span>
                            <div className={touch[8] ? "link-bg link-rise" : "link-bg"}>
                                <a href="https://github.com/Armand57araujo/whiteChapelMysteries" className="flex">
                                    <img src="/github.svg" className="link-img" />
                                    <span>github</span>
                                </a>
                            </div>
                        </div>
                        <div className={touch[8] ? 'cube-touch cube-description' : "cube-description"}>
                            <div className="portfolio-description">
                                White Chapel Mysteries is a visual novel game based off of the Jack the Ripper stories.
                            </div>
                            <div className="portfolio-description">
                                <div>
                                    <img className="img" src='/htmllogo.png' />
                                    <img className="img" src="/cslogo.png" />
                                    <img className="img" src="javascriptlogo.png" />
                                    <img className="img" src="/nodejs.png" />
                                    <img className='img' src="/graphql.svg" />
                                    <img className='img' src="/mongodb logo.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Projects;