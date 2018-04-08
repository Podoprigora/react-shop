export const DOMHasParent = (e, p) => {
  if (!e) {
    return false;
  }

  let el = e.target || e;

  while (el && el !== p) {
    el = el.parentNode || false;
  }

  return el !== false;
};
