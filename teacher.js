const teachers = [
  {
    name: "Ms. Priya Verma",
    subject: "Physics & Chemistry",
    category: "secondary",
    // img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
    img: "logo.png",
    qualification: "Btech-Mtech",
    exp: 25,
  },
  {
    name: "Mr. Arjun Kapoor",
    subject: "Mathematics",
    category: "secondary",
    // img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    img: "logo.png",
    qualification: "Btech-Mtech",
    exp: 25,
  },
  {
    name: "Ms. Sara Iyer",
    subject: "English Literature",
    category: "primary",
    // img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    img: "logo.png",
    qualification: "Btech-Mtech",
    exp: 25,
  },
  {
    name: "Mr. Rahul Singh",
    subject: "Biology",
    category: "senior-secondary",
    // img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    img: "logo.png",
    qualification: "Btech-Mtech",
    exp: 25,
  },
  {
    name: "Ms. Meena Pillai",
    subject: "Fine Arts & Music",
    category: "primary",
    // img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
    img: "logo.png",
    qualification: "Btech-Mtech",
    exp: 25,
  },
  {
    name: "Mr. Dev Nair",
    subject: "Physical Education",
    category: "primary",
    // img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&q=80",
    img: "logo.png",
    qualification: "Btech-Mtech",
    exp: 25,
  },
  {
    name: "Ms. Divya Rajan",
    subject: "Statistics & Accounts",
    category: "senior-secondary",
    // img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
    img: "logo.png",
    qualification: "Btech-Mtech",
    exp: 25,
  },
  {
    name: "Mr. Sanjay Patel",
    subject: "Computer Science",
    category: "senior-secondary",
    // img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
    img: "logo.png",
    qualification: "Btech-Mtech",
    exp: 25,
  },
];

function sortBySubject(data) {
  return data.sort((a, b) => a.subject.localeCompare(b.subject));
}


const teacherscontainer = document.getElementById("teachersContainer");

function displayTeachers(data) {
  teacherscontainer.innerHTML = "";

  data.forEach((teacher, index) => {
    const card = document.createElement("div");
    card.className = "teacher-card reveal";
    card.setAttribute("data-delay", index % 3);
    card.setAttribute("data-category", teacher.category);

    card.innerHTML = `
      <div class="teacher-img">
        <img src="${teacher.img}" alt="${teacher.name}" loading="lazy">
      </div>

      <div class="teacher-info">
        <div class="teacher-name">${teacher.name}</div>
        <div class="teacher-subject">${teacher.subject}</div>
        <div class="teacher-qualification">${teacher.qualification}</div>
        <div class="teacher-exp">exp: ${teacher.exp}+Years</div>
      </div>


    `;

    teacherscontainer.appendChild(card);
  });

  // 🔥 Re-trigger animations (VERY IMPORTANT)
  reApplyReveal();
}

// Initial load
// Initial load
displayTeachers(sortBySubject([...teachers]));

const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    if (filter === "all") {
      displayTeachers(sortBySubject([...teachers]));
    } else {
      const filtered = teachers.filter((t) => t.category === filter);
      displayTeachers(sortBySubject(filtered));
    }
  });
});
function reApplyReveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el, index) => {
    el.classList.remove("active");

    setTimeout(() => {
      el.classList.add("active");
    }, index * 100); // smooth stagger animation 🔥
  });
}
