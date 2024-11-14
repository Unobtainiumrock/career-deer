// import React from 'react';
// import PropTypes from 'prop-types';

// const CrossIcon = (props) => {
//   const getCrossStyle = (type) => {
//     return {
//       position: 'absolute',
//       width: 3,
//       height: 14,
//       transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)',
//     };
//   };

//   const icon = props.customIcon ? (
//     React.cloneElement(props.customIcon, {
//       className: `bm-cross ${props.customIcon.props.className || ''}`.trim(),
//       style: { width: '100%', height: '100%', ...props.styles.bmCross },
//     })
//   ) : (
//     <span style={{ position: 'absolute', top: '6px', right: '14px' }}>
//       {['before', 'after'].map((type, i) => (
//         <span
//           key={i}
//           className={`bm-cross ${props.crossClassName}`.trim()}
//           style={{ ...getCrossStyle(type), ...props.styles.bmCross }}
//         />
//       ))}
//     </span>
//   );

//   const buttonWrapperStyle = {
//     position: 'absolute',
//     width: 24,
//     height: 24,
//     right: 8,
//     top: 8,
//   };
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
//       className={`bm-cross-button ${props.className}`.trim()}
//       style={{ ...buttonWrapperStyle, ...props.styles.bmCrossButton }}
//     >
//       <button
//         type="button"
//         id="react-burger-cross-btn"
//         onClick={props.onClick}
//         style={buttonStyle}
//         {...(!props.isOpen && { tabIndex: -1 })}
//       >
//         Close Menu
//       </button>
//       {icon}
//     </div>
//   );
// };

// CrossIcon.propTypes = {
//   crossClassName: PropTypes.string,
//   customIcon: PropTypes.element,
//   isOpen: PropTypes.bool,
//   styles: PropTypes.object,
//   onClick: PropTypes.func,
//   className: PropTypes.string,
// };

// CrossIcon.defaultProps = {
//   crossClassName: '',
//   className: '',
//   styles: {},
//   isOpen: false,
// };

// export default CrossIcon;
import React from 'react';
import PropTypes from 'prop-types';

const CrossIcon = ({
  crossClassName = '',
  customIcon,
  isOpen = false,
  styles = {},
  onClick,
  className = '',
}) => {
  const getCrossStyle = (type) => {
    return {
      position: 'absolute',
      width: 3,
      height: 14,
      transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)',
    };
  };

  const icon = customIcon ? (
    React.cloneElement(customIcon, {
      className: `bm-cross ${customIcon.props.className || ''}`.trim(),
      style: { width: '100%', height: '100%', ...styles.bmCross },
    })
  ) : (
    <span style={{ position: 'absolute', top: '6px', right: '14px' }}>
      {['before', 'after'].map((type, i) => (
        <span
          key={i}
          className={`bm-cross ${crossClassName}`.trim()}
          style={{ ...getCrossStyle(type), ...styles.bmCross }}
        />
      ))}
    </span>
  );

  const buttonWrapperStyle = {
    position: 'absolute',
    width: 24,
    height: 24,
    right: 8,
    top: 8,
  };
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
      className={`bm-cross-button ${className}`.trim()}
      style={{ ...buttonWrapperStyle, ...styles.bmCrossButton }}
    >
      <button
        type="button"
        id="react-burger-cross-btn"
        onClick={onClick}
        style={buttonStyle}
        {...(!isOpen && { tabIndex: -1 })}
      >
        Close Menu
      </button>
      {icon}
    </div>
  );
};

CrossIcon.propTypes = {
  crossClassName: PropTypes.string,
  customIcon: PropTypes.element,
  isOpen: PropTypes.bool,
  styles: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

// Removed CrossIcon.defaultProps as defaults are now handled in the function parameters

export default CrossIcon;
