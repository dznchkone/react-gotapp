import React from 'react';

import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';




const Header = () => {
    return (
        <Navbar expand="md" className="text-white justify-content-between">
            <NavbarBrand href="#">Game of Thrones DB</NavbarBrand>
            <Nav>
                <NavItem>
                    <NavLink href="#">Characters</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Houses</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Books</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Header;