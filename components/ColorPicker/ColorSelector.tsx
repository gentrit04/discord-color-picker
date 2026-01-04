"use client";
import { Palette, PersonStanding, Settings, Shuffle } from "lucide-react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorSelectorProps {
  name: string;
  onNameChange: (name: string) => void;
  onColorChange: (color: string) => void;
}

type ColorType = "palette" | "custom" | "gradient";

/* source is here https://colorswall.com/palette/260302 i think it's outdated but it's fine :) */
const discordColors = [
  "#f41921",
  "#ff5722",
  "#ff9100",
  "#ffc107",
  "#ffeb3b",
  "#cddc39",
  "#8bc34a",
  "#7d9632",
  "#4caf50",
  "#009688",
  "#00bcd4",
  "#03a9f4",
  "#217ff3",
  "#3f51b5",
  "#673ab7",
  "#6a168e",
  "#9c27b0",
  "#b76ed4",
  "#f15ebe",
  "#ff007d",
  "#60291c",
  "#ff766f",
  "#ffffff",
  "#808080",
  "#0a0a0a",
];

function ColorSelector({
  name,
  onNameChange,
  onColorChange,
}: ColorSelectorProps) {
  const [activeTab, setActiveTab] = useState<ColorType>("palette");
  const [gradientColor1, setGradientColor1] = useState("#5865F2");
  const [gradientColor2, setGradientColor2] = useState("#EB459E");
  const [customColor, setCustomColor] = useState("#5865F2");

  const tabs = [
    { id: "palette" as const, label: "Discord Palette" },
    { id: "custom" as const, label: "Custom Color" },
    { id: "gradient" as const, label: "Gradient" },
  ];

  const updateGradient = (color1: string, color2: string) => {
    const gradient = `linear-gradient(90deg, ${color1}, ${color2})`;
    onColorChange(gradient);
  };

  const handleGradientColor1Change = (color: string) => {
    setGradientColor1(color);
    updateGradient(color, gradientColor2);
  };

  const handleGradientColor2Change = (color: string) => {
    setGradientColor2(color);
    updateGradient(gradientColor1, color);
  };

  const randomGradient = () => {
    const randomColor = () => {
      const random = Math.floor(Math.random() * 0xffffff);
      return `#${random.toString(16).padStart(6, "0")}`;
    };

    const color1 = randomColor();
    const color2 = randomColor();

    setGradientColor1(color1);
    setGradientColor2(color2);
    updateGradient(color1, color2);
  };

  const randomCustomColor = () => {
    const randomColor = () => {
      const random = Math.floor(Math.random() * 0xffffff);
      return `#${random.toString(16).padStart(6, "0")}`;
    };

    const color = randomColor();
    setCustomColor(color);
    onColorChange(color);
  };

  return (
    <div className="border-border bg-background-tertiary flex flex-col gap-6 rounded-lg border p-4">
      <div>
        <span className="flex items-center gap-2 text-xl">
          <Settings absoluteStrokeWidth />
          Configuration
        </span>
        <p className="text-text-muted">
          Set your discord name and select a color to preview how it will appear
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1 text-sm font-medium">
          <PersonStanding absoluteStrokeWidth />
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter name..."
          className="bg-card focus:ring-accent rounded-lg p-2 transition-colors outline-none focus:ring-2"
        />
      </div>

      <div className="flex flex-col gap-3">
        <span className="flex items-center gap-1 text-sm font-medium">
          <Palette absoluteStrokeWidth />
          Color Mode
        </span>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-2 py-1.5 text-sm transition-colors sm:text-base ${
                activeTab === tab.id
                  ? "bg-accent text-white"
                  : "bg-background hover:bg-card-hover"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-2">
          {activeTab === "palette" && (
            <div className="grid grid-cols-4 gap-2">
              {discordColors.map((color) => (
                <button
                  key={color}
                  onClick={() => onColorChange(color)}
                  className="h-12 rounded-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}

          {activeTab === "custom" && (
            <div className="flex flex-col gap-4">
              <button
                onClick={randomCustomColor}
                className="bg-card hover:bg-card-hover flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              >
                <Shuffle absoluteStrokeWidth />
                Random Color
              </button>
              <HexColorPicker
                color={customColor}
                onChange={(color) => {
                  setCustomColor(color);
                  onColorChange(color);
                }}
                style={{ width: "100%" }}
              />
              <input
                type="text"
                value={customColor}
                placeholder="#5865F2"
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  onColorChange(e.target.value);
                }}
                className="bg-card text-text-normal focus:ring-accent-primary rounded-lg p-2 outline-none focus:ring-2"
              />
            </div>
          )}

          {activeTab === "gradient" && (
            <div className="flex flex-col gap-4">
              <button
                onClick={randomGradient}
                className="bg-card hover:bg-card-hover flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              >
                <Shuffle absoluteStrokeWidth />
                Random Gradient
              </button>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Color 1</label>
                <HexColorPicker
                  color={gradientColor1}
                  onChange={handleGradientColor1Change}
                  style={{ width: "100%", height: "150px" }}
                />
                <input
                  type="text"
                  value={gradientColor1}
                  onChange={(e) => handleGradientColor1Change(e.target.value)}
                  className="bg-card text-text-normal focus:ring-accent-primary rounded-lg p-2 text-center font-mono text-sm outline-none focus:ring-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Color 2</label>
                <HexColorPicker
                  color={gradientColor2}
                  onChange={handleGradientColor2Change}
                  style={{ width: "100%", height: "150px" }}
                />
                <input
                  type="text"
                  value={gradientColor2}
                  onChange={(e) => handleGradientColor2Change(e.target.value)}
                  className="bg-card text-text-normal focus:ring-accent-primary rounded-lg p-2 text-center font-mono text-sm outline-none focus:ring-2"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ColorSelector;
