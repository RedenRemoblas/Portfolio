const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());


document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    "Welcome to my portfolio!",
      "I'm a Web Developer.",
      "I'm a Mobile App Developer.",
      "UI/UX Designer."
     
  ]; // Array of texts to be typed
  const typingText = document.getElementById("typing-text");
  let index = 0; // Index for the current text
  let charIndex = 0; // Index for the current character in the text
  let currentText = texts[index]; // Current text to type

  function type() {
      if (charIndex < currentText.length) {
          typingText.textContent += currentText.charAt(charIndex); // Append the next character
          charIndex++;
          setTimeout(type, 100); // Adjust speed by changing the timeout (100ms is a good start)
      } else {
          // Wait for 2 seconds after typing the full text
          setTimeout(() => {
              // Prepare to type the next text
              charIndex = 0; // Reset character index
              index = (index + 1) % texts.length; // Cycle through texts
              currentText = texts[index]; // Update to the next text
              typingText.textContent = ""; // Clear the text before typing again
              type(); // Start typing the new text
          }, 2000); // Wait 2 seconds before changing text
      }
  }

  type(); // Start typing effect
});

// Select all sections
const sections = document.querySelectorAll('section');

// Function to add the animation class when a section is in view
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the 'fade-in' class to the section
      entry.target.classList.add('fade-in');
    } else {
      // Optionally, remove the class if you want to animate again on scroll back
      entry.target.classList.remove('fade-in');
    }
  });
}, {
  threshold: 0.1 // Adjust threshold as needed (0 to 1)
});

// Observe each section
sections.forEach(section => {
  sectionObserver.observe(section);
});


document.addEventListener("DOMContentLoaded", function () {
  // Create an Intersection Observer for project cards
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show"); // Add show class to fade in
        observer.unobserve(entry.target); // Stop observing once animated
      } /* Optional: Remove the else block if you only want to animate once */
      // else {
      //   entry.target.classList.remove("show"); // Remove show class to fade out
      // }
    });
  }, {
    threshold: 0.2 // Trigger when 20% of the element is visible
  });

  // Select all project card elements
  let projectCards = document.querySelectorAll(".project-card");

  // Observe each project card
  projectCards.forEach(card => {
    observer.observe(card);
  });
});

let currentIndex = 0;
  const images = document.querySelectorAll('.grid-image');
  const descriptions = [

    'Wooowww',
    'Jabileee',
    'Pizzaa tapos Honda Civic',

    '@reotutars',
    'First Day of School hahhaa',
    'OGs',
  
    'nakss bonding','eatweell yum','@diko na alam','#bwhaha yung nakatayo baliw'
  ];

  function openModal(image, description) {
    document.getElementById('modal').style.display = 'block';
    updateModal(image.src, description);
    currentIndex = Array.from(images).indexOf(image); // Save current image index
  }

  function closeModal() {
    document.getElementById('modal').style.display = 'none';
  }

  function updateModal(imageSrc, description) {
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalDescription').textContent = description;
  }

  function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
      currentIndex = 0;
    }

    const nextImage = images[currentIndex];
    const nextDescription = descriptions[currentIndex];
    updateModal(nextImage.src, nextDescription);
  }

// Image enlarge modal functionality
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.enlargeable').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      document.getElementById('imageModal').style.display = 'block';
      document.getElementById('modalImg').src = this.src;
      document.getElementById('caption').innerText = this.alt;
    });
  });

  document.getElementById('closeModal').onclick = function() {
    document.getElementById('imageModal').style.display = 'none';
  };

  // Close modal when clicking outside the image
  document.getElementById('imageModal').addEventListener('click', function(event) {
    if (event.target === this) {
      this.style.display = 'none';
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Select both theme toggle buttons
  const toggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-responsive');
  if (toggleBtns.length === 0) return; // Exit if no buttons are found
  
  const body = document.body;

  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    // Update icons for all toggle buttons
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-moon-o');
        icon.classList.add('fa-sun-o');
      }
    });
  }

  // Add event listener to each toggle button
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');

      // Update icons for all toggle buttons
      toggleBtns.forEach(innerBtn => {
         const icon = innerBtn.querySelector('i');
         if (icon) {
            icon.classList.toggle('fa-moon-o', !isDark);
            icon.classList.toggle('fa-sun-o', isDark);
         }
      });

      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  });
});

// Timeline line animation
document.addEventListener("DOMContentLoaded", function () {
  // ... existing modal and theme toggle code ...

  // Timeline line animation
  const timelineContainer = document.querySelector('.timeline-container');

  // Find the last timeline item
  const timelineItems = timelineContainer ? timelineContainer.querySelectorAll('.timeline-item') : [];
  const lastTimelineItem = timelineItems.length > 0 ? timelineItems[timelineItems.length - 1] : null;

  if (!timelineContainer || !lastTimelineItem) return; // Exit if container or last item not found

  let isAnimatingTimeline = false;

  function animateTimelineLine() {
    if (isAnimatingTimeline) return;
    isAnimatingTimeline = true;

    requestAnimationFrame(() => {
      const containerRect = timelineContainer.getBoundingClientRect();
      const lastItemRect = lastTimelineItem.getBoundingClientRect();

      // Calculate the position of the bottom of the last item relative to the top of the container
      const lastItemRelativeBottom = lastItemRect.bottom - containerRect.top;

      // Calculate the distance from the top of the container to the bottom of the viewport
      const distanceToViewportBottom = window.innerHeight - containerRect.top;

      // The animated height of the line should be the distance from the top of the container
      // to the bottom of the viewport, clamped between 0 and the bottom of the last item
      const animatedHeight = Math.max(0, Math.min(lastItemRelativeBottom, distanceToViewportBottom));

      // Calculate the percentage height based on the last item's relative bottom position
      let lineHeightPercentage = 0;
       if (lastItemRelativeBottom > 0) {
          lineHeightPercentage = (animatedHeight / lastItemRelativeBottom) * 100;
       }

      // Clamp the value between 0 and 100 (should already be handled by animatedHeight logic, but safer)
      lineHeightPercentage = Math.max(0, Math.min(100, lineHeightPercentage));

      // Update the CSS variable --line-height
      timelineContainer.style.setProperty('--line-height', lineHeightPercentage + '%');

      isAnimatingTimeline = false;
    });
  }

  // Initial call and add event listener
  // Removed initial call here to rely on scroll/resize listeners below
  window.addEventListener('scroll', animateTimelineLine);
  window.addEventListener('resize', animateTimelineLine); // Also update on resize

  // Trigger animation on load to set the initial line height
  animateTimelineLine();
});

document.addEventListener("DOMContentLoaded", function () {
  // ... existing modal, theme toggle, and timeline animation code ...

  // Timeline View More button functionality
  const viewMoreButtons = document.querySelectorAll('.view-more-btn');

  viewMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const timelineItem = this.closest('.timeline-item');
      if (timelineItem) {
        timelineItem.classList.toggle('expanded');

        // Change button text and icon
        const icon = this.querySelector('i');
        if (timelineItem.classList.contains('expanded')) {
          this.childNodes[0].nodeValue = 'View Less '; // Change text node
          if (icon) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
          }
        } else {
          this.childNodes[0].nodeValue = 'View More '; // Change text node
           if (icon) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
          }
        }
      }
    });
  });
});

// Scroll fade-up animation for timeline items
document.addEventListener("DOMContentLoaded", function() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  // Create an Intersection Observer for timeline items
  const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); // Add show class to fade in
        // Removed unobserve here to allow animation on scroll up/down
      } else {
        entry.target.classList.remove('show'); // Remove show class to fade out when not in view
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible (adjust as needed)
  });

  // Observe each timeline item
  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });

  // Removed the initial showTimelineItems() call and associated scroll/load listeners
  // The IntersectionObserver handles the initial view and subsequent scrolling

});