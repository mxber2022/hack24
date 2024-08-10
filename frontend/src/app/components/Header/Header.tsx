"use client"
import "./Header.css";

function Header() {
    return(
        <header className="header">
            <div className="header__container">
                <h1>
                    Headline Test lorem ipsum
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, accusantium?</p>
                <div className="header__btn">
                    <w3m-button />
                </div>
            </div>
        </header>
    )
}

export default Header;