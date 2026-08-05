/**
 * Cursor-follow "hover bubble" effect for card/link elements.
 *
 * Usage: give the card element `.pai-hover-card` (position: relative;
 * overflow: hidden — see globals.css) and put a `.pai-hover-bubble` child
 * inside it:
 *
 *   <a class="pai-hover-card">
 *     <img ... />
 *     <div class="pai-hover-bubble"><span>View</span></div>
 *   </a>
 *
 * Then call `initHoverBubbles()` once the cards are in the DOM (see
 * `useHoverBubbles.ts` for the React wrapper). Framework-agnostic — no
 * React/DOM-framework dependency in this file.
 */

export type HoverBubbleOptions = {
  /** Position lerp factor applied each frame, 0-1 (higher = snappier follow). */
  lerpFactor?: number;
  /** Duration (ms) of the scale/opacity in/out tween. */
  tweenDuration?: number;
};

const DEFAULT_LERP_FACTOR = 0.15;
const DEFAULT_TWEEN_DURATION = 350;
const BUBBLE_SELECTOR = ".pai-hover-bubble";

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export class HoverBubble {
  private readonly card: HTMLElement;
  private readonly bubble: HTMLElement;
  private readonly lerpFactor: number;
  private readonly tweenDuration: number;
  private readonly reduceMotion: boolean;

  // Mouse position, relative to the card, offset so the bubble is centered
  // on the cursor. `current` chases `target` via lerp every frame.
  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;

  // Scale/opacity share one eased 0->1 progress value, tweened over
  // `tweenDuration` using a timestamp (not lerp — lerp never fully settles,
  // and the spec wants a bounded ~300-400ms in/out).
  private progress = 0;
  private tweenFrom = 0;
  private tweenTarget = 0;
  private tweenStart = 0;

  private hovering = false;
  private rafId: number | null = null;

  constructor(card: HTMLElement, options: HoverBubbleOptions = {}) {
    const bubble = card.querySelector<HTMLElement>(BUBBLE_SELECTOR);
    if (!bubble) {
      throw new Error(`HoverBubble: no "${BUBBLE_SELECTOR}" child found inside card element`);
    }
    this.card = card;
    this.bubble = bubble;
    this.lerpFactor = options.lerpFactor ?? DEFAULT_LERP_FACTOR;
    this.tweenDuration = options.tweenDuration ?? DEFAULT_TWEEN_DURATION;
    this.reduceMotion = prefersReducedMotion();

    this.card.addEventListener("mouseenter", this.handleEnter);
    this.card.addEventListener("mousemove", this.handleMove);
    this.card.addEventListener("mouseleave", this.handleLeave);
  }

  destroy(): void {
    this.card.removeEventListener("mouseenter", this.handleEnter);
    this.card.removeEventListener("mousemove", this.handleMove);
    this.card.removeEventListener("mouseleave", this.handleLeave);
    this.stopLoop();
  }

  private pointFromEvent(e: MouseEvent): [number, number] {
    const rect = this.card.getBoundingClientRect();
    const half = (this.bubble.offsetWidth || 115) / 2;
    return [e.clientX - rect.left - half, e.clientY - rect.top - half];
  }

  private handleEnter = (e: MouseEvent): void => {
    this.hovering = true;
    const [x, y] = this.pointFromEvent(e);
    this.targetX = x;
    this.targetY = y;
    this.currentX = x;
    this.currentY = y;

    if (this.reduceMotion) {
      this.progress = 1;
      this.applyStyle(x, y, 1, 1);
      return;
    }

    this.startTween(1);
    this.startLoop();
  };

  private handleMove = (e: MouseEvent): void => {
    if (!this.hovering) return;
    const [x, y] = this.pointFromEvent(e);
    this.targetX = x;
    this.targetY = y;

    if (this.reduceMotion) {
      this.currentX = x;
      this.currentY = y;
      this.applyStyle(x, y, 1, 1);
    }
  };

  private handleLeave = (): void => {
    this.hovering = false;

    if (this.reduceMotion) {
      this.progress = 0;
      this.applyStyle(this.currentX, this.currentY, 0, 0);
      return;
    }

    this.startTween(0);
    this.startLoop();
  };

  private startTween(target: number): void {
    this.tweenFrom = this.progress;
    this.tweenTarget = target;
    this.tweenStart = performance.now();
  }

  private startLoop(): void {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(this.tick);
  }

  private stopLoop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private tick = (now: number): void => {
    this.currentX += (this.targetX - this.currentX) * this.lerpFactor;
    this.currentY += (this.targetY - this.currentY) * this.lerpFactor;

    const t = Math.min((now - this.tweenStart) / this.tweenDuration, 1);
    this.progress = this.tweenFrom + (this.tweenTarget - this.tweenFrom) * easeOutCubic(t);

    this.applyStyle(this.currentX, this.currentY, this.progress, this.progress);

    // Once the mouse has left and the out-tween has fully settled, cancel
    // the loop instead of running forever in the background.
    if (!this.hovering && t >= 1 && this.tweenTarget === 0) {
      this.stopLoop();
      return;
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  private applyStyle(x: number, y: number, scale: number, opacity: number): void {
    this.bubble.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    this.bubble.style.opacity = String(opacity);
  }
}

/**
 * Bulk-initializes `HoverBubble` on every element matching `selector`
 * (default `.pai-hover-card`), each with its own independent state.
 * Returns a dispose function that tears every instance down.
 */
export function initHoverBubbles(selector = ".pai-hover-card"): () => void {
  const cards = Array.from(document.querySelectorAll<HTMLElement>(selector));
  const instances = cards.map((card) => new HoverBubble(card));
  return () => instances.forEach((instance) => instance.destroy());
}
