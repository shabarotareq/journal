import React from "react";

function Slide({ slide }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h2>{slide.title}</h2>
      <h4>{slide.subtitle}</h4>
      <p>{slide.textContent}</p>
      {slide.media &&
        slide.media.map((m) => (
          <div key={m.id}>
            {m.type === "image" && (
              <img src={m.url} alt={m.description} width={300} />
            )}
            {m.type === "video" && <video src={m.url} controls width={300} />}
            {m.type === "icon" && (
              <img src={m.url} alt={m.description} width={50} />
            )}
          </div>
        ))}
    </div>
  );
}

export default Slide;
