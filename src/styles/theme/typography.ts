import type { TypographyVariantsOptions } from '@mui/material/styles'

const systemDefaultFontFamilySansSerif = [
  '"Noto Sans"',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"'
].join(',')

const typography: TypographyVariantsOptions = {
  htmlFontSize: 16,
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontFamily: systemDefaultFontFamilySansSerif,
  headerXL: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '40px',
    letterSpacing: '-0.03em'
  },
  headerL: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 600,
    fontSize: 27,
    lineHeight: '32px',
    letterSpacing: '-0.02em'
  },
  headerM: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: '-0.02em'
  },
  headerS: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '-0.01em'
  },
  paragraphL: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px'
  },
  paragraphM: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '20px'
  },
  paragraphS: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px'
  },
  paragraphXS: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 400,
    fontSize: 11,
    lineHeight: '16px'
  },
  labelL: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '-0.01em'
  },
  labelLSB: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '-0.01em'
  },
  labelM: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '20px'
  },
  labelMSB: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px'
  },
  labelMCaps: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    textTransform: 'uppercase'
  },
  labelS: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '16px'
  },
  labelSCapsSB: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '16px',
    textTransform: 'uppercase'
  },
  labelSSB: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '16px'
  },
  labelSCaps: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '16px',
    textTransform: 'uppercase',
    letterSpacing: '0.1px'
  },
  labelXS: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 500,
    fontSize: 11,
    lineHeight: '16px'
  },
  labelXXS: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 500,
    fontSize: 10,
    lineHeight: '12px'
  },
  labelXXSCapsSB: {
    fontFamily: systemDefaultFontFamilySansSerif,
    fontWeight: 600,
    fontSize: 10,
    textTransform: 'uppercase',
    lineHeight: '12px'
  }
}

export default typography
