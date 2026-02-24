import Lenis from 'lenis';
import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

let lenis;
let isInited = false;

export const initSmoothScrolling = () => {
  if (isInited) return lenis;

  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    infinite: false,
    // 🔥 ДОДАЙТЕ:
    syncTouch: true, // Синхронізація з touch events
    touchMultiplier: 2, // Швидкість touch scroll
  });

  // 🔥 КРИТИЧНО: Правильна інтеграція з GSAP
  lenis.on('scroll', e => {
    // Оновлюємо ScrollTrigger на КОЖНОМУ scroll event
    ScrollTrigger.update();
  });

  // Інтеграція через GSAP ticker
  gsap.ticker.add(time => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // 🔥 ДОДАЙТЕ: Використовуйте Lenis scroll для ScrollTrigger
  ScrollTrigger.defaults({
    scroller: document.body, // Явно вказуємо scroller
  });

  // 🔥 ДОДАЙТЕ: Refresh ScrollTrigger після завантаження контенту
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  // 🔥 ДОДАЙТЕ: Refresh при resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });

  // Контроль
  window.lenis = lenis;
  window.addEventListener('stop-scroll', () => lenis.stop());
  window.addEventListener('start-scroll', () => lenis.start());

  // Якорі
  document.body.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (targetId === '#' || targetId === '#!') return;

    e.preventDefault();
    const target = document.querySelector(targetId);

    if (target) {
      lenis.scrollTo(target, {
        offset: -10,
        duration: 1,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  });

  isInited = true;
  return lenis;
};
