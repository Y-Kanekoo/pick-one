'use client';

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';

const storageEventName = 'pickone-storage';
const getServerSnapshot = () => null;

// ローカルストレージを使った状態管理フック
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [defaultValue] = useState(initialValue);
  const [fallback, setFallback] = useState<{ key: string; value: T } | null>(null);

  const subscribe = useCallback((onStoreChange: () => void) => {
    const handleChange = (event: Event) => {
      if (event instanceof CustomEvent && event.detail === key) {
        onStoreChange();
      }
    };
    window.addEventListener(storageEventName, handleChange);
    return () => window.removeEventListener(storageEventName, handleChange);
  }, [key]);

  const getSnapshot = useCallback(() => {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error(`ローカルストレージからの読み込みに失敗: ${key}`, error);
      return null;
    }
  }, [key]);

  const storedItem = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const storedValue = useMemo(() => {
    if (!storedItem) return defaultValue;
    try {
      return JSON.parse(storedItem) as T;
    } catch (error) {
      console.error(`ローカルストレージからの読み込みに失敗: ${key}`, error);
      return defaultValue;
    }
  }, [defaultValue, key, storedItem]);

  const currentValue = fallback?.key === key ? fallback.value : storedValue;

  // 値を設定
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    const valueToStore = value instanceof Function ? value(currentValue) : value;
    try {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setFallback(null);
      window.dispatchEvent(new CustomEvent(storageEventName, { detail: key }));
    } catch (error) {
      setFallback({ key, value: valueToStore });
      console.error(`ローカルストレージへの保存に失敗: ${key}`, error);
    }
  }, [currentValue, key]);

  return [currentValue, setValue];
}
