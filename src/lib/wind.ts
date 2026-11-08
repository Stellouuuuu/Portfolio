/** The wind shared by the tree and the petals: a slow gust plus whatever the cursor stirs up. */
export interface Wind {
  /** Horizontal push, from the gust and the cursor. */
  gust: number;
  /** Cursor position in the viewport, far away until the pointer moves. */
  x: number;
  y: number;
}

export function createWind() {
  const state: Wind = { gust: 0, x: -999, y: -999 };
  let mouseWind = 0;
  let lastX: number | null = null;

  const onMove = (event: PointerEvent) => {
    if (lastX !== null) {
      mouseWind = Math.max(-2.6, Math.min(2.6, mouseWind + (event.clientX - lastX) * 0.012));
    }
    lastX = event.clientX;
    state.x = event.clientX;
    state.y = event.clientY;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  return {
    state,
    /** Advance the wind to time `t` (seconds). Call once per frame. */
    step(t: number): void {
      mouseWind *= 0.965;
      state.gust = Math.sin(t * 0.33) * 0.55 + Math.sin(t * 0.87 + 1.3) * 0.22 + mouseWind;
    },
    destroy(): void {
      window.removeEventListener('pointermove', onMove);
    },
  };
}
