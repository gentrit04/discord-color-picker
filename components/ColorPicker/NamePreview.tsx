interface NamePreviewProps {
  name: string;
  color: string;
}

function NamePreview({ name, color }: NamePreviewProps) {
  const isGradient = color.startsWith("linear-gradient");

  const getGradientColors = (gradient: string) => {
    const matches = gradient.match(/#[0-9A-Fa-f]{6}/g);
    return matches || [];
  };

  const gradientColors = isGradient ? getGradientColors(color) : [];

  return (
    <div className="border-border bg-background-tertiary flex flex-col gap-6 rounded-lg border p-6">
      <div>
        <h2 className="text-xl font-semibold">Preview</h2>
        <p className="text-text-muted text-sm">
          name color preview (may not be 100% accurate)
          <br /> discord can be weird :&#41;
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-text-muted text-sm font-semibold uppercase">
          Members
        </span>
        <div className="bg-card flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="bg-accent h-8 w-8 rounded-full" />
          <span
            className={`font-medium ${
              isGradient ? "bg-clip-text text-transparent" : ""
            }`}
            style={
              isGradient && gradientColors.length === 2
                ? {
                    backgroundImage: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
                  }
                : !isGradient
                  ? { color: color }
                  : undefined
            }
          >
            {name || "Name"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NamePreview;
