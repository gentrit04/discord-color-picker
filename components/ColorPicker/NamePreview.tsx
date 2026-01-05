import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface NamePreviewProps {
  name: string;
  color: string;
  image: string;
}

function NamePreview({ name, color, image }: NamePreviewProps) {
  const [themeMode, setThemeMode] = useState(true); // by default dark mode = true
  const isGradient = color.startsWith("linear-gradient");

  const getGradientColors = (gradient: string) => {
    const matches = gradient.match(/#[0-9A-Fa-f]{6}/g);
    return matches || [];
  };

  const gradientColors = isGradient ? getGradientColors(color) : [];

  return (
    <div className="border-border bg-background-tertiary flex flex-col gap-6 rounded-lg border p-6">
      <div className="space-y-4 sm:space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Preview</h2>
          <button
            className="hover:bg-card rounded-full p-1.5"
            onClick={() => setThemeMode(!themeMode)}
          >
            {themeMode ? <Moon /> : <Sun />}
          </button>
        </div>
        <p className="text-text-muted text-sm">
          name color preview (may not be 100% accurate)
          <br /> discord can be weird :&#41;
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-text-muted text-sm font-semibold uppercase">
          Members
        </span>
        <div
          className={`${themeMode ? "bg-card" : "bg-white"} flex items-center gap-3 rounded-lg px-3 py-2`}
        >
          <div className="h-8 w-8 overflow-hidden rounded-full">
            {image ? (
              <Image
                src={image}
                height={32}
                width={32}
                alt="profile picture"
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <div className="bg-accent h-full w-full" />
            )}
          </div>
          <span
            className={`font-medium ${
              isGradient ? "bg-clip-text text-transparent" : ""
            }`}
            style={
              isGradient && gradientColors.length === 2
                ? {
                    backgroundImage: `linear-gradient(90deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                  }
                : !isGradient
                  ? { color: color }
                  : undefined
            }
          >
            {name || "Name"}
          </span>
        </div>
        {isGradient && (
          <div
            className={`${themeMode ? "bg-card" : "bg-white"} flex flex-col items-start gap-3 rounded-lg px-3 py-2`}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden rounded-full">
                {image ? (
                  <Image
                    src={image}
                    height={32}
                    width={32}
                    alt="profile picture"
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="bg-accent h-full w-full" />
                )}
              </div>
              <span
                className="animate-text-gradient bg-clip-text font-medium text-transparent drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]"
                style={
                  isGradient && gradientColors.length === 2
                    ? {
                        backgroundImage: `linear-gradient(
                    90deg,
                    ${gradientColors[0]} 0%,
                    ${gradientColors[1]} 50%,
                    ${gradientColors[0]} 100%
                    )`,
                        backgroundSize: "200% 100%",
                      }
                    : !isGradient
                      ? { color: color }
                      : undefined
                }
              >
                {name || "Name"}
              </span>
            </div>
            <span
              className={`${themeMode ? "" : "text-black"} text-sm font-extralight italic`}
            >
              The hover effect is only available on desktop, while on mobile
              there is no hover effect and discord shows only the static
              gradient
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default NamePreview;
