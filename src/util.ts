// Drawer list

export interface ListRouterItem {
  icon: string;
  title: string;
  page: string;
}

// Query filter

export interface StringFilter {
  like?: string
  ilike?: string
}

interface WhereFilter<E> {
  or: E[]
}

interface IncludeFilter {
  relation?: string
}

export interface Filter<E> {
  where?: E | WhereFilter<E>,
  offset?: number,
  limit?: number,
  skip?: number,
  order?: string[]
  include?: IncludeFilter[]
}

export function encodeFilter (filter?: Filter<any>): string {
  let str: string = JSON.stringify(filter)
  str = (filter) ? '?filter=' + str : ''
  return encodeURI(str)
}

// CellOption
export interface CellOption {
  id?: number
  title?: string
  details?: string
  date?: string
  time?: string
  duration?: number
  bgcolor?: string
  icon?: string
}
export function textToRgb (color: any) {
  if (typeof color !== 'string') {
    throw new TypeError('Expected a string')
  }
  const m = /^\s*rgb(a)?\s*\((\s*(\d+)\s*,\s*?){2}(\d+)\s*,?\s*([01]?\.?\d*?)?\s*\)\s*$/.exec(color)
  if (m) {
    const rgb: any = {
      r: Math.min(255, parseInt(m[2], 10)),
      g: Math.min(255, parseInt(m[3], 10)),
      b: Math.min(255, parseInt(m[4], 10))
    }
    if (m[1]) {
      rgb.a = Math.min(1, parseFloat(m[5]))
    }
    return rgb
  }
  return hexToRgb(color)
}
export function hexToRgb (hex: any) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string')
  }
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  } else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }
  const num = parseInt(hex, 16)
  return hex.length > 6
    ? { r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55) }
    : { r: num >> 16, g: num >> 8 & 255, b: num & 255 }
}

export function isCssColor (color: string) {
  return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}
export function luminosity (color: any) {
  if (typeof color !== 'string' && (!color || color.r === void 0)) {
    throw new TypeError('Expected a string or a {r, g, b} object as color')
  }
  const
    rgb = typeof color === 'string' ? textToRgb(color) : color
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255
  const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
  const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
  const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}
