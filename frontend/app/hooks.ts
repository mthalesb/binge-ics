import { useEffect, useState } from "react";

export function useDebounced<T>(_value: T) {
  const [value, setValue] = useState(_value);

  useEffect(() => {
    const time = setTimeout(() => setValue(_value), 300);
    
    return () => clearTimeout(time);
  }, [_value, 300]);

  return value;
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);

      if (raw) setValue(JSON.parse(raw));

    } catch {}

    setReady(true);
  }, [key]);

  useEffect(() => {
    if (ready) localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, ready]);

  return [value, setValue, ready] as const;
}

export function useCopy(ms = 1500) {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => setCopied(false), ms);
  };

  return [copied, copy] as const;
}
