import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

function getPercentile(iq: number): number {
  if (iq >= 145) return 99.9;
  if (iq >= 140) return 99.6;
  if (iq >= 135) return 99;
  if (iq >= 130) return 98;
  if (iq >= 125) return 95;
  if (iq >= 120) return 91;
  if (iq >= 115) return 84;
  if (iq >= 110) return 75;
  if (iq >= 105) return 63;
  if (iq >= 100) return 50;
  if (iq >= 95) return 37;
  if (iq >= 90) return 25;
  if (iq >= 85) return 16;
  if (iq >= 80) return 9;
  return 5;
}

function getLabel(iq: number): { title: string; color: string } {
  if (iq >= 130) return { title: "Gifted", color: "#3B35B5" };
  if (iq >= 120) return { title: "Superior", color: "#3028A8" };
  if (iq >= 110) return { title: "Above Average", color: "#5248D0" };
  if (iq >= 90) return { title: "Average", color: "#7068D8" };
  return { title: "Below Average", color: "#978F80" };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawScore = parseInt(searchParams.get("score") ?? "100");
  const score = isNaN(rawScore) ? 100 : Math.min(145, Math.max(75, rawScore));
  const percentile = getPercentile(score);
  const { title, color } = getLabel(score);

  // Percentile display
  const pctDisplay =
    percentile >= 99
      ? `Top ${(100 - percentile).toFixed(1)}%`
      : `Top ${Math.round(100 - percentile)}%`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F4F2EC",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "56px 72px",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#1C1B13",
                letterSpacing: "-0.5px",
              }}
            >
              Brain
              <span style={{ color }}>Scale</span>
            </div>
            <div
              style={{
                width: "1px",
                height: "20px",
                backgroundColor: "#C8C4B8",
                margin: "0 4px",
              }}
            />
            <div style={{ fontSize: "16px", color: "#978F80", fontWeight: 400 }}>
              Cognitive Assessment
            </div>
          </div>

          {/* Score block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                fontSize: "22px",
                color: "#6B6980",
                fontWeight: 400,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              MY IQ SCORE
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", gap: "32px" }}>
              {/* Score number */}
              <div
                style={{
                  fontSize: "160px",
                  fontWeight: 700,
                  color,
                  lineHeight: 1,
                  letterSpacing: "-4px",
                }}
              >
                {score}
              </div>

              {/* Classification + percentile */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  paddingBottom: "20px",
                }}
              >
                <div
                  style={{
                    backgroundColor: `${color}18`,
                    color,
                    fontSize: "22px",
                    fontWeight: 700,
                    padding: "8px 20px",
                    borderRadius: "999px",
                    border: `1.5px solid ${color}40`,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: "#6B6980",
                    fontWeight: 400,
                  }}
                >
                  {pctDisplay} of the population
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: "18px", color: "#978F80" }}>
              Can you beat my score?
            </div>
            <div
              style={{
                backgroundColor: color,
                color: "#fff",
                fontSize: "18px",
                fontWeight: 600,
                padding: "14px 32px",
                borderRadius: "999px",
              }}
            >
              Take the free test → brainscale.app
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
