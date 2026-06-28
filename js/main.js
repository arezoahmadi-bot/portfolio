/* --- 1. HIDE NAVBAR ON SCROLL --- */
let lastScroll = window.scrollY;

window.addEventListener("scroll", function () {
  let current = window.scrollY;
  let navbar  = document.getElementById("navbar");

  if (navbar) {
    if (current > lastScroll && current > 60) {
      navbar.style.top = "-70px";  /* hide it */
    } else {
      navbar.style.top = "0";      /* show it */
    }
  }
  lastScroll = current;
});


/* --- 2. LOADING BAR --- */
let progress = 0;
let bar      = document.getElementById("loading-bar");
let loadWrap = document.querySelector(".loading-wrap");

if (bar) {
  let timer = setInterval(function () {
    progress += 2;
    bar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(function () {
        if (loadWrap) loadWrap.style.display = "none";
      }, 600);
    }
  }, 30);
}


/* --- 3. IMAGE SLIDESHOW --- */
let slideIndex = 0;
let slides     = document.querySelectorAll(".slide");

function showSlide(n) {
  /* Remove active from all slides */
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  /* Wrap around if needed */
  slideIndex = (n + slides.length) % slides.length;
  /* Show the current one */
  if (slides[slideIndex]) {
    slides[slideIndex].classList.add("active");
  }
}

function changeSlide(direction) {
  showSlide(slideIndex + direction);
}

/* Start on first slide and auto-advance every 4 seconds */
if (slides.length > 0) {
  showSlide(0);
  setInterval(function () { changeSlide(1); }, 4000);
}


/* --- 4. COUNTDOWN TIMER --- */
/* Change this date to your own graduation or deadline date */
let targetDate = new Date("2026-12-20T00:00:00").getTime();

let daysEl    = document.getElementById("cd-days");
let hoursEl   = document.getElementById("cd-hours");
let minutesEl = document.getElementById("cd-minutes");
let secondsEl = document.getElementById("cd-seconds");

if (daysEl) {
  setInterval(function () {
    let now      = new Date().getTime();
    let distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "0";
      return;
    }

    daysEl.textContent    = Math.floor(distance / (1000 * 60 * 60 * 24));
    hoursEl.textContent   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutesEl.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    secondsEl.textContent = Math.floor((distance % (1000 * 60)) / 1000);
  }, 1000);
}


/* --- 5. CONTACT FORM --- */
function handleContactForm() {
  let name    = document.getElementById("contact-name").value.trim();
  let email   = document.getElementById("contact-email").value.trim();
  let subject = document.getElementById("contact-subject").value;
  let message = document.getElementById("contact-message").value.trim();
  let output  = document.getElementById("form-output");

  /* Check all fields are filled */
  if (!name || !email || !subject || !message) {
    output.textContent = "Please fill in all fields before sending.";
    output.className   = "error";
    return;
  }

  /* Basic email check */
  if (!email.includes("@") || !email.includes(".")) {
    output.textContent = "Please enter a valid email address.";
    output.className   = "error";
    return;
  }

  /* Show success message with user's name */
  output.textContent = "Thank you, " + name + "! Your message has been received. I will reply to " + email + " soon.";
  output.className   = "success";

  /* Clear the form */
  document.getElementById("contact-name").value    = "";
  document.getElementById("contact-email").value   = "";
  document.getElementById("contact-subject").value = "";
  document.getElementById("contact-message").value = "";
}


/* --- 6. QUIZ --- */
function checkQuiz() {
  let radios = document.querySelectorAll('input[name="quiz"]');
  let result = document.getElementById("quiz-result");
  let answer = "";

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      answer = radios[i].value;
    }
  }

  if (!answer) {
    result.textContent = "Please select an answer first!";
    result.style.color = "#b5860d";
    return;
  }

  if (answer === "a") {
    result.textContent = "Correct! OOP stands for Object-Oriented Programming!";
    result.style.color = "#3a7d3a";
  } else {
    result.textContent = "Not quite. The answer is: Object-Oriented Programming.";
    result.style.color = "#b22222";
  }
}


/* --- 7. TOPIC DROPDOWN --- */
function showTopic() {
  let select = document.getElementById("topic-select");
  let output = document.getElementById("topic-output");

  let topics = {
    algorithms: "Algorithms are step-by-step instructions to solve problems. Examples: Merge Sort, Binary Search.",
    databases:  "Databases store organised data. SQL is used for relational databases like MySQL and PostgreSQL.",
    networking: "Networking is how computers communicate using IP addresses, DNS, and HTTP protocols.",
    ai:         "Artificial Intelligence teaches computers to perform tasks that usually need human thinking."
  };

  if (select.value && topics[select.value]) {
    output.textContent = topics[select.value];
  } else {
    output.textContent = "";
  }
}


/* --- 8. PROJECT FILTER --- */
function filterProjects() {
  let checkboxes = document.querySelectorAll(".filter-check");
  let cards      = document.querySelectorAll(".project-card");
  let active     = [];

  /* Build list of checked categories */
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      active.push(checkboxes[i].value);
    }
  }

  /* Show or hide each card */
  for (let i = 0; i < cards.length; i++) {
    let category = cards[i].getAttribute("data-category");
    if (active.includes(category)) {
      cards[i].classList.remove("hidden");
    } else {
      cards[i].classList.add("hidden");
    }
  }
}


/* --- 9. PROJECT SEARCH --- */
function searchProjects() {
  let input  = document.getElementById("search-input").value.trim().toLowerCase();
  let output = document.getElementById("search-output");
  let cards  = document.querySelectorAll(".project-card");
  let count  = 0;

  for (let i = 0; i < cards.length; i++) {
    let text = cards[i].textContent.toLowerCase();
    if (input === "" || text.includes(input)) {
      cards[i].classList.remove("hidden");
      count++;
    } else {
      cards[i].classList.add("hidden");
    }
  }

  output.textContent = input === "" ? "" : count + " project(s) found for \"" + input + "\".";
}


/* --- 10. SKILLS CHART (Chart.js) --- */
let canvas = document.getElementById("skillsChart");

if (canvas) {
  new Chart(canvas, {
    type: "radar",
    data: {
      labels: ["Web Dev", "Python", "Data & ML", "Databases", "Algorithms", "Problem Solving"],
      datasets: [{
        label: "My Skill Level",
        data: [90, 85, 70, 70, 75, 80],
        backgroundColor: "rgba(90,122,74,0.2)",
        borderColor: "#5a7a4a",
        borderWidth: 2,
        pointBackgroundColor: "#5a7a4a"
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { stepSize: 20 }
        }
      }
    }
  });
}