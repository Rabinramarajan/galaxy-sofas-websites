import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1714",
          color: "#FAF7F1",
          fontSize: 28,
          fontFamily: "Georgia, serif",
        }}
      >
        {site.name.slice(0, 1)}
      </div>
    ),
    size,
  );
}
