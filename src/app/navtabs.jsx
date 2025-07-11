'use client'
import { useEffect, useState } from "react";


const Nav = ({sectionNumber, onDataChange}) => {
    const [currentSection, setCurrentSection] = useState(0);

    useEffect(()=>{
        setCurrentSection(sectionNumber)
    },[sectionNumber])

    
    const sendDataToParent = (data) =>{
        onDataChange(data)
    }


    return (
        <div>
            <div>
                <span className={currentSection === 0 ? "block current-section":"block"} onClick={() => {sendDataToParent(0)}}>
                    <img src='/face.png' />
                    <span className="navhover">
                        Bio
                    </span>
                </span>
                <span className={currentSection === 1 ? "block current-section":"block"} onClick={() => {sendDataToParent(1)}}>
                    <img src="/work.png" />
                    <span className="navhover">
                        Portfolio
                    </span>
                </span>
                <span className={currentSection === 2 ? "block current-section":"block"} onClick={() => {sendDataToParent(2)}}>
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