import { gsap, ScrollTrigger, SplitText } from 'gsap/all';
import { initSmoothScrolling } from './scroll/leniscroll';

gsap.registerPlugin(ScrollTrigger, SplitText);
initSmoothScrolling();

function showMobileMenu() {
  // refs.closeButton.classList.remove('hidden');
  // refs.burgerButton.classList.add('hidden');
  // refs.mobileMenu.classList.add('visible');
  // refs.mobileWrapper.classList.add('visible');
  // document.body.style.overflow = 'hidden';
}

function hideMobileMenu() {
  // refs.closeButton.classList.add('hidden');
  // refs.burgerButton.classList.remove('hidden');
  // refs.mobileMenu.classList.remove('visible');
  // refs.mobileWrapper.classList.remove('visible');
  // document.body.style.overflow = '';
}
