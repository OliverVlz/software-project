import { Injectable, signal } from '@angular/core';
import { SuperHeroResponse, SearchResponse } from '../interfaces/superhero.interface';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos

  public cacheHits = signal<number>(0);
  public cacheMisses = signal<number>(0);

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresIn: ttl
    };
    this.cache.set(key, cacheItem);
  }

  get<T>(key: string): T | null {
    const cacheItem = this.cache.get(key);

    if (!cacheItem) {
      this.cacheMisses.update(count => count + 1);
      return null;
    }

    const now = Date.now();
    const isExpired = now - cacheItem.timestamp > cacheItem.expiresIn;

    if (isExpired) {
      this.cache.delete(key);
      this.cacheMisses.update(count => count + 1);
      return null;
    }

    this.cacheHits.update(count => count + 1);
    return cacheItem.data;
  }

  clear(): void {
    this.cache.clear();
    this.cacheHits.set(0);
    this.cacheMisses.set(0);
  }

  getStats() {
    return {
      hits: this.cacheHits(),
      misses: this.cacheMisses(),
      size: this.cache.size,
      hitRate: this.cacheHits() / (this.cacheHits() + this.cacheMisses()) * 100
    };
  }
}
