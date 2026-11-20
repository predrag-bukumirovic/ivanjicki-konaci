/** sessionStorage key — the intro loader plays once per visit, not on every page. */
export const PRELOADER_SEEN_KEY = "ik-intro";

/** Class put on <html> before first paint when the intro was already seen this visit. */
export const PRELOADER_SEEN_CLASS = "ik-intro-seen";

/** Runs in <head> before paint, so repeat page loads never flash the loader. */
export const preloaderHeadScript = `try{if(sessionStorage.getItem(${JSON.stringify(
  PRELOADER_SEEN_KEY,
)}))document.documentElement.classList.add(${JSON.stringify(
  PRELOADER_SEEN_CLASS,
)})}catch(e){}`;
