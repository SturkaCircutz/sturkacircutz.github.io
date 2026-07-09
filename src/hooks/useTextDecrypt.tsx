'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect
} from 'react';

const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const TEXT_TOKEN_PATTERN = /(\s+|[A-Za-z0-9]+|[^A-Za-z0-9\s]+)/g;
const LETTER_PATTERN = /^[A-Za-z0-9]$/;
const SKIP_TAGS = new Set([
  'script',
  'style',
  'noscript',
  'svg',
  'path',
  'rect',
  'circle',
  'line',
  'polyline',
  'polygon',
  'input',
  'textarea',
  'select',
  'option',
  'canvas',
  'video',
  'audio',
  'br'
]);

type DecryptElementProps = {
  children?: ReactNode;
  'data-no-decrypt'?: boolean | string;
};

type LetterFrame = {
  element: HTMLElement;
  original: string;
  startAt: number;
  endAt: number;
  nextAt: number;
};

type WordAnimation = {
  frame: number;
  letters: LetterFrame[];
};

function randomChar() {
  return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
}

function splitText(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const tokens = text.match(TEXT_TOKEN_PATTERN) ?? [text];

  tokens.forEach((token, tokenIndex) => {
    if (!token || /^\s+$/.test(token) || !/[A-Za-z0-9]/.test(token)) {
      nodes.push(token);
      return;
    }

    nodes.push(
      <span className="decrypt-word" data-decrypt-word key={`${keyPrefix}-w-${tokenIndex}`}>
        {Array.from(token).map((character, characterIndex) => {
          if (!LETTER_PATTERN.test(character)) {
            return character;
          }

          return (
            <span
              className="decrypt-letter"
              data-decrypt-letter
              data-original={character}
              key={`${keyPrefix}-l-${tokenIndex}-${characterIndex}`}
            >
              {character}
            </span>
          );
        })}
      </span>
    );
  });

  return nodes;
}

function decryptNode(node: ReactNode, keyPrefix: string): ReactNode {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return node;
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return splitText(String(node), keyPrefix);
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => decryptNode(child, `${keyPrefix}-${index}`));
  }

  if (!isValidElement(node)) {
    return node;
  }

  const element = node as ReactElement<DecryptElementProps>;
  const elementType = element.type;

  if (
    element.props['data-no-decrypt'] ||
    (typeof elementType === 'string' && SKIP_TAGS.has(elementType))
  ) {
    return element;
  }

  if (!('children' in element.props)) {
    return element;
  }

  return cloneElement(
    element,
    undefined,
    Children.map(element.props.children, (child, index) => decryptNode(child, `${keyPrefix}-${index}`))
  );
}

function restoreWord(word: HTMLElement, activeAnimations: WeakMap<HTMLElement, WordAnimation>) {
  const active = activeAnimations.get(word);

  if (active) {
    cancelAnimationFrame(active.frame);
    active.letters.forEach(({ element, original }) => {
      element.textContent = original;
    });
    activeAnimations.delete(word);
  }

  word.classList.remove('is-active');
  word.style.removeProperty('--decrypt-word-width');
  word.querySelectorAll<HTMLElement>('[data-decrypt-letter]').forEach(letter => {
    letter.textContent = letter.dataset.original ?? letter.textContent ?? '';
    letter.style.removeProperty('--decrypt-letter-width');
  });
}

function freezeWordMetrics(word: HTMLElement) {
  const wordWidth = word.getBoundingClientRect().width;
  word.style.setProperty('--decrypt-word-width', `${wordWidth}px`);

  word.querySelectorAll<HTMLElement>('[data-decrypt-letter]').forEach(letter => {
    const letterWidth = letter.getBoundingClientRect().width;
    letter.style.setProperty('--decrypt-letter-width', `${letterWidth}px`);
  });

  word.classList.add('is-active');
}

function animateWord(word: HTMLElement, activeAnimations: WeakMap<HTMLElement, WordAnimation>) {
  restoreWord(word, activeAnimations);
  freezeWordMetrics(word);

  const now = performance.now();
  const letters = Array.from(word.querySelectorAll<HTMLElement>('[data-decrypt-letter]')).map(element => {
    const startAt = now + Math.random() * 60;
    return {
      element,
      original: element.dataset.original ?? element.textContent ?? '',
      startAt,
      endAt: startAt + 220 + Math.random() * 120,
      nextAt: startAt
    };
  });

  if (letters.length === 0) {
    return;
  }

  const tick = (time: number) => {
    let done = true;

    letters.forEach(letter => {
      if (time < letter.startAt) {
        done = false;
        return;
      }

      if (time >= letter.endAt) {
        if (letter.element.textContent !== letter.original) {
          letter.element.textContent = letter.original;
        }
        return;
      }

      done = false;
      if (time >= letter.nextAt) {
        letter.element.textContent = randomChar();
        letter.nextAt = time + 20 + Math.random() * 20;
      }
    });

    if (done) {
      restoreWord(word, activeAnimations);
      return;
    }

    const active = activeAnimations.get(word);
    if (active) {
      active.frame = requestAnimationFrame(tick);
    }
  };

  activeAnimations.set(word, {
    frame: requestAnimationFrame(tick),
    letters
  });
}

function closestWord(target: EventTarget | null, root: HTMLElement) {
  if (!(target instanceof Element)) {
    return null;
  }

  const word = target.closest<HTMLElement>('[data-decrypt-word]');
  return word && root.contains(word) ? word : null;
}

export function DecryptText({ children }: { children: ReactNode }) {
  return <>{decryptNode(children, 'decrypt')}</>;
}

export function useTextDecrypt(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const activeAnimations = new WeakMap<HTMLElement, WordAnimation>();

    const handlePointerOver = (event: PointerEvent) => {
      const word = closestWord(event.target, root);

      if (!word || (event.relatedTarget instanceof Node && word.contains(event.relatedTarget))) {
        return;
      }

      animateWord(word, activeAnimations);
    };

    const handlePointerOut = (event: PointerEvent) => {
      const word = closestWord(event.target, root);

      if (!word || (event.relatedTarget instanceof Node && word.contains(event.relatedTarget))) {
        return;
      }

      restoreWord(word, activeAnimations);
    };

    root.addEventListener('pointerover', handlePointerOver);
    root.addEventListener('pointerout', handlePointerOut);

    return () => {
      root.removeEventListener('pointerover', handlePointerOver);
      root.removeEventListener('pointerout', handlePointerOut);
      root.querySelectorAll<HTMLElement>('[data-decrypt-word]').forEach(word => {
        restoreWord(word, activeAnimations);
      });
    };
  }, [rootRef]);
}
