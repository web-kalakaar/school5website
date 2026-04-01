const achievers = [
    {
        name: "Aisha Khan",
        class: "12",
        subject: "science",
        year: "2025-26",
        score: 98.6,
        img: "logo.png", // achievement: "AIR 12 in JEE Advanced. IIT Bombay CS",
    },
    {
        name: "Rohan Gupta",
        class: "12",
        subject: "arts",
        year: "2025-26",
        score: 97.8,
        img: "logo.png", // achievement: "Olympiad Champion. AIIMS Delhi",
    },
    {
        name: "Sneha Rao",
        class: "10",
        year: "2025-26",
        score: 96.2,
        img: "logo.png", // achievement: "National Painting Winner",
    },
    {
        name: "Aryan Mehta",
        class: "10",
        year: "2024-25",
        score: 94.5,
        img: "logo.png", // achievement: "State Football Champion",
    },
    {
        name: "Aisha Khan",
        class: "12",
        subject: "science",
        year: "2025-26",
        score: 98.6,
        img: "logo.png", // achievement: "AIR 12 in JEE Advanced. IIT Bombay CS",
    },
    {
        name: "Rohan Gupta",
        class: "12",
        subject: "arts",
        year: "2025-26",
        score: 97.8,
        img: "logo.png", // achievement: "Olympiad Champion. AIIMS Delhi",
    },
    {
        name: "Sneha Rao",
        class: "10",
        year: "2025-26",
        score: 96.2,
        img: "logo.png", // achievement: "National Painting Winner",
    },
    {
        name: "Aryan Mehta",
        class: "10",
        year: "2024-25",
        score: 94.5,
        img: "logo.png", // achievement: "State Football Champion",
    },{
        name: "Aisha Khan",
        class: "12",
        subject: "science",
        year: "2025-26",
        score: 98.6,
        img: "logo.png", // achievement: "AIR 12 in JEE Advanced. IIT Bombay CS",
    },
    {
        name: "Rohan Gupta",
        class: "12",
        subject: "arts",
        year: "2025-26",
        score: 97.8,
        img: "logo.png", // achievement: "Olympiad Champion. AIIMS Delhi",
    },
    {
        name: "Sneha Rao",
        class: "10",
        year: "2025-26",
        score: 96.2,
        img: "logo.png", // achievement: "National Painting Winner",
    },
    {
        name: "Aryan Mehta",
        class: "10",
        year: "2024-25",
        score: 94.5,
        img: "logo.png", // achievement: "State Football Champion",
    },{
        name: "Aisha Khan",
        class: "12",
        subject: "science",
        year: "2025-26",
        score: 98.6,
        img: "logo.png", // achievement: "AIR 12 in JEE Advanced. IIT Bombay CS",
    },
    {
        name: "Rohan Gupta",
        class: "12",
        subject: "arts",
        year: "2025-26",
        score: 97.8,
        img: "logo.png", // achievement: "Olympiad Champion. AIIMS Delhi",
    },
    {
        name: "Sneha Rao",
        class: "10",
        year: "2025-26",
        score: 96.2,
        img: "logo.png", // achievement: "National Painting Winner",
    },
    {
        name: "Aryan Mehta",
        class: "10",
        year: "2024-25",
        score: 94.5,
        img: "logo.png", // achievement: "State Football Champion",
    },{
        name: "Aisha Khan",
        class: "12",
        subject: "science",
        year: "2025-26",
        score: 98.6,
        img: "logo.png", // achievement: "AIR 12 in JEE Advanced. IIT Bombay CS",
    },
    {
        name: "Rohan Gupta",
        class: "12",
        subject: "arts",
        year: "2025-26",
        score: 97.8,
        img: "logo.png", // achievement: "Olympiad Champion. AIIMS Delhi",
    },
    {
        name: "Sneha Rao",
        class: "10",
        year: "2025-26",
        score: 96.2,
        img: "logo.png", // achievement: "National Painting Winner",
    },
    {
        name: "Aryan Mehta",
        class: "10",
        year: "2024-25",
        score: 94.5,
        img: "logo.png", // achievement: "State Football Champion",
    },
];

function sortAchievers(data) {
    return data.sort((a, b) => {
        // Sort by year (latest first)
        if (a.year !== b.year) {
            return b.year.localeCompare(a.year);
        }
        // Then by score (highest first)
        return b.score - a.score;
    });
}

const container = document.getElementById("achieversContainer");

function displayAchievers(data) {
    container.innerHTML = "";

    const sorted = sortAchievers([...data]);

    // Separate class 10 & 12
    const class10 = sorted.filter((a) => a.class === "10");
    const class12 = sorted.filter((a) => a.class === "12");

    createSection("Class 12 Achievers", class12);
    createSection("Class 10 Achievers", class10);
}

function createSection(title, list) {
    if (list.length === 0) return;

    const section = document.createElement("div");

    section.innerHTML = `
    <h3 class="achiever-heading">${title}</h3>
    <div class="achievers-grid"></div>
  `;

    const grid = section.querySelector(".achievers-grid");

    list.forEach((a, index) => {
        const card = document.createElement("div");
        card.className = "achiever-card reveal";
        card.style.animationDelay = `${index * 0.1}s`;

        if (a.class == 12) {
            card.innerHTML = `

      <div class="achiever-img">
        <img src="${a.img}" alt="${a.name}">
      </div>

      <div class="achiever-name">${a.name}</div>

      <div class="achiever-class">
        ${a.class}th-${a.subject} • ${a.year}
      </div>

      <div class="achiever-score">${a.score}%</div>

      
    `;
        } else {
            card.innerHTML = `

      <div class="achiever-img">
        <img src="${a.img}" alt="${a.name}">
      </div>

      <div class="achiever-name">${a.name}</div>

      <div class="achiever-class">
        ${a.class}th • ${a.year}
      </div>

      <div class="achiever-score">${a.score}%</div>

      
    `;
        }

        grid.appendChild(card);
    });

    container.appendChild(section);
}
displayAchievers(achievers);
