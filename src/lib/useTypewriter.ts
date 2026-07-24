import { useEffect, useRef, useState } from 'react';

/**
 * Verilen metinleri sırayla harf harf yazıp silen daktilo (typewriter) efekti.
 * `paused` true olduğunda animasyon durur ve o anki metin ekranda kalır —
 * imleç alanın üzerine geldiğinde yazının okunabilmesi için kullanılır.
 */
export function useTypewriter(phrases: string[], paused = false) {
  const [text, setText] = useState('');
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    if (paused || phrases.length === 0) return;

    let timeout = 0;

    const tick = () => {
      const current = phrases[indexRef.current % phrases.length];

      if (!deletingRef.current) {
        charRef.current += 1;
        setText(current.slice(0, charRef.current));

        if (charRef.current >= current.length) {
          deletingRef.current = true;
          timeout = window.setTimeout(tick, 1800);
          return;
        }
        timeout = window.setTimeout(tick, 45 + Math.random() * 45);
        return;
      }

      charRef.current -= 2;
      if (charRef.current <= 0) {
        charRef.current = 0;
        deletingRef.current = false;
        indexRef.current += 1;
        setText('');
        timeout = window.setTimeout(tick, 420);
        return;
      }

      setText(current.slice(0, charRef.current));
      timeout = window.setTimeout(tick, 22);
    };

    timeout = window.setTimeout(tick, 320);
    return () => window.clearTimeout(timeout);
  }, [phrases, paused]);

  return text;
}
