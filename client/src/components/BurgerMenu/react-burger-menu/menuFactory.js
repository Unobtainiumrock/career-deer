// import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import baseStyles from './helpers/baseStyles';
// import * as domUtils from './helpers/dom';
// import BurgerIcon from './components/BurgerIcon';
// import CrossIcon from './components/CrossIcon';

// export default function menuFactory(styles) {
//   if (!styles) {
//     throw new Error('No styles supplied');
//   }

//   const ARROW_DOWN = 'ArrowDown';
//   const ARROW_UP = 'ArrowUp';
//   const ESCAPE = 'Escape';
//   const SPACE = ' ';
//   const HOME = 'Home';
//   const END = 'End';

//   function usePrevious(value) {
//     const ref = useRef(value);
//     useEffect(() => {
//       ref.current = value;
//     });
//     return ref.current;
//   }

//   const Menu = (props) => {
//     const defaultProps = {
//       bodyClassName: '',
//       burgerBarClassName: '',
//       burgerButtonClassName: '',
//       className: '',
//       crossButtonClassName: '',
//       crossClassName: '',
//       disableAutoFocus: false,
//       disableCloseOnEsc: false,
//       htmlClassName: '',
//       id: '',
//       itemClassName: '',
//       itemListClassName: '',
//       menuClassName: '',
//       morphShapeClassName: '',
//       noOverlay: false,
//       noTransition: false,
//       onStateChange: () => { },
//       outerContainerId: '',
//       overlayClassName: '',
//       pageWrapId: '',
//       styles: {},
//       width: 300,
//       onIconHoverChange: () => { },
//       itemListElement: 'nav',
//     };

//     props = { ...defaultProps, ...props };

//     const [isOpen, setIsOpen] = useState(false);
//     const timeoutId = useRef(null);
//     const toggleOptions = useRef({});
//     const prevIsOpenProp = usePrevious(props.isOpen);

//     useEffect(() => {
//       if (props.isOpen) {
//         toggleMenu({ isOpen: true, noStateChange: true });
//       }

//       return () => {
//         applyWrapperStyles(false);
//         clearCurrentTimeout();
//       };
//     }, []);

//     useEffect(() => {
//       const wasToggled =
//         typeof props.isOpen !== 'undefined' &&
//         props.isOpen !== isOpen &&
//         props.isOpen !== prevIsOpenProp;

//       if (wasToggled) {
//         toggleMenu();
//         return;
//       }

//       if (styles.svg) {
//         const morphShape = document.getElementById('bm-morph-shape');
//         const path = styles.svg.lib(morphShape).select('path');

//         if (isOpen) {
//           styles.svg.animate(path);
//         } else {
//           setTimeout(() => {
//             path.attr('d', styles.svg.pathInitial);
//           }, 300);
//         }
//       }
//     });

//     useEffect(() => {
//       const { noStateChange, focusOnLastItem } = toggleOptions.current;

//       if (!noStateChange) {
//         props.onStateChange({ isOpen });
//       }

//       if (!props.disableAutoFocus) {
//         if (isOpen) {
//           focusOnLastItem ? domUtils.focusOnLastMenuItem() : domUtils.focusOnFirstMenuItem();
//         } else {
//           if (document.activeElement) {
//             document.activeElement.blur();
//           } else {
//             document.body.blur();
//           }
//         }
//       }

//       clearCurrentTimeout();
//       timeoutId.current = setTimeout(() => {
//         timeoutId.current = null;
//         if (!isOpen) {
//           applyWrapperStyles(false);
//         }
//       }, 500);

//       const defaultOnKeyDown = isOpen ? onKeyDownOpen : onKeyDownClosed;
//       const onKeyDown = props.customOnKeyDown || defaultOnKeyDown;
//       window.addEventListener('keydown', onKeyDown);

//       return () => {
//         window.removeEventListener('keydown', onKeyDown);
//       };
//     }, [isOpen]);

//     const toggleMenu = (options = {}) => {
//       toggleOptions.current = options;

//       applyWrapperStyles();

//       setTimeout(() => {
//         setIsOpen((open) => (typeof options.isOpen !== 'undefined' ? options.isOpen : !open));
//       });
//     };

//     const open = () => {
//       if (typeof props.onOpen === 'function') {
//         props.onOpen();
//       } else {
//         toggleMenu();
//       }
//     };

//     const close = () => {
//       if (typeof props.onClose === 'function') {
//         props.onClose();
//       } else {
//         toggleMenu();
//       }
//     };

//     const getStyle = (style, index) => {
//       const { width, right } = props;
//       const formattedWidth = typeof width !== 'string' ? `${width}px` : width;
//       return style(isOpen, formattedWidth, right, index);
//     };

//     const getStyles = (el, index, inline) => {
//       const propName = 'bm' + el.charAt(0).toUpperCase() + el.slice(1);

//       let output = baseStyles[el] ? getStyle(baseStyles[el]) : {};

//       if (styles[el]) {
//         output = { ...output, ...getStyle(styles[el], index + 1) };
//       }

//       if (props.styles[propName]) {
//         output = { ...output, ...props.styles[propName] };
//       }

//       if (inline) {
//         output = { ...output, ...inline };
//       }

//       if (props.noTransition) {
//         delete output.transition;
//       }

//       return output;
//     };

//     const handleExternalWrapper = (id, wrapperStyles, set) => {
//       const wrapper = document.getElementById(id);

//       if (!wrapper) {
//         console.error(`Element with ID '${id}' not found`);
//         return;
//       }

//       const builtStyles = getStyle(wrapperStyles);

//       for (const prop in builtStyles) {
//         if (Object.prototype.hasOwnProperty.call(builtStyles, prop)) {
//           wrapper.style[prop] = set ? builtStyles[prop] : '';
//         }
//       }

//       const applyOverflow = (el) => {
//         el.style['overflow-x'] = set ? 'hidden' : '';
//       };
//       if (!props.htmlClassName) {
//         applyOverflow(document.querySelector('html'));
//       }
//       if (!props.bodyClassName) {
//         applyOverflow(document.querySelector('body'));
//       }
//     };

//     const applyWrapperStyles = (set = true) => {
//       const applyClass = (el, className) => el.classList[set ? 'add' : 'remove'](className);

//       if (props.htmlClassName) {
//         applyClass(document.querySelector('html'), props.htmlClassName);
//       }
//       if (props.bodyClassName) {
//         applyClass(document.querySelector('body'), props.bodyClassName);
//       }

//       if (styles.pageWrap && props.pageWrapId) {
//         handleExternalWrapper(props.pageWrapId, styles.pageWrap, set);
//       }

//       if (styles.outerContainer && props.outerContainerId) {
//         handleExternalWrapper(props.outerContainerId, styles.outerContainer, set);
//       }

//       const menuWrap = document.querySelector('.bm-menu-wrap');
//       if (menuWrap) {
//         if (set) {
//           menuWrap.removeAttribute('hidden');
//         } else {
//           menuWrap.setAttribute('hidden', true);
//         }
//       }
//     };

//     const clearCurrentTimeout = () => {
//       if (timeoutId.current) {
//         clearTimeout(timeoutId.current);
//       }
//     };

//     const onKeyDownOpen = (e) => {
//       e = e || window.event;
//       switch (e.key) {
//         case ESCAPE:
//           if (!props.disableCloseOnEsc) {
//             close();
//             domUtils.focusOnMenuButton();
//           }
//           break;
//         case ARROW_DOWN:
//           domUtils.focusOnNextMenuItem();
//           break;
//         case ARROW_UP:
//           domUtils.focusOnPreviousMenuItem();
//           break;
//         case HOME:
//           domUtils.focusOnFirstMenuItem();
//           break;
//         case END:
//           domUtils.focusOnLastMenuItem();
//           break;
//         default:
//           break;
//       }
//     };

//     const onKeyDownClosed = (e) => {
//       e = e || window.event;
//       if (e.target === document.getElementById('react-burger-menu-btn')) {
//         switch (e.key) {
//           case ARROW_DOWN:
//           case SPACE:
//             toggleMenu();
//             break;
//           case ARROW_UP:
//             toggleMenu({ focusOnLastItem: true });
//             break;
//           default:
//             break;
//         }
//       }
//     };

//     const handleOverlayClick = () => {
//       if (
//         props.disableOverlayClick === true ||
//         (typeof props.disableOverlayClick === 'function' && props.disableOverlayClick())
//       ) {
//         return;
//       } else {
//         close();
//       }
//     };

//     return (
//       <div>
//         {!props.noOverlay && (
//           <div
//             className={`bm-overlay ${props.overlayClassName}`.trim()}
//             onClick={handleOverlayClick}
//             style={getStyles('overlay')}
//           />
//         )}
//         {props.customBurgerIcon !== false && (
//           <div style={getStyles('burgerIcon')}>
//             <BurgerIcon
//               onClick={open}
//               styles={props.styles}
//               customIcon={props.customBurgerIcon}
//               className={props.burgerButtonClassName}
//               barClassName={props.burgerBarClassName}
//               onIconStateChange={props.onIconStateChange}
//             />
//           </div>
//         )}
//         <div
//           id={props.id}
//           className={`bm-menu-wrap ${props.className}`.trim()}
//           style={getStyles('menuWrap')}
//           aria-hidden={!isOpen}
//         >
//           {styles.svg && (
//             <div
//               id="bm-morph-shape"
//               className={`bm-morph-shape ${props.morphShapeClassName}`.trim()}
//               style={getStyles('morphShape')}
//             >
//               <svg
//                 width="100%"
//                 height="100%"
//                 viewBox="0 0 100 800"
//                 preserveAspectRatio="none"
//               >
//                 <path d={styles.svg.pathInitial} />
//               </svg>
//             </div>
//           )}
//           <div className={`bm-menu ${props.menuClassName}`.trim()} style={getStyles('menu')}>
//             {React.createElement(
//               props.itemListElement,
//               {
//                 className: `bm-item-list ${props.itemListClassName}`.trim(),
//                 style: getStyles('itemList'),
//               },
//               React.Children.map(props.children, (item, index) => {
//                 if (item) {
//                   const classList = ['bm-item', props.itemClassName, item.props.className]
//                     .filter((className) => !!className)
//                     .join(' ');
//                   const extraProps = {
//                     key: index,
//                     className: classList,
//                     style: getStyles('item', index, item.props.style),
//                     ...(isOpen ? {} : { tabIndex: -1 }),
//                   };
//                   return React.cloneElement(item, extraProps);
//                 }
//                 return null;
//               })
//             )}
//           </div>
//           {props.customCrossIcon !== false && (
//             <div style={getStyles('closeButton')}>
//               <CrossIcon
//                 onClick={close}
//                 styles={props.styles}
//                 customIcon={props.customCrossIcon}
//                 className={props.crossButtonClassName}
//                 crossClassName={props.crossClassName}
//                 isOpen={isOpen}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   Menu.propTypes = {
//     bodyClassName: PropTypes.string,
//     burgerBarClassName: PropTypes.string,
//     burgerButtonClassName: PropTypes.string,
//     className: PropTypes.string,
//     crossButtonClassName: PropTypes.string,
//     crossClassName: PropTypes.string,
//     customBurgerIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf([false])]),
//     customCrossIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf([false])]),
//     customOnKeyDown: PropTypes.func,
//     disableAutoFocus: PropTypes.bool,
//     disableCloseOnEsc: PropTypes.bool,
//     disableOverlayClick: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
//     htmlClassName: PropTypes.string,
//     id: PropTypes.string,
//     isOpen: PropTypes.bool,
//     itemClassName: PropTypes.string,
//     itemListClassName: PropTypes.string,
//     itemListElement: PropTypes.oneOf(['div', 'nav']),
//     menuClassName: PropTypes.string,
//     morphShapeClassName: PropTypes.string,
//     noOverlay: PropTypes.bool,
//     noTransition: PropTypes.bool,
//     onClose: PropTypes.func,
//     onIconHoverChange: PropTypes.func,
//     onOpen: PropTypes.func,
//     onStateChange: PropTypes.func,
//     outerContainerId: styles && styles.outerContainer ? PropTypes.string.isRequired : PropTypes.string,
//     overlayClassName: PropTypes.string,
//     pageWrapId: styles && styles.pageWrap ? PropTypes.string.isRequired : PropTypes.string,
//     right: PropTypes.bool,
//     styles: PropTypes.object,
//     width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     children: PropTypes.node,
//   };

//   return Menu;
// }
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import baseStyles from './helpers/baseStyles';
import * as domUtils from './helpers/dom';
import BurgerIcon from './components/BurgerIcon';
import CrossIcon from './components/CrossIcon';

export default function menuFactory(styles) {
  if (!styles) {
    throw new Error('No styles supplied');
  }

  const ARROW_DOWN = 'ArrowDown';
  const ARROW_UP = 'ArrowUp';
  const ESCAPE = 'Escape';
  const SPACE = ' ';
  const HOME = 'Home';
  const END = 'End';

  function usePrevious(value) {
    const ref = useRef(value);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const Menu = (props) => {
    const defaultProps = {
      bodyClassName: '',
      burgerBarClassName: '',
      burgerButtonClassName: '',
      className: '',
      crossButtonClassName: '',
      crossClassName: '',
      disableAutoFocus: false,
      disableCloseOnEsc: false,
      htmlClassName: '',
      id: '',
      itemClassName: '',
      itemListClassName: '',
      menuClassName: '',
      morphShapeClassName: '',
      noOverlay: false,
      noTransition: false,
      onStateChange: () => { },
      outerContainerId: '',
      overlayClassName: '',
      pageWrapId: '',
      styles: {},
      width: 300,
      onIconHoverChange: () => { },
      itemListElement: 'nav',
    };

    props = { ...defaultProps, ...props };

    const [isOpen, setIsOpen] = useState(false);
    const timeoutId = useRef(null);
    const toggleOptions = useRef({});
    const prevIsOpenProp = usePrevious(props.isOpen);

    useEffect(() => {
      if (props.isOpen) {
        toggleMenu({ isOpen: true, noStateChange: true });
      }

      return () => {
        applyWrapperStyles(false);
        clearCurrentTimeout();
      };
    }, []);

    useEffect(() => {
      const wasToggled =
        typeof props.isOpen !== 'undefined' &&
        props.isOpen !== isOpen &&
        props.isOpen !== prevIsOpenProp;

      if (wasToggled) {
        toggleMenu();
        return;
      }

      if (styles.svg) {
        const morphShape = document.getElementById('bm-morph-shape');
        const path = styles.svg.lib(morphShape).select('path');

        if (isOpen) {
          styles.svg.animate(path);
        } else {
          setTimeout(() => {
            path.attr('d', styles.svg.pathInitial);
          }, 300);
        }
      }
    });

    useEffect(() => {
      const { noStateChange, focusOnLastItem } = toggleOptions.current;

      if (!noStateChange) {
        props.onStateChange({ isOpen });
      }

      if (!props.disableAutoFocus) {
        if (isOpen) {
          focusOnLastItem
            ? domUtils.focusOnLastMenuItem()
            : domUtils.focusOnFirstMenuItem();
        } else {
          if (document.activeElement) {
            document.activeElement.blur();
          } else {
            document.body.blur();
          }
        }
      }

      clearCurrentTimeout();
      timeoutId.current = setTimeout(() => {
        timeoutId.current = null;
        if (!isOpen) {
          applyWrapperStyles(false);
        }
      }, 500);

      const defaultOnKeyDown = isOpen ? onKeyDownOpen : onKeyDownClosed;
      const onKeyDown = props.customOnKeyDown || defaultOnKeyDown;
      window.addEventListener('keydown', onKeyDown);

      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    }, [isOpen]);

    const toggleMenu = (options = {}) => {
      toggleOptions.current = options;

      applyWrapperStyles();

      setTimeout(() => {
        setIsOpen((open) =>
          typeof options.isOpen !== 'undefined' ? options.isOpen : !open
        );
      });
    };

    const open = () => {
      if (typeof props.onOpen === 'function') {
        props.onOpen();
      } else {
        toggleMenu();
      }
    };

    const close = () => {
      if (typeof props.onClose === 'function') {
        props.onClose();
      } else {
        toggleMenu();
      }
    };

    const getStyle = (style, index) => {
      const { width, right } = props;
      const formattedWidth =
        typeof width !== 'string' ? `${width}px` : width;
      return style(isOpen, formattedWidth, right, index);
    };

    const getStyles = (el, index, inline) => {
      const propName = 'bm' + el.charAt(0).toUpperCase() + el.slice(1);

      let output = baseStyles[el] ? getStyle(baseStyles[el]) : {};

      if (styles[el]) {
        output = { ...output, ...getStyle(styles[el], index + 1) };
      }

      if (props.styles[propName]) {
        output = { ...output, ...props.styles[propName] };
      }

      if (inline) {
        output = { ...output, ...inline };
      }

      if (props.noTransition) {
        delete output.transition;
      }

      return output;
    };

    const handleExternalWrapper = (id, wrapperStyles, set) => {
      const wrapper = document.getElementById(id);

      if (!wrapper) {
        console.error(`Element with ID '${id}' not found`);
        return;
      }

      const builtStyles = getStyle(wrapperStyles);

      for (const prop in builtStyles) {
        if (builtStyles.hasOwnProperty(prop)) {
          wrapper.style[prop] = set ? builtStyles[prop] : '';
        }
      }

      const applyOverflow = (el) => {
        el.style['overflow-x'] = set ? 'hidden' : '';
      };
      if (!props.htmlClassName) {
        applyOverflow(document.querySelector('html'));
      }
      if (!props.bodyClassName) {
        applyOverflow(document.querySelector('body'));
      }
    };

    const applyWrapperStyles = (set = true) => {
      const applyClass = (el, className) =>
        el.classList[set ? 'add' : 'remove'](className);

      if (props.htmlClassName) {
        applyClass(document.querySelector('html'), props.htmlClassName);
      }
      if (props.bodyClassName) {
        applyClass(document.querySelector('body'), props.bodyClassName);
      }

      if (styles.pageWrap && props.pageWrapId) {
        handleExternalWrapper(props.pageWrapId, styles.pageWrap, set);
      }

      if (styles.outerContainer && props.outerContainerId) {
        handleExternalWrapper(
          props.outerContainerId,
          styles.outerContainer,
          set
        );
      }

      const menuWrap = document.querySelector('.bm-menu-wrap');
      if (menuWrap) {
        if (set) {
          menuWrap.removeAttribute('hidden');
        } else {
          menuWrap.setAttribute('hidden', true);
        }
      }
    };

    const clearCurrentTimeout = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };

    const onKeyDownOpen = (e) => {
      e = e || window.event;
      switch (e.key) {
        case ESCAPE:
          if (!props.disableCloseOnEsc) {
            close();
            domUtils.focusOnMenuButton();
          }
          break;
        case ARROW_DOWN:
          domUtils.focusOnNextMenuItem();
          break;
        case ARROW_UP:
          domUtils.focusOnPreviousMenuItem();
          break;
        case HOME:
          domUtils.focusOnFirstMenuItem();
          break;
        case END:
          domUtils.focusOnLastMenuItem();
          break;
        default:
          break;
      }
    };

    const onKeyDownClosed = (e) => {
      e = e || window.event;
      if (e.target === document.getElementById('react-burger-menu-btn')) {
        switch (e.key) {
          case ARROW_DOWN:
          case SPACE:
            toggleMenu();
            break;
          case ARROW_UP:
            toggleMenu({ focusOnLastItem: true });
            break;
          default:
            break;
        }
      }
    };

    const handleOverlayClick = () => {
      if (
        props.disableOverlayClick === true ||
        (typeof props.disableOverlayClick === 'function' &&
          props.disableOverlayClick())
      ) {
        return;
      } else {
        close();
      }
    };

    return (
      <div>
        {!props.noOverlay && (
          <div
            className={`bm-overlay ${props.overlayClassName}`.trim()}
            onClick={handleOverlayClick}
            style={getStyles('overlay')}
          />
        )}
        {props.customBurgerIcon !== false && (
          <div style={getStyles('burgerIcon')}>
            <BurgerIcon
              onClick={open}
              styles={props.styles}
              customIcon={props.customBurgerIcon}
              className={props.burgerButtonClassName}
              barClassName={props.burgerBarClassName}
              onIconStateChange={props.onIconHoverChange}
            />
          </div>
        )}
        <div
          id={props.id}
          className={`bm-menu-wrap ${props.className}`.trim()}
          style={getStyles('menuWrap')}
          aria-hidden={!isOpen}
        >
          {styles.svg && (
            <div
              id="bm-morph-shape"
              className={`bm-morph-shape ${props.morphShapeClassName}`.trim()}
              style={getStyles('morphShape')}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 800"
                preserveAspectRatio="none"
              >
                <path d={styles.svg.pathInitial} />
              </svg>
            </div>
          )}
          <div
            className={`bm-menu ${props.menuClassName}`.trim()}
            style={getStyles('menu')}
          >
            {React.createElement(
              props.itemListElement,
              {
                className: `bm-item-list ${props.itemListClassName}`.trim(),
                style: getStyles('itemList'),
              },
              React.Children.map(props.children, (item, index) => {
                if (item) {
                  const classList = [
                    'bm-item',
                    props.itemClassName,
                    item.props.className,
                  ]
                    .filter((className) => !!className)
                    .join(' ');
                  const extraProps = {
                    key: index,
                    className: classList,
                    style: getStyles('item', index, item.props.style),
                    ...(isOpen ? {} : { tabIndex: -1 }),
                  };
                  return React.cloneElement(item, extraProps);
                }
                return null;
              })
            )}
          </div>
          {props.customCrossIcon !== false && (
            <div style={getStyles('closeButton')}>
              <CrossIcon
                onClick={close}
                styles={props.styles}
                customIcon={props.customCrossIcon}
                className={props.crossButtonClassName}
                crossClassName={props.crossClassName}
                isOpen={isOpen}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  Menu.propTypes = {
    bodyClassName: PropTypes.string,
    burgerBarClassName: PropTypes.string,
    burgerButtonClassName: PropTypes.string,
    className: PropTypes.string,
    crossButtonClassName: PropTypes.string,
    crossClassName: PropTypes.string,
    customBurgerIcon: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.oneOf([false]),
    ]),
    customCrossIcon: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.oneOf([false]),
    ]),
    customOnKeyDown: PropTypes.func,
    disableAutoFocus: PropTypes.bool,
    disableCloseOnEsc: PropTypes.bool,
    disableOverlayClick: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ]),
    htmlClassName: PropTypes.string,
    id: PropTypes.string,
    isOpen: PropTypes.bool,
    itemClassName: PropTypes.string,
    itemListClassName: PropTypes.string,
    itemListElement: PropTypes.oneOf(['div', 'nav']),
    menuClassName: PropTypes.string,
    morphShapeClassName: PropTypes.string,
    noOverlay: PropTypes.bool,
    noTransition: PropTypes.bool,
    onClose: PropTypes.func,
    onIconHoverChange: PropTypes.func,
    onOpen: PropTypes.func,
    onStateChange: PropTypes.func,
    outerContainerId:
      styles && styles.outerContainer
        ? PropTypes.string.isRequired
        : PropTypes.string,
    overlayClassName: PropTypes.string,
    pageWrapId:
      styles && styles.pageWrap
        ? PropTypes.string.isRequired
        : PropTypes.string,
    right: PropTypes.bool,
    styles: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    children: PropTypes.node,
  };

  return Menu;
}
