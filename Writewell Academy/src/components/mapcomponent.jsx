import React from "react";

const MapComponent = () => {
    return (
        <div
            style={{
                borderRadius: "16px",
                overflow: "hidden",
                width: "100%",
                height: "350px",
            }}
        >
            <iframe
                title="Writewell Academy Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.1993037825596!2d77.67272998006598!3d12.894902354959921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1338945faadd%3A0x59d10c45447ba02a!2sKlassik%20Landmark!5e0!3m2!1sen!2sin!4v1763837014412!5m2!1sen!2sin"
            ></iframe>
        </div>
    );
};

export default MapComponent;
