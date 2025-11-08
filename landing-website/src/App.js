import { useState, useEffect, useRef } from "react";
import "./App.css";
import WeeklyActivities from "./pages/WeeklyActivities";
import WeekOne from "./pages/WeekOne";
import WeekTwo from "./pages/WeekTwo";
import WeekThree from "./pages/WeekThree";
import WeekFour from "./pages/WeekFour";
import WeekFive from "./pages/WeekFive"; // ← ДОБАВИТЬ ИМПОРТ
import WeekSix from "./pages/WeekSix"; // ← ДОБАВИТЬ ИМПОРТ
import WeekSeven from "./pages/WeekSeven"; // ← ДОБАВИТЬ ИМПОРТ
import WeekEight from "./pages/WeekEight"; // ← ДОБАВИТЬ ИМПОРТ
import WeekNine from "./pages/WeekNine"; // ← ДОБАВИТЬ ИМПОРТ
import WeekTen from "./pages/WeekTen"; // ← ДОБАВИТЬ ИМПОРТ
import AssignmentsPage from "./pages/AssignmentsPage";
import IndependentStudyPage from "./pages/IndependentStudyPage";
import Celine from "./pages/Celine";
import Flowerbx from "./pages/Flowerbx";


export function Menu({ setCurrentPage, buttonColors = {}, hoverColors = {} }) {
    const [activeSection, setActiveSection] = useState('home');
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hoveredButton, setHoveredButton] = useState(null);

    const defaultColor = "#7d7d7d";
    const defaultActive = "#010103";
    const defaultHover = "#4154bb";

    const buttons = [
        { label: "Home", page: "home", section: "home" },
        { label: "Weekly Activities", page: "weekly", section: "weekly-activities" },
        { label: "Assignments", page: "assignments", section: "assignments" },
        { label: "Independent Study", page: "independent-study", section: "independent-study" }
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`menu ${isVisible ? "visible" : "hidden"}`}>
            {buttons.map(btn => {
                // Определим цвет кнопки: активная, наведенная, обычная
                let color = buttonColors[btn.page] || defaultColor;
                if (activeSection === btn.section) color = buttonColors[btn.page] || defaultActive;
                if (hoveredButton === btn.page) color = hoverColors[btn.page] || defaultHover;

                return (
                    <button
                        key={btn.page}
                        style={{
                            color,
                            transition: "color 0.2s"
                        }}
                        className={activeSection === btn.section ? 'active' : ''}
                        onClick={() => {
                            setCurrentPage(btn.page);
                            setActiveSection(btn.section);
                            scrollToSection(btn.section);
                        }}
                        onMouseEnter={() => setHoveredButton(btn.page)}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        {btn.label}
                    </button>
                );
            })}
        </nav>
    );
}

function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY < 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToContent = () => {
        const element = document.getElementById('about');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={`hero-center ${isVisible ? 'visible' : 'hidden'}`}>
            <button onClick={scrollToContent} className="scroll-btn">
                SCROLL
            </button>
            <div className="arrow-btn" onClick={scrollToContent}>↓</div>
        </div>
    );
}

// Image Trail Component
function ImageTrail() {
    const imagesRef = useRef([]);
    const mousePosRef = useRef({ x: 0, y: 0 });
    const lastMousePosRef = useRef({ x: 0, y: 0 });
    const cacheMousePosRef = useRef({ x: 0, y: 0 });
    const zIndexRef = useRef(1);
    const imgPositionRef = useRef(0);
    const thresholdRef = useRef(200);
    const heroSectionRef = useRef(null);
    const isInHeroRef = useRef(false);

    const MathUtils = {
        lerp: (a, b, n) => (1 - n) * a + n * b,
        distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
    };

    const getMouseDistance = () =>
        MathUtils.distance(
            mousePosRef.current.x,
            mousePosRef.current.y,
            lastMousePosRef.current.x,
            lastMousePosRef.current.y
        );

    const isMouseInHero = (x, y) => {
        if (!heroSectionRef.current) return false;
        const rect = heroSectionRef.current.getBoundingClientRect();
        return y >= rect.top && y <= rect.bottom;
    };

    const showNextImage = () => {
        const img = imagesRef.current[imgPositionRef.current];
        if (!img) return;

        const width = 200;
        const height = 200;

        img.style.position = 'fixed';
        img.style.zIndex = zIndexRef.current;
        img.style.pointerEvents = 'none';
        img.style.left = cacheMousePosRef.current.x - width / 2 + 'px';
        img.style.top = cacheMousePosRef.current.y - height / 2 + 'px';
        img.style.display = 'block';
        img.style.opacity = '1';
        img.style.visibility = 'visible';

        img.getAnimations().forEach(animation => animation.cancel());

        const animation = img.animate([
            {
                opacity: 1,
                transform: `scale(1)`,
                offset: 0,
            },
            {
                opacity: 1,
                transform: `scale(1)`,
                offset: 0.66,
            },
            {
                opacity: 0,
                transform: `scale(0.2)`,
                offset: 1,
            },
        ], {
            duration: 1000,
            easing: 'ease-out',
            fill: 'forwards',
        });

        animation.onfinish = () => {
            img.style.opacity = '0';
            img.style.visibility = 'hidden';
            img.style.pointerEvents = 'none';
        };
    };

    const render = () => {
        let distance = getMouseDistance();
        cacheMousePosRef.current.x = MathUtils.lerp(
            cacheMousePosRef.current.x || mousePosRef.current.x,
            mousePosRef.current.x,
            0.15
        );
        cacheMousePosRef.current.y = MathUtils.lerp(
            cacheMousePosRef.current.y || mousePosRef.current.y,
            mousePosRef.current.y,
            0.15
        );

        if (isInHeroRef.current && distance > thresholdRef.current) {
            showNextImage();
            zIndexRef.current++;
            imgPositionRef.current = imgPositionRef.current < imagesRef.current.length - 1
                ? imgPositionRef.current + 1
                : 0;
            lastMousePosRef.current = { ...mousePosRef.current };
        }

        requestAnimationFrame(render);
    };

    useEffect(() => {
        heroSectionRef.current = document.getElementById('hero');

        const imageUrls = [
            '/1ph.png',
            '/2ph.png',
            '/1ph.png',
            '/2ph.png',
            '/1ph.png',
        ];

        const trailContainer = document.createElement('div');
        trailContainer.id = 'image-trail';
        trailContainer.style.position = 'fixed';
        trailContainer.style.top = '0';
        trailContainer.style.left = '0';
        trailContainer.style.width = '100%';
        trailContainer.style.height = '100%';
        trailContainer.style.pointerEvents = 'none';
        trailContainer.style.zIndex = '999';
        document.body.appendChild(trailContainer);

        imageUrls.forEach((url) => {
            const img = document.createElement('img');
            img.src = url;
            img.style.position = 'fixed';
            img.style.opacity = '0';
            img.style.visibility = 'hidden';
            img.style.pointerEvents = 'none';
            img.style.width = '300px';
            img.style.height = '300px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '10px';
            img.style.willChange = 'transform, opacity';
            img.alt = 'trail';
            trailContainer.appendChild(img);
            imagesRef.current.push(img);
        });

        const handleMouseMove = (ev) => {
            mousePosRef.current = { x: ev.clientX, y: ev.clientY };
            isInHeroRef.current = isMouseInHero(ev.clientX, ev.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        render();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            trailContainer.remove();
        };
    }, []);

    return null;
}




export default function App() {
    const [currentPage, setCurrentPage] = useState('home');

    if (currentPage === 'weekly') {
        return <WeeklyActivities setCurrentPage={setCurrentPage} />; // ← ОБНОВИТЬ
    }
    if (currentPage === 'assignments') {
        return <AssignmentsPage setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'independent-study') {
        return <IndependentStudyPage setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'weekone') {
        return <WeekOne setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'weektwo') {
        return <WeekTwo setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'weekthree') {
        return <WeekThree setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'weekfour') {
        return <WeekFour setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'weekfive') {
        return <WeekFive setCurrentPage={setCurrentPage} />;
    } if (currentPage === 'weeksix') {
        return <WeekSix setCurrentPage={setCurrentPage} />;
    } if (currentPage === 'weekseven') {
        return <WeekSeven setCurrentPage={setCurrentPage} />;
    } if (currentPage === 'weekeight') {
        return <WeekEight setCurrentPage={setCurrentPage} />;
    } if (currentPage === 'weeknine') {
        return <WeekNine setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'weekten') {
        return <WeekTen setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'celine') {
        return <Celine setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'flowerbx') {
        return <Flowerbx setCurrentPage={setCurrentPage} />;
    }
    return (
        <div id="home" className="app">
            {/* Navbar справа */}
            <Menu
                setCurrentPage={setCurrentPage}
                buttonColors={{ home: "#000000", weekly: "#7D7D7D", assignments: "#7D7D7D", "independent-study": "#7D7D7D" }}
                hoverColors={{ home: "#000000", weekly: "#000000", assignments: "#000000", "independent-study": "#000000" }}
            />

            {/* SCROLL Indicator */}
            <ScrollIndicator />

            {/* Image Trail Effect */}
            <ImageTrail />

            {/* Hero секция - во весь экран */}
            <section id="hero" className="hero">
                <div className="hero-inner">
                    {/* Левая колонна - COLLECTION OF WORKS */}
                    <div className="hero-left">
                        <h2>COLLECTION OF WORKS</h2>
                    </div>

                    {/* Центральная колонна - пусто */}
                    <div className="hero-center-empty">
                    </div>

                    {/* Правая колонна - ALFIYA MUKANOVA 2025 */}
                    <div className="hero-right">
                        <h2>ALFIYA MUKANOVA 2025</h2>
                    </div>
                </div>
            </section>

            {/* About секция */}
            <section id="about" className="about">
                <div className="about-content">
                    <h1>I am a first-year student specializing in AI Business. This portfolio showcases my academic projects, assignments, and research activities in artificial intelligence and business applications.</h1>

                    {/* Фильтры - ПЕРЕМЕЩЕНЫ СЮДА */}
                    <div className="filters">
                        <button className="filter-btn" onClick={() => setCurrentPage('weekly')}>Weekly activities</button>
                        <button className="filter-btn" onClick={() => setCurrentPage('assignments')}>Assignments</button>
                        <button className="filter-btn" onClick={() => setCurrentPage('independent-study')}>Independent study</button>
                    </div>
                </div>
            </section>

            {/* Featured работ */}
            <section className="featured">
                <div className="featured-header">
                    <div className="featured-divider"></div>
                    <h2 className="featured-year">2025</h2>
                </div>

                <h1 className="featured-title">FEATURED WORK</h1>

                <div className="projects">
                    <div
                        className="project-card"
                        style={{ cursor: "pointer" }}
                        onClick={() => setCurrentPage('celine')}
                    >
                        <img src="./4ph.png" alt="Celine Floral" />
                        <div className="project-info">
                            <span className="project-tag">Celine Floral</span>
                            <span className="project-tag secondary">Kazakhstani brand</span>
                        </div>
                    </div>

                    <div
                        className="project-card"
                        style={{ cursor: "pointer" }}
                        onClick={() => setCurrentPage('flowerbx')}
                    >
                        <img src="./3ph.png" alt="FlowerBX" />
                        <div className="project-info">
                            <span className="project-tag">FlowerBX</span>
                            <span className="project-tag secondary">international brand</span>
                        </div>
                    </div>
                </div>
                <div className="projects"></div>
            </section>

            {/* Contact секция */}
            <section id="contact" className="contact">
                <div className="contact-divider"></div>
                <h1>For inquiries, project collaborations, or business proposals, please visit my updates on Instagram or reach out to me directly at <a href="mailto:alfiyada01@gmail.com">alfiyada01@gmail.com</a></h1>

                {/* Contact buttons */}
                <div className="contact-buttons">
                    <a href="mailto:corporate@example.com" className="filter-btn">Corporate Mail</a>
                    <a href="mailto:direct@example.com" className="filter-btn">Direct Mail</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="filter-btn">Instagram</a>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
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
            </footer>
        </div>
    );
}
