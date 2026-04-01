// ================= GALLERY DATA =================
const galleryItems = [
  { img: "main1.jpg", category: "events" },
  { img: "main1.jpg", category: "campus" },
  { img: "main1.jpg", category: "sports" },
  { img: "main1.jpg", category: "campus" },
  { img: "main1.jpg", category: "events" },
  { img: "main1.jpg", category: "sports" },
  { img: "main1.jpg", category: "events" },
  { img: "main1.jpg", category: "campus" },
  { img: "main1.jpg", category: "sports" },
];

// ================= CONTAINER =================
const galleryContainer = document.getElementById("galleryContainer");

// ================= DISPLAY FUNCTION =================
function displayGallery(data) {
  galleryContainer.innerHTML = "";

  data.forEach((item, index) => {
    const div = document.createElement("div");

    div.className = "gallery-item reveal";
    div.setAttribute("data-cat", item.category);
    div.style.animationDelay = `${index * 0.1}s`;

    div.innerHTML = `
      <img src="${item.img}" alt="${item.category}" loading="lazy" />
      <div class="gallery-overlay">🔍</div>
    `;

    galleryContainer.appendChild(div);
  });

  reApplyReveal(); // reuse your animation function
}

// ================= INITIAL LOAD =================
displayGallery(galleryItems);

// ================= FILTER =================
const gFilterBtns = document.querySelectorAll(".gallery-filter .filter-btn");

gFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    gFilterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-gfilter");

    if (filter === "all") {
      displayGallery(galleryItems);
    } else {
      const filtered = galleryItems.filter(
        (item) => item.category === filter
      );
      displayGallery(filtered);
    }
  });
});