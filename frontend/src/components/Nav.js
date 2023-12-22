import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import styled from "styled-components"
import { CgMenu, CgClose } from "react-icons/cg";
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../styles/Button';

const Nav = () => {
    const [menuIcon, setMenuIcon] = useState();
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

    const Nav = styled.nav`

        .navbar-list{ 
            display:flex;
            gap: 4.8rem;
            align-items:center;
            font-size: 15px;

            .navbar-link{
                &:link,
                &:visited{
                    display: inline-block;
                    text-decoration:none;
                    font-size: 1.8rem;
                    font-weight:500;
                    text-transform:uppercase;
                    color:${({ theme }) => theme.colors.black};
                    transition: color 0.3s linear;
                }
            }

        }
        .mobile-navbar-btn{
            display:none;
            background-color: transparent;
            cursor: pointer;
            border: none;
        
        }
        .mobile-nav-icon[name="close-outline]{
            display:none;
        }
        .colse-outline{
            display:none;
        }
        .use-login--name{
            text-transform:capitalize;
        }
        .user-logout,
        .user-login{
            font-size: 1.4rem;
            padding: 0.8rem 1.4rem;
        }
        @media(max-width:${({ theme }) => theme.media.mobile})
            .mobile-navbar-btn{
                display: inline-block;
                z-index:999;
                border:${({ theme }) => theme.colors.black};

                .mobile-nav-icon{
                    font-size: 1.4rem;
                    color:${({ theme }) => theme.colors.black};
                }

            }
            .active .mobile-nav-icon{
                display:none;
                font-size: 4.2rem;
                position: absolute;
                top:30%
                right:10%;
                color:${({ theme }) => theme.colors.black};
                z-index:999;


            }
            active .close-outline{
                display: inline-block;
            }
            .navbar-list{
                width: 100vw;
                height: 100vh;
                position: absolute;
                top:0;
                left:0;
                background-color:#fff;

                display:flex;
                justify-content:center;
                align-items:center;
                flex-direction:column;

                visibility:hidden;
                opacity:0;
                transform: translateX(100%);
                transition: all 3s linear;
            }
            .active .navbar-list{
                visibility: visible;
                opacity:1;
                transform: translateX(0);
                z-index:999;
                transition: all 3s linear;
            }
            .navbar-link{
                font-size: 4.2rem;
            }
        }
    `;
    return (<Nav>
        <div className={menuIcon ? "navbar active" : "navbar"}>
            <ul className='navbar-list'>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/Products" onClick={() => setMenuIcon(false)}>Products</NavLink></li>
                <li><NavLink to="/contact" onClick={() => setMenuIcon(false)}>Contact</NavLink></li>
                {isAuthenticated && <h2>{user.name}</h2>}
                {isAuthenticated ? (<li> <Button onClick={() => logout({ returnTo: window.location.origin })}>
                    Log Out
                </Button></li>) : (<li><Button onClick={() => loginWithRedirect()}>Log In</Button></li>)
                }



            </ul>
        </div>
        <div className='mobile-navbar-btn'>
            <CgMenu name="menu-outline" className="mobile-nav-icon" onClick={() => setMenuIcon(true)} />
            <CgClose name="close-outline" className="mobile-nav-icon close-outline" onClick={() => setMenuIcon(false)} />
        </div>
    </Nav>)
}

export default Nav;
