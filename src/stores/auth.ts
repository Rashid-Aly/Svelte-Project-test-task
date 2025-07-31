import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const isAuthenticated = writable<boolean>(false);

function hasAuthCookie(): boolean {
  if (!browser) return false;
  
  return document.cookie.split(';').some(cookie => 
    cookie.trim().startsWith('operator_token=')
  );
}

if (browser) {
  isAuthenticated.set(hasAuthCookie());
}

export function getCookie(name: string): string | null {
  if (!browser) return null;
  
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export function checkAuth(): boolean {
  const isAuth = hasAuthCookie();
  isAuthenticated.set(isAuth);
  return isAuth;
}

export function logout() {
  document.cookie = 'operator_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  isAuthenticated.set(false);
}