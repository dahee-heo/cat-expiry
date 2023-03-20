import { styled } from '../stitches.config';

export const Button = styled('button', {
  // Reset
  all: 'unset',
  alignItems: 'center',
  boxSizing: 'border-box',
  userSelect: 'none',
  borderRadius: '5px',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  // Custom reset?
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  lineHeight: '1',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  variants: {
    bg: {
      primary: {
        backgroundColor: "$orangePrimary",
        color: "$white",
        "&:hover": {
          backgroundColor: "$orangeDark",
        }
      },
      inactive: {
        backgroundColor: "$gray200",
        color: "$white",
      },
      outline: {
        border: "1px solid $orangePrimary",
        color: "$orangePrimary",
        "&:hover": {
          border: "1px solid $orangeDark",
        }
      },
      outlineInactive: {
        border: "1px solid $gray200",
        color: "$gray200"
      }
    },
    sizes: {
      large: {
        fontSize: "$body1",
        padding: '$2'
      },
      small: {
        fontSize: '$body3',
        padding: '$2'
      }
    }
  }
})
