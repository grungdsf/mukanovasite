import svgPaths from "../imports/svg-wqelsnq3dm";

export function InteractiveFolder({
                                      color = '#FFD700',
                                      number = '01',
                                      label = 'WEEK',
                                      textColor = '#d9d9d9',
                                      isHovered = false,
                                      onHoverIn = () => {},
                                      onHoverOut = () => {},
                                      images = []
                                  }) {
    const transitionOut = "opacity 0.2s, transform 0.28s cubic-bezier(0.7,1.8,0.3,1)";
    const transitionIn = "opacity 0.75s, transform 0.85s cubic-bezier(.77,0,.18,1)";

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                aspectRatio: "978/274",
                position: "relative",
                cursor: "pointer",
                transform: isHovered ? "translateY(-20px)" : "translateY(0px)",
                transition: "transform 0.5s cubic-bezier(.77,0,.18,1), background-color 0.5s, color 0.5s"
            }}
            tabIndex={0}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
            onFocus={onHoverIn}
            onBlur={onHoverOut}
        >
            {/* КАРТИНКИ ВЫХОДЯТ ПРИ ХОВЕРЕ */}
            {images.length > 0 && (
                <div style={{
                    position: "absolute",
                    left: "22%",
                    bottom: "48%",
                    display: "flex",
                    flexDirection: "row",
                    zIndex: 1,
                    pointerEvents: "none",
                    gap: "8px"
                }}>
                    {images.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            alt=""
                            style={{
                                width: 180,
                                height: 180,
                                objectFit: "cover",
                                borderRadius: 1,
                                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                                opacity: isHovered ? 1 : 0,
                                transform: isHovered
                                    ? `translate(${idx === 0 ? -10 : idx === 1 ? 0 : 70}px, -30px) rotate(${idx * 8 - 8}deg) scale(1)`
                                    : `translate(${idx === 0 ? -30 : idx === 1 ? 10 : 50}px, 110px) rotate(${idx * 4 - 4}deg) scale(0.7)`,
                                transition: isHovered ? transitionIn : transitionOut
                            }}
                        />
                    ))}
                </div>
            )}

            <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 2 }}>
                <svg
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        filter: "drop-shadow(0px 1px 8px rgba(0,0,0,0.04))"
                    }}
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 978 274"
                >
                    <g>
                        <path d={svgPaths.p21642200} fill={color} />
                        <path d={svgPaths.p1d9ae180} fill={color} />
                    </g>
                </svg>
                <div style={{
                    position: "absolute",
                    left: "6%",
                    top: "12%",
                    color: textColor,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "20px",
                    letterSpacing: "-1px",
                    pointerEvents: "none",
                    transition: "color 0.5s"
                }}>{number}</div>
                <div style={{
                    position: "absolute",
                    left: "6%",
                    bottom: "40%",
                    color: textColor,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "60px",
                    letterSpacing: "-3.6px",
                    pointerEvents: "none",
                    transition: "color 0.5s"
                }}>{label}</div>
            </div>
        </div>
    );
}
