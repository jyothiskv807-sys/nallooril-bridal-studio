/**
 * Nallooril Salon and Bridal Studio
 * Editorial Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
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
    anchor.addEventListener('click', function(e) {
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
});
