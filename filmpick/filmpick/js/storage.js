/* ============================================
   storage.js — Gestión de localStorage
   - Usuarios (multi-usuario simple)
   - Favoritos
   - Películas vistas
   - Historial de búsquedas
   ============================================ */

const Storage = (() => {
  const KEY_USER = 'filmpick_user';
  const KEY_DATA = 'filmpick_data';

  function getUser() {
    return localStorage.getItem(KEY_USER) || null;
  }

  function setUser(name) {
    localStorage.setItem(KEY_USER, name);
  }

  function clearUser() {
    localStorage.removeItem(KEY_USER);
  }

  function getAllData() {
    try {
      return JSON.parse(localStorage.getItem(KEY_DATA)) || {};
    } catch {
      return {};
    }
  }

  function getUserData() {
    const user = getUser();
    if (!user) return { favorites: [], watched: [], history: [] };
    const all = getAllData();
    return all[user] || { favorites: [], watched: [], history: [] };
  }

  function saveUserData(data) {
    const user = getUser();
    if (!user) return;
    const all = getAllData();
    all[user] = data;
    localStorage.setItem(KEY_DATA, JSON.stringify(all));
  }

  function toggleFavorite(movieId) {
    const data = getUserData();
    const idx = data.favorites.indexOf(movieId);
    if (idx >= 0) data.favorites.splice(idx, 1);
    else data.favorites.push(movieId);
    saveUserData(data);
    return idx < 0; // true if added
  }

  function isFavorite(movieId) {
    return getUserData().favorites.includes(movieId);
  }

  function toggleWatched(movieId) {
    const data = getUserData();
    const idx = data.watched.indexOf(movieId);
    if (idx >= 0) data.watched.splice(idx, 1);
    else data.watched.push(movieId);
    saveUserData(data);
    return idx < 0;
  }

  function isWatched(movieId) {
    return getUserData().watched.includes(movieId);
  }

  function getFavorites() {
    return getUserData().favorites;
  }

  function getWatched() {
    return getUserData().watched;
  }

  return {
    getUser, setUser, clearUser,
    toggleFavorite, isFavorite,
    toggleWatched, isWatched,
    getFavorites, getWatched
  };
})();
