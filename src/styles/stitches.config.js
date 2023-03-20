import { createStitches, globalCss } from "@stitches/react";


export const { styled, getCssText, css } = createStitches({
  theme: {
    fonts: {
      system: 'Pretendard Variable, Pretendard, -apple-system, system-ui, sans-serif;'
    },
    colors: {
      white: "#FFFFFF",
      black: "#010101",
      gray100: "#FCFCFC",
      gray200: "#EFEFEF",
      gray300: "#DFDFDF",
      gray400: "#B7B7B7",
      gray500: "#949494",
      gray600: "#777777",
      backgroundGray: "#F4F4F4",
      orangePrimary: "#FF6B00",
      orange300: "#FFE2CF",
      orange400: "#FFCBA9",
      orange500: "#FFB483",
      orangeDark: "#EF5A00",
    },
    fontSizes: {
      heading1: "32px",
      heading2: "24px",
      heading3: "20px",
      title1: "22px",
      title2: "18px",
      body1: "16px",
      body2: "14px",
      body3: "12px",
    },
    fontWeights: {
      light: '200',
      nomal: '400',
      bold: '700',
      black: '900',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '10px',
      4: '12px',
      5: '20px',
      6: '24px',
      7: '40px',
      8: '44px',
      9: '80px',
    },

    lineHeights: {},
    letterSpacings: {},
    borderWidths: {},
    borderStyles: {},
    radii: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },
  utils: {

    /* padding */
    p: (value) => ({
      padding: value,
    }),
    pt: (value) => ({
      paddingTop: value,
    }),
    pr: (value) => ({
      paddingRight: value,
    }),
    pb: (value) => ({
      paddingBottom: value,
    }),
    pl: (value) => ({
      paddingLeft: value,
    }),
    px: (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    /* margin */
    m: (value) => ({
      margin: value,
    }),
    mt: (value) => ({
      marginTop: value,
    }),
    mr: (value) => ({
      marginRight: value,
    }),
    mb: (value) => ({
      marginBottom: value,
    }),
    ml: (value) => ({
      marginLeft: value,
    }),
    mx: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),

    /* flex */
    ta: (value) => ({ textAlign: value }),
    fd: (value) => ({ flexDirection: value }),
    fw: (value) => ({ flexWrap: value }),
    ai: (value) => ({ alignItems: value }),
    ac: (value) => ({ alignContent: value }),
    jc: (value) => ({ justifyContent: value }),
    as: (value) => ({ alignSelf: value }),
    fg: (value) => ({ flexGrow: value }),
    fs: (value) => ({ flexShrink: value }),
    fb: (value) => ({ flexBasis: value }),

    bc: (value) => ({
      backgroundColor: value,
    }),

    /* border-radius */
    br: (value) => ({
      borderRadius: value,
    }),
    btrr: (value) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (value) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (value) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (value) => ({
      borderTopLeftRadius: value,
    }),

    bs: (value) => ({ boxShadow: value }),

    lh: (value) => ({ lineHeight: value }),

    ox: (value) => ({ overflowX: value }),
    oy: (value) => ({ overflowY: value }),

    pe: (value) => ({ pointerEvents: value }),
    us: (value) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    userSelect: (value) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    size: (value) => ({
      width: value,
      height: value,
    }),

    appearance: (value) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    backgroundClip: (value) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),
  },
});


export const globalStyles = globalCss({
  "*, *::before, *::afger": { boxSizing: "border-box" },
  "body": { backgroundColor: "#ffffff" },
  "body, h1, h2, h3, h4, p, figure, blockquote, dl, dd": {
    margin: 0,
  },
  "ul[role='list], ol[role='list']": { listStyle: "none" },
  "ul": { margin: "0px", padding: "0px" },
  "html:focus-within": { scrollBehavior: "smooth" },
  body: {
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, system-ui, sans-serif",
    minHeight: "100vh",
    textRendering: "optimizeSpeed",
    lineHeight: 1.5,
  },
  "a:not([class])": { textDecorationSkipInk: "auto" },
  "img, picture": { maxWidth: "100%", display: "block" },
  "input, button, textarea, select": { font: "inherit" },
  "@media (prefers-reduced-motion: reduce)": {
    "html:focus-within": { scrollBehavior: "auto" },
    "*, *::before, *::after": {
      animationDuration: "0.01ms !important",
      animationIterationCount: "1 !important",
      transitionDuration: "0.01ms !important",
      scrollBehavior: "auto !important",
    },
  },
})


