import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../assets/css/navbar.css';
import Auth from '../utils/auth';


export default function Navbar() {
    const menuOpen = '../assets/tfmenu.png'
    const menuClose = '../assets/tfcloseMenu.png'
    const [menuBtn, setMenuButton] = useState(menuOpen)
    const [showMenu, setShowMenu] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn()); // Check if the user is initially logged in

console.log({Auth})
    const maxSmallScreen = 600;
    useEffect(() => {
        const handleResize = () => {

            if (window.innerWidth >= maxSmallScreen) {
                setShowMenu(true)
            } else {
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

        if (menuBtn === menuOpen) {
            setMenuButton(menuClose)
            setShowMenu(true)
        } else {
            setMenuButton(menuOpen)
            setShowMenu(false)
        }


    };
    const handleLogout = () => {
        Auth.logout();
        setIsLoggedIn(false);
    };


    return (
        <>
            <div className="nav-freeze">
                <nav className="nav-container">
                    <section className="logo-container">
                        <button className="menu-btn" onClick={handleMenuToggle}>
                            <img src={menuBtn} alt="" />
                        </button>
                        <h1><span style={{
                            fontSize: '60px', color: 'rgb(6, 155, 161)',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        }}>THINK</span><span style={{
                            fontSize: '85px', color: '#FFE3A1',
                            textShadow: '2px 2px 4px rgba(6, 155, 161, 1.0)',
                        }}>FLASH </span></h1>
                    </section>
                    {showMenu &&
                        <section className="nav-links-container">
                            <button>
                                <Link to={'/'}>ABOUT</Link>
                            </button>
                                {Auth.loggedIn() &&
                            <button>
                                <Link to={`/dashboard/${Auth.getUser()?.data._id}`}>DASHBOARD</Link>
                            </button>
                                }
                            {isLoggedIn ? (
                                <button onClick={handleLogout}>LOG OUT</button>
                            ) : (
                                <>
                                    <button>
                                        <Link to={'/login'}>LOG IN</Link>
                                    </button>
                                    <button>
                                        <Link to={'/signup'}>SIGN UP</Link>
                                    </button>
                                </>
                            )}
                        </section>
                    }
                </nav>
            </div>
        </>
    )
}