import React, { useEffect, useState } from "react";
import "./App.css";

import Cartier from "./assets/Cartier.png";
import Manswatch from "./assets/Mans-watch.png"
import Diamondwatch from "./assets/Diamond Watch.png";
import Chopar from "./assets/Chopar.png";
import Rolex from "./assets/Rolex.png";
import Emeraldring from "./assets/Ring.png"

// Rasmlar: MockAPI dagi "image" qiymati : import qilingan rasm
const localImages = {
    Cartier,
    Manswatch,
    Diamondwatch,
    Chopar,
    Rolex,
    Emeraldring
};

const getImage = (p) => localImages[p.image] || "";

const API_URL =
    "https://69a11be22e82ee536fa037ba.mockapi.io/products";

const formatPrice = (price) =>
    Number(price || 0).toLocaleString("uz-UZ") + " so'm";

function Products({ go, startCategory = "all" }) {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(startCategory);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Kategoriya o'zgarsa yangilash
    useEffect(() => {
        setCategory(startCategory || "all");
    }, [startCategory]);

    // MockAPI dan mahsulotlarni olish
    const getProducts = async () => {
        try {
            setLoading(true);
            setError(false);

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("API error");
            }

            const data = await response.json();

            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // Kategoriyalar
    const categories = [
        ...new Set(products.map((p) => p.category).filter(Boolean)),
    ];

    const categoryNames = {
        ring: "Uzuklar",
        earring: "Ziraklar",
        necklace: "Marjonlar",
        bracelet: "Bilaguzuklar",
        watch: "Soatlar",
    };

    // Filtrlash
    const filteredProducts =
        category === "all"
            ? products
            : products.filter((p) => p.category === category);

    const getName = (p) =>
        p.name || p.title || p.productName || "Taqinchoq";

    const getPrice = (p) => p.price ?? p.cost ?? 0;

    return (
        <main className="catalog">
            <div className="container">

                <div className="catalog-head">
                    <h1>Mahsulotlar</h1>

                    <p>
                        Diamond Dumu kolleksiyasidan o'zingizga
                        yoqqan taqinchoqni tanlang.
                    </p>
                </div>

                {loading && (
                    <div className="catalog-message">
                        Mahsulotlar yuklanmoqda...
                    </div>
                )}

                {error && (
                    <div className="catalog-message">
                        <h2>Xatolik yuz berdi!</h2>
                        <p>Mahsulotlarni yuklab bo'lmadi.</p>

                        <button
                            className="button button-dark"
                            onClick={getProducts}
                        >
                            Qayta urinish
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="catalog-filters">
                            <button
                                className={`filter-button ${category === "all" ? "is-active" : ""
                                    }`}
                                onClick={() => setCategory("all")}
                            >
                                Barchasi
                            </button>

                            {categories.map((c) => (
                                <button
                                    key={c}
                                    className={`filter-button ${category === c ? "is-active" : ""
                                        }`}
                                    onClick={() => setCategory(c)}
                                >
                                    {categoryNames[c] || c}
                                </button>
                            ))}
                        </div>

                        <p className="catalog-count">
                            {filteredProducts.length} ta mahsulot
                        </p>

                        {filteredProducts.length === 0 ? (
                            <div className="catalog-message">
                                Hozircha mahsulotlar yo'q.
                            </div>
                        ) : (
                            <div className="catalog-grid">
                                {filteredProducts.map((p) => {
                                    const src = getImage(p);

                                    return (
                                        <article
                                            className="product-card"
                                            key={p.id}
                                        >
                                            <div className="product-card-img product-image">
                                                {src ? (
                                                    <img
                                                        src={src}
                                                        alt={getName(p)}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span className="product-no-image">
                                                        ◆
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="product-card-name">
                                                {getName(p)}
                                            </h3>

                                            <div className="product-card-material">
                                                {[
                                                    p.description,
                                                    p.description1,
                                                    p.description2,
                                                    p.description3,
                                                    p.material
                                                ]
                                                    .filter(Boolean)
                                                    .map((item, index) => (
                                                        <p key={index}>{item}</p>
                                                    ))}
                                            </div>

                                            <a
                                                href="tel:+998900000000"
                                                className="button button-outline button-small product-card-button"
                                            >
                                                Buyurtma berish
                                            </a>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}

                <div className="collection-more">
                    <button
                        className="button button-outline"
                        onClick={() => go("home")}
                    >
                        Bosh sahifaga qaytish
                    </button>
                </div>

            </div>
        </main>
    );
}

export default Products;