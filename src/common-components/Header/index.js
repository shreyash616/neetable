import { Link } from "react-router-dom"

const Header = () => {
    return <div className="bg-light w-100 container-fluid"><nav className="navbar container navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand text-primary mb-0 h1">DEMO</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-end" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <span className="nav-link"><Link className="text-decoration-none" to='/gallery'>Gallery</Link></span>
                </li>
                <li className="nav-item active">
                    <span className="nav-link"><Link className="text-decoration-none" to='/students'>Students</Link></span>
                </li>
                <li className="nav-item active">
                    <span className="nav-link"><Link className="text-decoration-none" to='/clients'>Clients</Link></span>
                </li>
            </ul>
        </div>
    </nav>
    </div>
}

export default Header