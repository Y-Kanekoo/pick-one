import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useLocalStorage } from '@/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    const storage: Storage = {
      get length() { return values.size; },
      clear: () => values.clear(),
      getItem: (key) => values.get(key) ?? null,
      key: (index) => [...values.keys()][index] ?? null,
      removeItem: (key) => { values.delete(key); },
      setItem: (key, value) => { values.set(key, value); },
    };
    Object.defineProperty(window, 'localStorage', { configurable: true, value: storage });
  });

  it('保存済みの値を読み込み、更新した値を保存する', () => {
    window.localStorage.setItem('selection', JSON.stringify(['昼食']));
    const { result } = renderHook(() => useLocalStorage<string[]>('selection', []));

    expect(result.current[0]).toEqual(['昼食']);
    act(() => result.current[1]((previous) => [...previous, '夕食']));

    expect(result.current[0]).toEqual(['昼食', '夕食']);
    expect(JSON.parse(window.localStorage.getItem('selection') ?? 'null')).toEqual(['昼食', '夕食']);
  });

  it('キーが変わったときは新しいキーの値を読む', () => {
    window.localStorage.setItem('first', JSON.stringify('最初'));
    window.localStorage.setItem('second', JSON.stringify('次'));
    const { result, rerender } = renderHook(
      ({ storageKey }) => useLocalStorage(storageKey, ''),
      { initialProps: { storageKey: 'first' } },
    );

    expect(result.current[0]).toBe('最初');
    rerender({ storageKey: 'second' });
    expect(result.current[0]).toBe('次');
  });
});
