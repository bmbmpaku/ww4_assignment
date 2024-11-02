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

  app.get("/stars", async function (request, response) {
    /* select all of the books*/
    const result = await db.query("SELECT * FROM reviews");
    const reviews = result.rows;
    // send the books to the client //
    response.json(books);
    console.log(response.json(books));
  });
  async function fetchReviews() {
    try {
      // Fetch reviews from the server//
      const response = await fetch("/reviews");
      // Parse the response JSON
      const reviews = await response.json();

      // Get the reviewBox element//
      const reviewBox = document.getElementById("reviewbox");

      // Update reviewBox with the fetched reviews//
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
      console.error("Failed to load reviews:", error);
      reviewBox.innerHTML = "Failed to load reviews.";
    }
  }

  // Fetch reviews when the page content is loaded
  document.addEventListener("DOMContentLoaded", fetchReviews);

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
