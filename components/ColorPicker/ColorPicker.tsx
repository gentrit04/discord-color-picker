"use client";
import { useState } from "react";
import ColorSelector from "./ColorSelector";
import NamePreview from "./NamePreview";
import ColorInformation from "./ColorInformation";

function ColorPicker() {
  const [name, setName] = useState("");
  const [roleColor, setRoleColor] = useState("#5865F2");
  return (
    <div className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ColorSelector
        name={name}
        onNameChange={setName}
        onColorChange={setRoleColor}
      />
      <div className="flex flex-col-reverse gap-4 sm:flex-col">
        <ColorInformation color={roleColor} />
        <NamePreview name={name} color={roleColor} />
      </div>
    </div>
  );
}

export default ColorPicker;
