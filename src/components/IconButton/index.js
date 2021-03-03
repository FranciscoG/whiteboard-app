/**
 * Accessible Icon Button
 * 
 * research: 
 * https://www.sarasoueidan.com/blog/accessible-icon-buttons/
 * https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html
 * 
 */

function IconButton({ text, icon, onClick, ...props }) {
  return (
    <button {...props} type="button" onClick={onClick}>
      <img src={icon} alt="" aria-hidden="true" />
      <span className="visually-hidden" role="presentation">{text}</span>
    </button>
  );
}

export default IconButton;
