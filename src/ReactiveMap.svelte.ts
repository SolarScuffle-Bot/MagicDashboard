// ambueMapStore.ts
import { writable } from 'svelte/store';

// A typed store that holds a Map<AmbueType, AmbueItem[]>
export default function create<K, V>() {
  // Initialize with an empty Map (or a prefilled one)
  const { subscribe, update } = writable(new Map<K, { items: V[] }>());

  return {
    subscribe,
    // Set or replace the entire map
    set(newMap: Map<K, { items: V[] }>) {
      // Replacing with a new Map reference triggers reactivity
      update(() => newMap);
    },
    // Add or replace items for a particular key
    setItems(key: K, items: V[]) {
      update(m => {
        // mutate the old Map
        m.get(key)!.items = items;
        // return a fresh copy so Svelte sees the change
        return new Map(m);
      });
    },
    // If you want to remove a key
    delete(key: K) {
      update(m => {
        m.delete(key);
        return new Map(m);
      });
    }
  };
}