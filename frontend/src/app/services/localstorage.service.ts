import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() {}

  // Set item in both localStorage and sessionStorage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    sessionStorage.setItem(key, value);
  }

  // Get item from sessionStorage first, fallback to localStorage
  getItem(key: string): string | null {
    return sessionStorage.getItem(key) || localStorage.getItem(key);
  }

  // Remove item from both storages
  removeItem(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  // Clear all storage (optional use)
  clear(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
