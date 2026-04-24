// Follow Spark - Clear responsive JavaScript
// CSS handles mobile, tablet, and PC layout.
// JavaScript handles menu behavior and small UX cleanup.

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

function isMobileOrTabletMenu() {
  return window.innerWidth <= 1024;
}

function openMenu() {
  if (!mobileMenu || !menuBtn) return;

  mobileMenu.classList.add("active");
  menuBtn.textContent = "×";
  menuBtn.setAttribute("aria-label", "Close menu");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (!mobileMenu || !menuBtn) return;

  mobileMenu.classList.remove("active");
  menuBtn.textContent = "☰";
  menuBtn.setAttribute("aria-label", "Open menu");
  document.body.style.overflow = "";
}

function toggleMenu() {
  if (!mobileMenu) return;

  const isOpen = mobileMenu.classList.contains("active");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", toggleMenu);

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    // PC par jaate hi mobile menu auto close ho jayega
    if (!isMobileOrTabletMenu()) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    // Escape press karne par menu close
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

// Active link highlight for current page
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((link) => {
  const linkPage = link.getAttribute("href")?.split("#")[0];

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

// Smooth scroll only for same-page hash links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
