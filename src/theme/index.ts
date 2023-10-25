export const defaultTheme = {
  COLORS: {
    RED: "#EA5B5F",
    "RED-2": "#FC4A4F",
    RED_LIGHT: "#F8B6A6BF",

    SUCCESS: "#6FE46F",

    GRAY_DARKER: "#595959",
    GRAY_DARK: "#686868",
    GRAY: "#646464",
    GRAY_LIGHT: "#F7F7F7",

    WHITE: "#FFF",
    BLACK: "#000",
  },
  FONT_FAMILIES: {
    BOLD: "Inter_700Bold",
  },
  RADII: {
    XS: "5px",
    SM: "8px",
    MD: "10px",
    LG: "12px",
  },
  FONT_SIZES: {
    SM: "12px",
    MD: "14px",
    LG: "16px",
    XL: "18px",
    "2XL": "24px",
    "3XL": "32px",
  },
} as const;

export type ThemeType = typeof defaultTheme;
