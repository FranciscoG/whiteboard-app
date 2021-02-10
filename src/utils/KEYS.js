
export const KEYS = {
  '0': '0',
  '1': '1',
  '2': '2',
  v : 'v',
  h : 'h',
  n : 'n',
  p : 'p',
  e: 'e',
  z: 'z',
  t: 't',
  space: ' ',
  plus: '+',
  minus: '-',
  '[': '[',
  ']': ']',
  '?' : '?'
}

export const MOVERS = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  tab: 'Tab'
}

export const ACTIONS = {
  esc: 'Escape',
  enter: 'Enter',
  backspace: 'Backspace',
  del: 'Delete'
}

export const MODIFIERS = {
  meta: 'Meta', // event.metaKey
  shift: 'Shift', // event.shiftKey
}

// combine them all into one single object
const all = {
  ...KEYS,
  ...MODIFIERS,
  ...MOVERS,
  ...ACTIONS
};

export default all;