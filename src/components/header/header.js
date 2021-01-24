import React from 'react';

import {Navbar, Nav, NavItem} from 'reactstrap';
import {Link} from "react-router-dom";


const Header = () => {
    return (
        <Navbar expand="md" className="text-white justify-content-between">
            <Link className="navbar-brand" to='/'>Game of Thrones DB</Link>
            <Nav>
                <NavItem>
                    <Link className="nav-link" to='/characters/'>Characters</Link>
                </NavItem>
                <NavItem>
                    <Link className="nav-link" to='/houses/'>Houses</Link>
                </NavItem>
                <NavItem>
                    <Link className="nav-link" to='/books/'>Books</Link>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Header;