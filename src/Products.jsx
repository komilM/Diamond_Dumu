import React, { useEffect, useState } from "react";
import "./App.css";

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
        ...new Set(
            products.map((p) => p.category).filter(Boolean)
        ),
    ];

    const categoryNames = {
        ring: "Uzuklar",
        earring: "Ziraklar",
        necklace: "Marjonlar",
        bracelet: "Bilaguzuklar",
    };

    // Filtrlash
    const filteredProducts =
        category === "all"
            ? products
            : products.filter((p) => p.category === category);

    const getName = (p) =>
        p.name || p.title || p.productName || "Taqinchoq";

    const getImage = (p) =>
        p.image || p.imageUrl || p.img || p.photo || "";

    const getPrice = (p) =>
        p.price ?? p.cost ?? 0;

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
                                className={`filter-button ${
                                    category === "all" ? "is-active" : ""
                                }`}
                                onClick={() => setCategory("all")}
                            >
                                Barchasi
                            </button>

                            {categories.map((c) => (
                                <button
                                    key={c}
                                    className={`filter-button ${
                                        category === c ? "is-active" : ""
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

                                {filteredProducts.map((p) => (
                                    <article
                                        className="product-card"
                                        key={p.id}
                                    >
                                        <div className="product-card-img product-image">

                                            <img
                                                src={getImage(p)}
                                                alt={getName(p)}
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />

                                        </div>

                                        <h3 className="product-card-name">
                                            {getName(p)}
                                        </h3>

                                        <p className="product-card-material">
                                            {p.description ||
                                                p.material ||
                                                "Diamond Dumu"}
                                        </p>

                                        <p className="product-card-price">
                                            {formatPrice(getPrice(p))}
                                        </p>

                                        <a
                                            href="tel:+998900000000"
                                            className="button button-outline button-small product-card-button"
                                        >
                                            Buyurtma berish
                                        </a>

                                    </article>
                                ))}

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