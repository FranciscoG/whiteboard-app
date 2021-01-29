/**
 * When a mouse moves, remove the keyboard focus class and then remove self listener
 * and start the keydown listener
 */
function onMousemove() {
  document.body.classList.remove('has-keyboard-focus');
  window.removeEventListener('mousemove', onMousemove);
  window.addEventListener('keydown', onKeyDown);
}

/**
 * When any key is pressed, add keyboard focus class, remove self, and start
 * mousemove listeners
 */
function onKeyDown() {
  document.body.classList.add('has-keyboard-focus');
  window.removeEventListener('keydown', onKeyDown);
  window.addEventListener('mousemove', onMousemove);
}

function setup() {
  // start assuming mouse
  window.addEventListener('keydown', onKeyDown);
}

setup();