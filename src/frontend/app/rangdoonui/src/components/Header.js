import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestion, faDownload } from '@fortawesome/free-solid-svg-icons';


function Header() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark mb-3">

            <div className="container">
                <Link to="/" className="navbar-brand">Rangdoon</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="navbarContent" className="collapse navbar-collapse" /*style={{flexGrow:'unset'}}*/ >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <FontAwesomeIcon icon={faHome} />
                                {' '}Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/extensions" className="nav-link">
                                <FontAwesomeIcon icon={faDownload} />
                                {' '}Download Extensions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">
                                <FontAwesomeIcon icon={faQuestion} />
                                {' '}About
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;