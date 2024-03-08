import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom"
import '../assets/css/navbar.css'


export default function Navbar() {
    const menuOpen = '../assets/tfmenu.png'
    const menuClose = '../assets/tfcloseMenu.png'
    const [menuBtn, setMenuButton]  = useState(menuOpen)
    const [showMenu, setShowMenu]  = useState(false)
    const maxSmallScreen = 600;
    useEffect(() => {
        const handleResize = () => {

            if(window.innerWidth >= maxSmallScreen){
                setShowMenu(true)
            }else{
                setShowMenu(false)
            }
        };
    
        // Initial check
        handleResize();
    
        // Event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [])

    const handleMenuToggle = () => {
       
        if(menuBtn === menuOpen){
            setMenuButton(menuClose)
            setShowMenu(true)
        }else{
            setMenuButton(menuOpen)
            setShowMenu(false)
        }


    }

    return (
        <>
        <nav className="nav-container">
            <section className="logo-container">
                <button className="menu-btn" onClick={handleMenuToggle}>
                    <img src={menuBtn} alt="" />
                </button>
                <div>Logo</div>
            </section>
           {showMenu  &&
            <section className="nav-links-container">
                <button>
                    <Link to={'/'}>ABOUT</Link>
                </button>
                <button>
                    <Link to={'/dashboard'}>DASHBOARD</Link>
                </button>
                <button>
                    <Link to={'/login'}>LOG IN</Link>
                </button>
                <button>
                    <Link to={'/signup'}>SIGN UP</Link>
                </button>
            </section>
        }
        </nav>
        </>
    )
}