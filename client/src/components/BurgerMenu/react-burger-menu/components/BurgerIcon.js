// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// const BurgerIcon = (props) => {
//   const [hover, setHover] = useState(false);

//   const getLineStyle = (index) => {
//     return {
//       position: 'absolute',
//       height: '20%',
//       left: 0,
//       right: 0,
//       top: `${20 * (index * 2)}%`,
//       opacity: hover ? 0.6 : 1,
//       ...(hover && props.styles.bmBurgerBarsHover),
//     };
//   };

//   const icon = props.customIcon ? (
//     React.cloneElement(props.customIcon, {
//       className: `bm-icon ${props.customIcon.props.className || ''}`.trim(),
//       style: { width: '100%', height: '100%', ...props.styles.bmIcon },
//     })
//   ) : (
//     <span>
//       {[0, 1, 2].map((bar) => (
//         <span
//           key={bar}
//           className={`bm-burger-bars ${props.barClassName} ${hover ? 'bm-burger-bars-hover' : ''
//             }`.trim()}
//           style={{ ...getLineStyle(bar), ...props.styles.bmBurgerBars }}
//         />
//       ))}
//     </span>
//   );

//   const buttonStyle = {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     zIndex: 1,
//     width: '100%',
//     height: '100%',
//     margin: 0,
//     padding: 0,
//     border: 'none',
//     fontSize: 0,
//     background: 'transparent',
//     cursor: 'pointer',
//   };

//   return (
//     <div
//       className={`bm-burger-button ${props.className}`.trim()}
//       style={{ zIndex: 1000, ...props.styles.bmBurgerButton }}
//     >
//       <button
//         type="button"
//         id="react-burger-menu-btn"
//         onClick={props.onClick}
//         onMouseOver={() => {
//           setHover(true);
//           if (props.onIconHoverChange) {
//             props.onIconHoverChange({ isMouseIn: true });
//           }
//         }}
//         onMouseOut={() => {
//           setHover(false);
//           if (props.onIconHoverChange) {
//             props.onIconHoverChange({ isMouseIn: false });
//           }
//         }}
//         style={buttonStyle}
//       >
//         Open Menu
//       </button>
//       {icon}
//     </div>
//   );
// };

// BurgerIcon.propTypes = {
//   barClassName: PropTypes.string,
//   customIcon: PropTypes.element,
//   styles: PropTypes.object,
//   onClick: PropTypes.func,
//   className: PropTypes.string,
//   onIconHoverChange: PropTypes.func,
// };

// BurgerIcon.defaultProps = {
//   barClassName: '',
//   className: '',
//   styles: {},
// };

// export default BurgerIcon;
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BurgerIcon = ({
  barClassName = '',
  customIcon,
  styles = {},
  onClick,
  className = '',
  onIconHoverChange,
}) => {
  const [hover, setHover] = useState(false);

  const getLineStyle = (index) => {
    return {
      position: 'absolute',
      height: '20%',
      left: 0,
      right: 0,
      top: `${20 * (index * 2)}%`,
      opacity: hover ? 0.6 : 1,
      ...(hover && styles.bmBurgerBarsHover),
    };
  };

  const icon = customIcon ? (
    React.cloneElement(customIcon, {
      className: `bm-icon ${customIcon.props.className || ''}`.trim(),
      style: { width: '100%', height: '100%', ...styles.bmIcon },
    })
  ) : (
    <span>
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className={`bm-burger-bars ${barClassName} ${hover ? 'bm-burger-bars-hover' : ''}`.trim()}
          style={{ ...getLineStyle(bar), ...styles.bmBurgerBars }}
        />
      ))}
    </span>
  );

  const buttonStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    border: 'none',
    fontSize: 0,
    background: 'transparent',
    cursor: 'pointer',
  };

  return (
    <div
      className={`bm-burger-button ${className}`.trim()}
      style={{ zIndex: 1000, ...styles.bmBurgerButton }}
    >
      <button
        type="button"
        id="react-burger-menu-btn"
        onClick={onClick}
        onMouseOver={() => {
          setHover(true);
          if (onIconHoverChange) {
            onIconHoverChange({ isMouseIn: true });
          }
        }}
        onMouseOut={() => {
          setHover(false);
          if (onIconHoverChange) {
            onIconHoverChange({ isMouseIn: false });
          }
        }}
        style={buttonStyle}
      >
        Open Menu
      </button>
      {icon}
    </div>
  );
};

BurgerIcon.propTypes = {
  barClassName: PropTypes.string,
  customIcon: PropTypes.element,
  styles: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
  onIconHoverChange: PropTypes.func,
};

export default BurgerIcon;
