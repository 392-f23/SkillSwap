import React from 'react';
import { Nav } from 'react-bootstrap';
import './SideBar.css';

const SideBar = ({ show, onClose }) => {
    return (
        <div className={`sidebar ${show ? 'open' : ''}`} onClick={onClose}>
            <Nav defaultActiveKey="/home" className="flex-column">
                {/* Add your navigation links here */}
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link eventKey="link-1">Link 1</Nav.Link>
                <Nav.Link eventKey="link-2">Link 2</Nav.Link>
            </Nav>
        </div>
    );
};

export default SideBar;