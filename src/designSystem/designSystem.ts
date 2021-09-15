export interface ColourObject {
  primary: "#E74B90";
  secondary: "#58C0B8";
  critical: "#B32B45";
  warning: "#ED973B";
  success: "#45B32B";
  highlight: "#6498DD";
  background: "#1A212A";
  textDefault: "#C2D2DD";
  textEmphasis: "#FFFFFF";
  borderDefault: "#4F627B";
  borderSubdued: "#27313E";
  actionPrimaryDefault: "#E74B90";
  actionPrimaryHover: "#E95D9B";
  actionPrimaryPressed: "#E74B90";
  actionPrimaryDisabled: "#4D2B43";
  interactiveDefault: "#6498DD";
  interactiveHover: "#6498DD";
  interactivePressed: "#6498DD";
  interactiveDisabled: "#2C3F57";
  interactiveBoxSelected: "#0A48F5";
  interactiveBoxHover: "#828282";
}

export const Colour: Readonly<ColourObject> = {
  primary: "#E74B90",
  secondary: "#58C0B8",
  critical: "#B32B45",
  warning: "#ED973B",
  success: "#45B32B",
  highlight: "#6498DD",
  background: "#1A212A",
  textDefault: "#C2D2DD",
  textEmphasis: "#FFFFFF",
  borderDefault: "#4F627B",
  borderSubdued: "#27313E",
  actionPrimaryDefault: "#E74B90",
  actionPrimaryHover: "#E95D9B",
  actionPrimaryPressed: "#E74B90",
  actionPrimaryDisabled: "#4D2B43",
  interactiveDefault: "#6498DD",
  interactiveHover: "#6498DD",
  interactivePressed: "#6498DD",
  interactiveDisabled: "#2C3F57",
  interactiveBoxSelected: "#0A48F5",
  interactiveBoxHover: "#828282"
};

export function toRGBA(hex: string, alpha: number = 1) {
  if (hex.includes("#") && hex.length === 7) {
    const regexResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (Array.isArray(regexResult)) {
      const [, redHex, greenHex, blueHex] = regexResult;

      const red = parseInt(redHex, 16);
      const green = parseInt(greenHex, 16);
      const blue = parseInt(blueHex, 16);
      return [`rgba(${red},${green},${blue}, ${alpha})`, [red, green, blue]];
    }

    return [null, []];
  }
  throw Error("Hex number should include # and 6 digits");
}
