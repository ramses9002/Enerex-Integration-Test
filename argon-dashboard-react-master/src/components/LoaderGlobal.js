import React from "react";
import { Spinner, Fade } from "reactstrap";

const Loader = ({ show = false, text = "Un momento por favor..." }) => {
    if (!show) return null;
    return (
        <Fade in={show} tag="div">
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 1050,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    backdropFilter: "blur(2px)",
                    transition: "opacity 0.3s ease-in-out",
                }}
            >
                {/* Spinner más grande y más grueso */}
                <Spinner
                    color="light"
                    style={{
                        width: "5rem",
                        height: "5rem",
                        borderWidth: "0.5rem", // línea más gruesa
                    }}
                />
                <p
                    className="mt-4"
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        letterSpacing: "0.5px",
                    }}
                >
                    {text}
                </p>
            </div>
        </Fade>
    );
};

export default Loader;
