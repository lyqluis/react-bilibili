const WINDOW_WIDTH = 375
const FIXED_NUM = 5

export const px2vw = px => {
  if (Array.isArray(px)) px = px[0]
  return px.replace(/(-?\d+\.?\d*)px/gm, (_, $1) => ($1 / WINDOW_WIDTH * 100).toFixed(FIXED_NUM) + 'vw'
  )
}

