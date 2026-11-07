export type Theme = 'dark' | 'light'
export const THEME_KEY = 'alpstore-theme'

/**
 * Eseguito nel <head> prima del disegno: segna che JS è attivo e applica il tema salvato.
 * Scuro di default. La scelta resta nel browser (localStorage), nessun cookie.
 */
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('${THEME_KEY}');if(t==='light'||t==='dark')d.setAttribute('data-theme',t)}catch(e){}})();`
