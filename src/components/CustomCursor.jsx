import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

export default function CustomCursor() {
  return null;
}
