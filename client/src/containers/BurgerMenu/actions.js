export const TOGGLE_MENU = 'TOGGLE_MENU';

export const toggleMenu = (isOpen) => ({
  type: 'TOGGLE_MENU',
  payload: isOpen,
});
