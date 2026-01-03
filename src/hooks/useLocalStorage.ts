'use client';

import { useState, useEffect, useCallback } from 'react';

// ローカルストレージを使った状態管理フック
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // 初期値を取得
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // クライアントサイドでのみローカルストレージから読み込み
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`ローカルストレージからの読み込みに失敗: ${key}`, error);
    }
    setIsInitialized(true);
  }, [key]);

  // 値を設定
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`ローカルストレージへの保存に失敗: ${key}`, error);
    }
  }, [key, storedValue]);

  return [isInitialized ? storedValue : initialValue, setValue];
}
