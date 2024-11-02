/* Menu Side bar */
document.getElementById("menuButton").addEventListener("click", () => {
  const settings = document.querySelector(".settings");
  settings.classList.toggle("show");
  settings.classList.toggle("hide");
});
const reviewForm = document.getElementById("reviewform");
const reviewBox = document.getElementById("reviewbox");
const filterHotel = document.getElementById("filter-hotel");
const filterCity = document.getElementById("filter-city");
const filterStar = document.getElementById("filter-star");
const applyFiltersButton = document.getElementById("applyFilters");

const baseUrl = "https://ww4-assignment.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const reviewForm = document.getElementById("reviewform");
  const reviewBox = document.getElementById("reviewbox");
  const filterHotel = document.getElementById("filter-hotel");
  const filterCity = document.getElementById("filter-city");
  const filterStar = document.getElementById("filter-star");
  const applyFiltersButton = document.getElementById("applyFilters");
  /* Fetch and display reviews */
  async function fetchReviews(filters = {}) {
    try {
      let url = "/reviews";
      const queryParams = new URLSearchParams(filters).toString();
      if (queryParams) url += `?${queryParams}`;
      const response = await fetch(url);
      const reviews = await response.json();

      reviewBox.innerHTML = reviews
        .map(
          (review) => `
          <div class="review">
            <h3>${review.hotel} (${review.city}) - ${review.star} Stars</h3>
            <p>${review.content}</p>
            <p><strong>Reviewer:</strong> ${review.reviewer}</p>
          </div>`
        )
        .join("");
    } catch (error) {
      reviewBox.innerHTML = "Failed to load reviews.";
    }
  }

  fetchReviews();

  /*Submit new review*/
  reviewForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(reviewForm);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch("/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      reviewForm.reset();
      fetchReviews(); // Reload reviews after submission
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  });

  // Apply filters
  applyFiltersButton.addEventListener("click", () => {
    const filters = {
      hotel: filterHotel.value,
      city: filterCity.value,
      star: filterStar.value,
    };
    fetchReviews(filters);
  });
});
