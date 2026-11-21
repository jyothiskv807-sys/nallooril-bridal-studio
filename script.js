/**
 * Nallooril Salon and Bridal Studio
 * Editorial Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ultra-Minimal Luxury Preloader Dismissal (1.5s active + 0.45s smooth fade-out)
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const dismissPreloader = () => {
      preloader.classList.add('preloader-fade-out');
      document.body.classList.remove('preloader-active');
      document.body.style.overflow = '';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 450);
    };

    setTimeout(dismissPreloader, 1500);
  }

  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky Header elevation on scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Drawer Toggle
  const toggleMobileMenu = (forceClose = false) => {
    const isOpen = forceClose ? true : mobileToggle.classList.contains('active');

    if (isOpen) {
      mobileToggle.classList.remove('active');
      mobileDrawer.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    } else {
      if (header) {
        mobileDrawer.style.top = `${header.offsetHeight}px`;
      }
      mobileToggle.classList.add('active');
      mobileDrawer.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());

    // Close when clicking mobile links
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(true);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleMobileMenu(true);
      }
    });
  }

  // Smooth scroll with header height compensation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile Services Accordion (< 768px)
  const accordionCards = document.querySelectorAll('.service-category-card');
  accordionCards.forEach(card => {
    const trigger = card.querySelector('.service-accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      // Accordion only operates on mobile screens (< 768px)
      if (window.innerWidth >= 768) return;

      const isOpen = card.classList.contains('is-open');

      if (isOpen) {
        card.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        // Collapse all other accordion cards
        accordionCards.forEach(c => {
          c.classList.remove('is-open');
          const btn = c.querySelector('.service-accordion-trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        // Expand clicked card
        card.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
