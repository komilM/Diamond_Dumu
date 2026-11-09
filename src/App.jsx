import React, { useEffect } from "react";
import {
    useNavigate,
    useLocation,
    Routes,
    Route,
} from "react-router-dom";

import "./App.css";
import Products from "./Products";
import HomePage from "./HomePage";

const BRAND = "Diamond Dumu";
const PHONE = "+998 99 833 08 47";
const TELEGRAM = "https://t.me/UMIDMELIEV";
const PHONE_LINK = `tel:${PHONE.replace(/\s/g, "")}`;

/* NAVBAR */

const Navbar = ({ page, go }) => {
    return (
        <nav className="navbar">
            <a
                href="/"
                className="navbar-logo"
                onClick={(e) => {
                    e.preventDefault();
                    go("home");
                }}
            >
                {BRAND}
            </a>

            <div className="navbar-links">
                {page === "home" ? (
                    <>
                        <a href="#collection">Kolleksiya</a>
                        <a href="#about">Biz haqimizda</a>
                    </>
                ) : (
                    <a
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            go("home");
                        }}
                    >
                        Bosh sahifa
                    </a>
                )}

                <a
                    href="/products"
                    onClick={(e) => {
                        e.preventDefault();
                        go("catalog");
                    }}
                >
                    Mahsulotlar
                </a>

                <a href="#contact">Aloqa</a>
            </div>
        </nav>
    );
};

/* CONTACT */

const Contact = () => {
    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2>Buyurtma uchun qo'ng'iroq qiling</h2>

                <a href={PHONE_LINK} className="contact-phone">
                    {PHONE}
                </a>

                <p>
                    Qaysi taqinchoq kerakligini ayting,
                    o'lcham va narxni aytib beramiz.
                </p>

                <div className="buttons-row">
                    <a href={PHONE_LINK} className="button button-gold">
                        Qo'ng'iroq qilish
                    </a>

                    <a
                        href={TELEGRAM}
                        target="_blank"
                        rel="noreferrer"
                        className="button button-outline-light"
                    >
                        Telegramda yozish
                    </a>
                </div>

                <div className="footer">
                    © 2026 {BRAND}
                </div>
            </div>
        </section>
    );
};

/* MAIN APP */

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const page =
        location.pathname === "/products"
            ? "catalog"
            : "home";

    const go = (page, category = "all") => {
        if (page === "home") {
            navigate("/");
        } else {
            navigate("/products", {
                state: { category },
            });
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [location.pathname]);

    return (
        <div>
            <Navbar page={page} go={go} />

            <Routes>
                <Route
                    path="/"
                    element={<HomePage go={go} />}
                />

                <Route
                    path="/products"
                    element={
                        <Products
                            go={go}
                            startCategory={
                                location.state?.category || "all"
                            }
                        />
                    }
                />
            </Routes>

            <Contact />
        </div>
    );
};

export default App;