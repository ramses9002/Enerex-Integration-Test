// components/LoaderContainerView.jsx
import React from "react";
import { Spinner, Fade, Container } from "reactstrap";

const LoaderContainerView = ({ show = false, text = "Cargando, espere por favor..." }) => {
    if (!show) return null;

    return (
        <Container
            fluid
            className="mt-5 mt-md--7 position-relative" // posición relativa para que funcione el absolute interno
            style={{
                minHeight: "100vh", // asegura altura suficiente
            }}
        >
            <Fade in={show} tag="div">
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#fff", // fondo blanco
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "0.25rem",
                    }}
                >
                    <Spinner
                        color="info"
                        style={{
                            width: "4rem",
                            height: "4rem",
                            borderWidth: "0.35rem",
                        }}
                    />
                    <p
                        className="mt-3 text-info"
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: 600,
                            margin: 0,
                        }}
                    >
                        {text}
                    </p>
                </div>
            </Fade>
        </Container>
    );
};

export default LoaderContainerView;
