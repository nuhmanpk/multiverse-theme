// Multiverse preview — open this file and switch variants with ⌘K ⌘T
import { readFile } from 'node:fs/promises';

/** A typed cache with expiry. */
export interface Entry<T> { value: T; expires: number }

const TTL_MS = 60_000;
const pattern = /^user-(\d+)$/gi;

@sealed
export class Cache<T> extends Map<string, Entry<T>> {
  #hits = 0;

  constructor(private readonly name: string, ttl = TTL_MS) {
    super();
  }

  async load(path: string): Promise<T | null> {
    const raw = await readFile(path, 'utf8');
    const data = JSON.parse(raw) as Record<string, T>;
    for (const [key, value] of Object.entries(data)) {
      if (!pattern.test(key)) continue;
      this.set(key, { value, expires: Date.now() + TTL_MS });
    }
    this.#hits++;
    return data[`${this.name}\n`] ?? null; // TODO: handle missing
  }
}

enum Level { Debug = 0, Info, Warn, Error }
export const enabled = true && Level.Warn > 1;
