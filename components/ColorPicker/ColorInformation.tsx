import { useState } from "react";

interface ColorInformationProps {
  color: string;
}

function ColorInformation({ color }: ColorInformationProps) {
  const [copiedColor1, setCopiedColor1] = useState(false);
  const [copiedColor2, setCopiedColor2] = useState(false);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (
    text: string,
    setter: (val: boolean) => void,
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const isGradient = color.startsWith("linear-gradient");

  const getGradientColors = (gradient: string) => {
    const matches = gradient.match(/#[0-9A-Fa-f]{6}/g);
    return matches || [];
  };

  const gradientColors = isGradient ? getGradientColors(color) : [];
  const displayColor = isGradient
    ? `${gradientColors[0]} - ${gradientColors[1]}`
    : color;

  return (
    <div className="border-border bg-background-tertiary flex flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div
          className="border-border h-16 w-16 rounded-lg border-2"
          style={{ background: color }}
        />
        <div className="flex flex-col gap-1">
          <span className="text-text-muted text-sm font-semibold">
            Current Color
          </span>
          <span className="text-lg font-bold">{displayColor}</span>
        </div>
      </div>
      {isGradient ? (
        <>
          <div className="bg-background-secondary flex items-center justify-between rounded-lg p-3">
            <div className="flex flex-col">
              <span className="text-text-muted text-xs">HEX | Color 1</span>
              <span className="font-mono text-sm">{gradientColors[0]}</span>
            </div>
            <button
              onClick={() =>
                copyToClipboard(gradientColors[0], setCopiedColor1)
              }
              className="bg-card hover:bg-card-hover rounded-lg px-3 py-1.5 text-sm transition-colors"
            >
              {copiedColor1 ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="bg-background-secondary flex items-center justify-between rounded-lg p-3">
            <div className="flex flex-col">
              <span className="text-text-muted text-xs">HEX | Color 2</span>
              <span className="font-mono text-sm">{gradientColors[1]}</span>
            </div>
            <button
              onClick={() =>
                copyToClipboard(gradientColors[1], setCopiedColor2)
              }
              className="bg-card hover:bg-card-hover rounded-lg px-3 py-1.5 text-sm transition-colors"
            >
              {copiedColor2 ? "Copied!" : "Copy"}
            </button>
          </div>
        </>
      ) : (
        <div className="bg-background-secondary flex items-center justify-between rounded-lg p-3">
          <div className="flex flex-col">
            <span className="text-text-muted text-xs">HEX</span>
            <span className="font-mono text-sm">{color}</span>
          </div>
          <button
            onClick={() => copyToClipboard(color, setCopied)}
            className="bg-card hover:bg-card-hover rounded-lg px-3 py-1.5 text-sm transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ColorInformation;
