import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/css/navbar.css';
import Auth from '../utils/auth';
import Modal from "./Modal";


export default function Navbar() {
    const menuOpen = '../assets/tfmenu.png'
    const menuClose = '../assets/tfcloseMenu.png'
    const [menuBtn, setMenuButton] = useState(menuOpen)
    const [showMenu, setShowMenu] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn()); // Check if the user is initially logged in

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

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
        navigate('/');
    };

    const handleDashboardClick = () => {

        if (!isLoggedIn) {
   
          // Show modal and prevent navigation
          setShowModal(true);
        } else {
          // Navigate to dashboard
          {Auth.loggedIn() &&
          navigate(`/dashboard/${Auth.getUser()?.data._id}`)}
        }
      };
    
      const handleModalClose = () => {
        // Close the modal and navigate to signup page
        setShowModal(false);
        navigate('/signup');
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

                        
                            <button onClick={handleDashboardClick}>
                                DASHBOARD
                            </button>
                    
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

            {showModal && (
        <Modal onClose={handleModalClose}>

          <p>You must be logged in to access this feature.</p>
          <button onClick={handleModalClose}>Sign Up</button>
        </Modal>
      )}
        </>
    );
}