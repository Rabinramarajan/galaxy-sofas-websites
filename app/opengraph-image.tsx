import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1A1714",
          color: "#FAF7F1",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, textTransform: "uppercase" }}>
          {site.city} showroom
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 72 }}>{site.name}</div>
          <div style={{ display: "flex", marginTop: 16, fontSize: 28, color: "#E4D8C4" }}>
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
