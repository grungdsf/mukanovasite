import { useState, useEffect } from "react";
import photo1 from '../components/fbx1 (1).png';
import photo2 from '../components/fbx1 (2).png';
import photo3 from '../components/fbx1 (3).png';
import photo4 from '../components/fbx1 (4).png';
import { Menu } from "../App.js";



export default function WeekOne({ setCurrentPage }) {
    const leftImages = [photo1, photo3, null];
    const rightImages = [photo2, null, photo4];

    return (
        <div style={{ padding: "40px", background: "#fff", minHeight: "100vh" }}>
            <Menu
                setCurrentPage={setCurrentPage}
                buttonColors={{ home: "#000000", weekly: "#7D7D7D", assignments: "#7D7D7D", "independent-study": "#7D7D7D" }}
                hoverColors={{ home: "#000000", weekly: "#000000", assignments: "#000000", "independent-study": "#000000" }}
            />            <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "270px",
                width: "100%",
                margin: "60px 0 60px 0"
            }}
        >
            {/* Левая колонка: текст */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <h1 style={{ fontSize: "64px", fontWeight: 700, marginBottom: "30px" }}>
                    FEATURED WORK \ CELINE

                </h1>
                <p style={{ fontSize: "18px", lineHeight: 1.7, color: "#444", maxWidth: "380px" }}>
                    Celine Floral is a Kazakhstani brand that combines sophistication, natural beauty and modern minimalism. His style is easily recognizable: delicate pastel colors, neat shapes and attention to detail create a sense of lightness and harmony. Each composition looks like a work of art  simple but elegant. As a brand from Kazakhstan, Celine Floral brings the local nature and atmosphere to her work: the scent of the steppes, the softness of dawn, subtle color transitions. It is often associated with purity, naturalness and a sense of taste inspired by nature and local motifs. Their approach to design reflects their love of colors and their desire to emphasize natural beauty without unnecessary decorations  this gives the brand a sincerity and a special atmosphere that many others do not have.

                </p>
            </div>
            {/* Центральная колонка */}
            <div style={{
                display: "flex", flexDirection: "column", gap: "32px", alignItems: "center"
            }}>
                {leftImages.map((img, idx) =>
                    img ? (
                        <img
                            key={idx}
                            src={img}
                            alt=""
                            style={{
                                width: "100%",
                                maxWidth: 500,
                                maxHeight: 5000,
                                objectFit: "contain",
                                background: "#f4f4f4",
                                borderRadius: 18,
                                boxShadow: "0 6px 24px 0 rgba(0,0,0,0.07)"
                            }}
                        />
                    ) : (
                        <div key={idx} style={{ width: "100%", height: "60px" }}></div>
                    )

                )}
            </div>
            {/* Правая колонка */}
            <div style={{
                display: "flex", flexDirection: "column", gap: "32px", alignItems: "center"
            }}>
                {rightImages.map((img, idx) =>
                    img ? (
                        <img
                            key={idx}
                            src={img}
                            alt=""
                            style={{
                                width: "100%",
                                maxWidth: 500,
                                maxHeight: 5000,
                                objectFit: "contain",
                                background: "#f4f4f4",
                                borderRadius: 18,
                                boxShadow: "0 6px 24px 0 rgba(0,0,0,0.07)"
                            }}
                        />
                    ) : (
                        <div key={idx} style={{ width: "100%", height: "60px" }}></div>
                    )
                )}
            </div>
        </div>
            <footer className="footernn">
                <div className="footer-container">
                    <h1 className="footer-logo">ALFIYA MUKANOVA</h1>

                    <nav className="footer-nav">
                        <a href="#hero" onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo(0, 0);
                            setCurrentPage('home');
                        }} className="footer-nav-link">HOME</a>
                        <a href="#weekly" onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo(0, 0);
                            setCurrentPage('weekly');
                        }} className="footer-nav-link">WEEKLY ACTIVITIES</a>
                        <a href="#assignments" onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage('assignments');
                        }} className="footer-nav-link">ASSIGNMENTS</a>
                        <a href="#independent" onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage('independent-study');
                        }} className="footer-nav-link">INDEPENDENT STUDY</a>
                    </nav>
                </div>

                <div className="footer-bottom">
                    <a href="mailto:corporate@example.com" className="filter-btn">Corporate Mail</a>
                    <a href="mailto:direct@example.com" className="filter-btn">Direct Mail</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="filter-btn">Instagram</a>
                </div>
            </footer>        </div>
    );
}
