const counters = document.querySelectorAll(".counter");
const section = document.querySelector("#realisations");

let hasStarted = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !hasStarted) {
      hasStarted = true;

      counters.forEach((counter) => {
        const target = Number(counter.dataset.target);
        const duration = 1000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const easedProgress = 1 - Math.pow(1 - progress, 3);

          counter.textContent = Math.floor(
            easedProgress * target
          );

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }

        requestAnimationFrame(updateCounter);
      });

      observer.disconnect();
    }
  });
}, {
  threshold: 0.3
});

observer.observe(section);