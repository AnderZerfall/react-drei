export const SpecialKeys = {
  SPACE: "space",
  BACK_TRAIL: "back_trail",
  POINT: "point",
  COMA: "coma",
  APOSTROPHE: "apostrope",
  SEMICOLON: "semicolun",
  BRACKET: "bracket",
  BRACKET_1: "bracket_1",
  YO: "yo",
  MINUS: "minus",
  SIGN: "sign",
} as const;

export const KeyMapper = (key: string) => {
  if (key === " ") {
    return SpecialKeys.SPACE;
  }

  if (key === "/") {
    return SpecialKeys.BACK_TRAIL;
  }

  if (key === ".") {
    return SpecialKeys.POINT;
  }

  if (key === ",") {
    return SpecialKeys.COMA;
  }

  if (key === "'") {
    return SpecialKeys.APOSTROPHE;
  }

  if (key === ";") {
    return SpecialKeys.SEMICOLON;
  }

  if (key === "[") {
    return SpecialKeys.BRACKET;
  }

  if (key === "]") {
    return SpecialKeys.BRACKET_1;
  }

  if (key === "`") {
    return SpecialKeys.YO;
  }

  if (key === "-") {
    return SpecialKeys.MINUS;
  }

  if (key === "=") {
    return SpecialKeys.SIGN;
  }

  return key;
};
