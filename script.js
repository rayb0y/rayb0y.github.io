const wheel = document.getElementById("wheel");
let currentSection = 0; // Track the current section
const sections = 4; // Total number of sections

// Function to rotate the wheel
function rotateWheel() {
  const rotationAngle = -currentSection * 90; // Rotate 90 degrees for each section
  wheel.style.transition = "transform 0.7s ease"; // Add a transition effect
  wheel.style.transform = `rotateY(${rotationAngle}deg)`; // Apply the rotation
  updateSectionId(); // Call to update the section ID display
  startWorkAnimations(); // Check if the Work section is visible and start animations
}

// Handle mouse wheel scrolling
window.addEventListener("wheel", (event) => {
  event.preventDefault(); // Prevent default scrolling behavior

  if (event.deltaY > 0) {
    // Scroll down
    currentSection = (currentSection + 1) % sections; // Move to the next section
  } else {
    // Scroll up
    currentSection = (currentSection - 1 + sections) % sections; // Move to the previous section
  }

  resetAnimations(); // Reset animations before starting them again
  rotateWheel(); // Call rotate function
});

// Handle arrow key navigation
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    // Down or right arrow key
    currentSection = (currentSection + 1) % sections; // Move to the next section
    rotateWheel(); // Call rotate function
  } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    // Up or left arrow key
    currentSection = (currentSection - 1 + sections) % sections; // Move to the previous section
    rotateWheel(); // Call rotate function
  }
});

// Function to update the current section ID display
function updateSectionId() {
  const sectionIds = ["Home", "Work", "Film", "Get in Touch"];
  const sectionIdElement = document.getElementById("current-section-id");
  if (sectionIdElement) {
    sectionIdElement.textContent = sectionIds[currentSection]; // Update text content based on the current section
  }
}

// Function to start animations if the Work section is visible
function startWorkAnimations() {
  const sectionIds = ["Home", "Work", "Film", "Get in Touch"];
  if (sectionIds[currentSection] === "Work") {
    const workLeftElements = document.querySelectorAll(
      "#work .work-left p, #work .work-left ul li"
    );
    workLeftElements.forEach((element, index) => {
      element.style.animation = `fadeInUp 1s ease forwards ${index * 0.2}s`;
    });
  }
}

// Function to reset animations
function resetAnimations() {
  const animatedElements = document.querySelectorAll(
    "#work .work-left p, #work .work-left ul li"
  );
  animatedElements.forEach((element) => {
    element.style.animation = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const workLeftElements = document.querySelectorAll(
    "#work .work-left p, #work .work-left ul li"
  );
  workLeftElements.forEach((element) => {
    element.style.opacity = 0; // Initial state for fade-in
    element.style.animation = "none"; // Ensure animations do not run on load
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const filmPosters = document.querySelectorAll(".film-left img");

  filmPosters.forEach((poster) => {
    poster.addEventListener("click", (event) => {
      const link = poster.getAttribute("data-link");
      window.open(link, "_blank");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const filmPosters = document.querySelectorAll(".film-left img");
  const description = document.querySelector(".description");

  const descriptions = {
    "WakeUpPoster.jpg":
      "My first film. This short film asks you to vote. Watch now.",
    "WYSITDposter.jpg":
      "What did they see in the dark? Nominated for Kalakari International Film Festival, Liftoff Online Pinewood Studios, and won Best Cinematography and Best Film (3rd) at VIT Film Festival. Watch now.",
    "everythingokposterjpg.jpg": "Everything is ok. Watch now.",
  };

  filmPosters.forEach((poster) => {
    poster.addEventListener("mouseover", (event) => {
      const posterSrc = event.target.src.split("/").pop();
      if (descriptions[posterSrc]) {
        description.classList.add("hidden");
        setTimeout(() => {
          description.textContent = descriptions[posterSrc];
          description.classList.remove("hidden");
        }, 300);
      }
    });

    poster.addEventListener("mouseout", () => {
      description.classList.add("hidden");
      setTimeout(() => {
        description.textContent =
          "As Coordinator of the KIIT Film Society, I have led a team of 100 to revamp and solidify the society’s national standing among reputed universities. Written, directed and edited films. \nHover over posters for more information.";
        description.classList.remove("hidden");
      }, 200);
    });
  });
});
