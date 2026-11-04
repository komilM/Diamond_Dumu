import React from "react";
import "./App.css";

/* Taqinchoq rasmlari: ring, earring, necklace, bracelet */
const ICONS = {
    ring: (
        <>
            <circle cx="12" cy="15" r="6" />
            <path d="M9 6l3-3 3 3-3 3z" />
        </>
    ),
    earring: (
        <>
            <circle cx="12" cy="5" r="1.6" />
            <path d="M12 7v4" />
            <path d="M12 11l4 4-4 6-4-6z" />
        </>
    ),
    necklace: (
        <>
            <path d="M4 5c0 9 3 12 8 12s8-3 8-12" />
            <path d="M12 17l-2.5 3 2.5 2 2.5-2z" />
        </>
    ),
    bracelet: (
        <>
            <ellipse cx="12" cy="12" rx="9" ry="5" />
            <ellipse cx="12" cy="12" rx="6" ry="2.6" />
        </>
    ),
};

const Icon = ({ name }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {ICONS[name]}
    </svg>
);

const HomePage = ({ go }) => {
    return (
        <>
            {/* HEADER */}
            <header className="header">
                <div className="container">
                    <div className="header-grid">

                        <div className="header-text">
                            <h1>
                                Diamond
                                <span>Dumu</span>
                            </h1>

                            <p className="header-description">
                                Nafislik va go'zallikni o'zida
                                mujassam etgan noyob taqinchoqlar.
                                Har bir lahzangiz uchun o'ziga xos
                                uslub.
                            </p>

                            <div className="buttons-row">
                                <button
                                    className="button button-dark"
                                    onClick={() => go("catalog")}
                                >
                                    Kolleksiyani ko'rish
                                </button>

                                <a
                                    href="#about"
                                    className="button button-outline"
                                >
                                    Biz haqimizda
                                </a>
                            </div>
                        </div>

                        <div className="header-img">
                            <div className="header-img-arch color-turquoise">
                                <Icon name="ring" />
                            </div>

                            <div className="header-img-arch color-dark">
                                <Icon name="earring" />
                            </div>

                            <div className="header-img-arch color-gold">
                                <Icon name="necklace" />
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* COLLECTION */}
            <section id="collection" className="collection">
                <div className="container">

                    <div className="collection-head">
                        <h2>Bizning kolleksiya</h2>

                        <p>
                            Siz uchun maxsus tanlangan nafis
                            va zamonaviy taqinchoqlar.
                        </p>
                    </div>

                    <div className="collection-grid">

                        <div className="collection-card">
                            <div className="collection-card-img color-turquoise">
                                <Icon name="ring" />
                            </div>
                            <h3>Uzuklar</h3>
                            <p>O'ziga xos va nafis uzuklar.</p>
                        </div>

                        <div className="collection-card">
                            <div className="collection-card-img color-dark">
                                <Icon name="earring" />
                            </div>
                            <h3>Ziraklar</h3>
                            <p>Har bir ko'rinish uchun go'zallik.</p>
                        </div>

                        <div className="collection-card">
                            <div className="collection-card-img color-gray">
                                <Icon name="necklace" />
                            </div>
                            <h3>Marjonlar</h3>
                            <p>Nafislikni ifodalovchi marjonlar.</p>
                        </div>

                        <div className="collection-card">
                            <div className="collection-card-img color-gold">
                                <Icon name="bracelet" />
                            </div>
                            <h3>Bilaguzuklar</h3>
                            <p>Uslubingizga mos bilaguzuklar.</p>
                        </div>

                    </div>

                    <div className="collection-more">
                        <button
                            className="button button-dark"
                            onClick={() => go("catalog")}
                        >
                            Barcha mahsulotlar
                        </button>
                    </div>

                </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="about">
                <div className="container">
                    <div className="about-grid">

                        <h2>
                            Go'zallik har bir
                            detalda namoyon bo'ladi.
                        </h2>

                        <div className="about-list">

                            <div className="about-item">
                                <h3>01. Sifat</h3>
                                <p>
                                    Har bir mahsulotimizga
                                    alohida e'tibor beramiz.
                                </p>
                            </div>

                            <div className="about-item">
                                <h3>02. Nafislik</h3>
                                <p>
                                    Zamonaviy va o'ziga xos
                                    dizaynlarni taklif qilamiz.
                                </p>
                            </div>

                            <div className="about-item">
                                <h3>03. Ishonch</h3>
                                <p>
                                    Sizning mamnunligingiz
                                    biz uchun muhim.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;    