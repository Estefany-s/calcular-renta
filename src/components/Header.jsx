import { Link } from 'react-router-dom';
import logo from '../assets/img/Logo.png';

const Header = () => {

    return (
        <header style={{ backgroundColor: "#1F363D" }}>
            <div className="d-flex justify-content-between px-3 align-items-center">
                <div>
                    <Link to="/">
                        <img src={logo} style={{ width: "90px" }} />
                    </Link>
                </div>
                <div>
                    <h4 className="text-light">Cálculo de la renta</h4>
                </div>
            </div>
        </header>
    )
}

export default Header;