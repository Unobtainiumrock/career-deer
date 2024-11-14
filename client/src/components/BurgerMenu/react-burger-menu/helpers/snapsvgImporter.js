export default function snapSvgImporter() {
  let Snap;
  try {
    Snap = require('snapsvg-cjs'); // Using require here because snapsvg-cjs might not support ES6 modules
  } catch (error) {
    console.error('Could not load snapsvg-cjs:', error);
  } finally {
    return Snap;
  }
}
