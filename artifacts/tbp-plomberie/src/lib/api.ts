// In production, VITE_API_URL points to the deployed backend (e.g. https://api.plombier-electricien-dordogne.fr).
// In local dev, it's unset and requests go through the Vite proxy at BASE_URL + api/.
const apiBase = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : `${import.meta.env.BASE_URL}api`;

export function apiUrl(path: string): string {
  return `${apiBase}/${path.replace(/^\//, '')}`;
}
