import { useState, useEffect } from "react";
import { InteractiveFolder } from "../components/InteractiveFolder";
import { Menu } from "../App.js";

// Импорты картинок
import img1 from '../components/googledocsicon.png';
import img2 from '../components/googledrive.png';


// Цветовые группы
const redBlue = { color: "#FFE430", textColor: "#B59F09" };      // красный и синий (1, 5, 9)
const purpleGreen = { color: "#D9D9D9", textColor: "#898989" };   // фиолетовый и зеленый (2, 3, 6, 7, 10)
const pinkYellow = { color: "#72CFFB", textColor: "#5899B8" };    // розовый и желтый (4, 8)
const weekColors = [
    redBlue,        // Week 1
    purpleGreen,    // Week 2
    purpleGreen,    // Week 3
    pinkYellow,     // Week 4
    redBlue,        // Week 5
    purpleGreen,    // Week 6
    purpleGreen,    // Week 7
    pinkYellow,     // Week 8
    redBlue,        // Week 9
    purpleGreen     // Week 10
];

const folderLinks = [
    { type: "internal", to: "/weekone" },   // ВАЖНО! Week 1 теперь "weekone"
    { type: "external", to: "/weektwo" },
    { type: "internal", to: "/weekthree" },
    { type: "external", to: "/weekfour" },
    { type: "internal", to: "/weekfive" },
    { type: "internal", to: "/weeksix" },
    { type: "internal", to: "/weekseven" },
    { type: "internal", to: "/weekeight" },
    { type: "internal", to: "/weeknine" },
    { type: "internal", to: "/weekten" }
];

const folderImages = [
    [img1],
    [img1],
    [img2],
    [img1],
    [img1],
    [img1],
    [img1],
    [img2],  [img2],
    [img2],

];



function About({ setCurrentPage }) {
    return (
        <section id="about" className="aboutnn">
            <div className="about-content">
                <h1> IND. STUDY</h1>
                <div className="filters">
                    <button className="filter-btn" onClick={() => setCurrentPage('weekly')}>For Business Administration course</button>
                    <button className="filter-btn" onClick={() => setCurrentPage('assignments')}>Mukanova Alfiya</button>
                    <button className="filter-btn" onClick={() => setCurrentPage('independent-study')}>AIB-2503</button>
                </div>
            </div>
        </section>
    );
}

export default function WeeklyActivities({ setCurrentPage }) {
    const [hoveredIdx, setHoveredIdx] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const weekRows = [
        [{ number: "01", width: "50%" }, { number: "02", width: "50%" }],
        [{ number: "03", width: "35%" }, { number: "04", width: "65%" }],
        [{ number: "05", width: "50%" }, { number: "06", width: "50%" }],
        [{ number: "07", width: "35%" }, { number: "08", width: "65%" }],
        [{ number: "09", width: "50%" }, { number: "10", width: "50%" }]
    ];
    const folderHeight = "190px";
    const overlap = 80;
    let flatIndex = 0;

    return (
        <>
            <Menu
                setCurrentPage={setCurrentPage}
                buttonColors={{ home: "#7D7D7D", weekly: "#7D7D7D", assignments: "#7D7D7D", "independent-study": "#000000" }}
                hoverColors={{ home: "#000000", weekly: "#000000", assignments: "#000000", "independent-study": "#000000" }}
            />            <About setCurrentPage={setCurrentPage} />
            <main
                id="weekly-activities"
                style={{
                    minHeight: "100vh",
                    background: "#fff",
                    padding: "40px",
                    boxSizing: "border-box",
                    width: "100vw",
                    position: "relative",
                    overflow: "visible"
                }}
            >
                <div style={{ width: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
                    {weekRows.map((row, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: "flex",
                                width: "100%",
                                marginTop: idx === 0 ? 0 : `-${overlap}px`,
                                position: "relative",
                                zIndex: idx + 1
                            }}
                        >
                            {row.map((week, jdx) => {
                                const currentIdx = flatIndex++;
                                const link = folderLinks[currentIdx];
                                const imagesForThisFolder = folderImages[currentIdx] || [];
                                const colorScheme = weekColors[currentIdx];
                                const errorColor = "#F5F5F5";

                                let FolderComponent = (
                                    <InteractiveFolder
                                        color={
                                            hoveredIdx === null
                                                ? colorScheme.color
                                                : hoveredIdx === currentIdx
                                                    ? colorScheme.color
                                                    : errorColor
                                        }
                                        number={week.number}
                                        label="WEEK"
                                        textColor={
                                            hoveredIdx === null
                                                ? colorScheme.textColor
                                                : hoveredIdx === currentIdx
                                                    ? colorScheme.textColor
                                                    : "#D9D9D9"
                                        }
                                        isHovered={hoveredIdx === currentIdx}
                                        onHoverIn={() => setHoveredIdx(currentIdx)}
                                        onHoverOut={() => setHoveredIdx(null)}
                                        images={imagesForThisFolder}
                                    />
                                );

                                // Эта папка переводит на weekone!

                                if (currentIdx === 0) {
                                    FolderComponent = (
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                window.open("https://docs.google.com/document/d/1c-oQRCO4Q0s1JjXYGapKF4zrg5kZpu1BxUPD8Z188Zc/edit?tab=t.0", "_blank");
                                            }}
                                        >
                                            {FolderComponent}
                                        </span>
                                    );


                                }
                                // заменяете обработчик на:
                                else if (currentIdx === 1) {
                                    FolderComponent = (
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                window.open("https://docs.google.com/document/d/1aF9wTI-XLlN1GvIc3omnuamv020ErZvJU5QJqmOrd6w/edit?tab=t.0", "_blank");

                                            }}
                                        >
      {FolderComponent}
    </span>
                                    );
                                }
                                else if (currentIdx === 2) {
                                    FolderComponent = (
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                window.open("https://drive.google.com/file/d/1JArAevztlzvBjVAr5UCcAVvy8gFdQMWu/view", "_blank");
                                            }}
                                        >
      {FolderComponent}
    </span>
                                    );
                                }
                                else if (currentIdx === 3) {
                                    FolderComponent = (
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                window.open("https://docs.google.com/document/d/1BFP0-iJVQefYpkTVBgJEzQtGMwlUoBJlOSL8IZWhmLI/edit?tab=t.0", "_blank");
                                            }}                                        >
      {FolderComponent}
    </span>
                                    );
                                }
                                else if (currentIdx === 4) {
                                    FolderComponent = (
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                window.open("https://docs.google.com/document/d/1iCz_NiUP_pVIGJWjbWR_yULw70CF1pURkTKrBKpUU0E/edit?tab=t.0", "_blank");
                                            }}                                            >
      {FolderComponent}
    </span>
                                    );
                                }
                                else if (currentIdx === 5) {
                                    FolderComponent = (
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                window.open("https://docs.google.com/document/d/1G9vShRFNbHABHTjlYzZaqhEcdXI_Vr468SoU7MToHjs/edit?tab=t.0", "_blank");
                                            }}                                           >
      {FolderComponent}
    </span>
                                    );
                                }
                                else if (currentIdx === 6) {
                                    FolderComponent = (
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                window.open("https://docs.google.com/document/d/15Te8FjH42pfMWjGBDYauFm0xtN1iGgWrsGTXBbEeB9Q/edit?tab=t.0", "_blank");
                                            }}                                           >
      {FolderComponent}
    </span>
                                    );
                                }
                                else if (currentIdx === 7) {
                                    FolderComponent = (
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                window.open("https://drive.google.com/file/d/1yV2CSll7kwebE7SgZ5A9DQR3JWShDXWF/view", "_blank");
                                            }}                                           >
      {FolderComponent}
    </span>
                                    );
                                }
                                else if (currentIdx === 8) {
                                    FolderComponent = (
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                window.open("https://drive.google.com/file/d/1KVgODg0GEWAeDvi8lIRRVRGyZHXsupur/view", "_blank");
                                            }}                                           >
      {FolderComponent}
    </span>
                                    );
                                }
                                else if (currentIdx === 9) {
                                    FolderComponent = (
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                window.open("https://drive.google.com/file/d/1GpHltNBCwrcxQBZwpzfG8hU_w2WVrxJm/view", "_blank");
                                            }}                                           >
      {FolderComponent}
    </span>
                                    );
                                }

                                else if (link.type === "internal") {
                                    FolderComponent = (
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentPage(link.to.replace("/", ""));
                                            }}
                                        >
                                            {FolderComponent}
                                        </span>
                                    );
                                } else {
                                    FolderComponent = (
                                        <a
                                            href={link.to}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {FolderComponent}
                                        </a>
                                    );
                                }

                                return (
                                    <div
                                        key={jdx}
                                        style={{
                                            flex: `0 0 ${week.width}`,
                                            maxWidth: week.width,
                                            minWidth: 0,
                                            height: folderHeight,
                                            position: "relative",
                                            zIndex: jdx === 1 ? 2 : 1,
                                            marginLeft: jdx === 1 ? "-18px" : 0
                                        }}
                                    >
                                        {FolderComponent}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
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
                </footer>
            </main>
        </>
    );
}