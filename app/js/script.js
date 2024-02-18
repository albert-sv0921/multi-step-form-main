"strict mode";

// Selectors

// Form
const form = document.querySelector(".form");

// Pages
const page1 = document.querySelector(".page--1");
const page2 = document.querySelector(".page--2");
const page3 = document.querySelector(".page--3");
const page4 = document.querySelector(".page--4");
const page5 = document.querySelector(".page--5");

// Page buttons
const btnNext1 = document.querySelector(".btn-next--1");

const btnPrev2 = document.querySelector(".btn-prev--2");
const btnNext2 = document.querySelector(".btn-next--2");

const btnPrev3 = document.querySelector(".btn-prev--3");
const btnNext3 = document.querySelector(".btn-next--3");

const btnPrev4 = document.querySelector(".btn-prev--4");
const btnNext4 = document.querySelector(".btn-next--4");

const allNextBtns = [...document.querySelectorAll(".btn-next")];
const allPrevBtns = [...document.querySelectorAll(".btn-prev")];

// Sidebar

const sidebarStep1 = document.querySelector(".step--1");
const sidebarStep2 = document.querySelector(".step--2");
const sidebarStep3 = document.querySelector(".step--3");
const sidebarStep4 = document.querySelector(".step--4");

// summary page
const summary = document.querySelector(".summary");
const total = document.querySelector(".total");

//////////////////////////////////////////////////////////////

// btn form forward function
function nextPage(e) {
  if (e.target.classList.contains("btn-next--1")) {
    page1.classList.toggle("none");
    page2.classList.toggle("none");
    sidebarStep1.classList.toggle("active");
    sidebarStep2.classList.toggle("active");
  }
  if (e.target.classList.contains("btn-next--2")) {
    page2.classList.toggle("none");
    page3.classList.toggle("none");
    sidebarStep2.classList.toggle("active");
    sidebarStep3.classList.toggle("active");
  }
  if (e.target.classList.contains("btn-next--3")) {
    page3.classList.toggle("none");
    page4.classList.toggle("none");
    sidebarStep3.classList.toggle("active");
    sidebarStep4.classList.toggle("active");
  }
  if (e.target.classList.contains("btn-next--4")) {
    page4.classList.toggle("none");
    page5.classList.toggle("none");
  }
}

allNextBtns.forEach(() => addEventListener("click", nextPage));

///////////////////////////////////////////////////////////////////

const state = {
  sumbtions: [],
};

class Submition {
  constructor(name, email, phone, plan, duration, addons) {
    this.name = name; // string
    this.email = email; // string
    this.phone = Number(phone); // number
    this.plan = plan; // string ("arcade", "advanced", "pro")
    this.duration = duration; // string ("monthly", "yearly")
    this.addons = addons; // object {"service", "storage", "profile"}
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const { name, email, phone, plan, switch: duration, ...addons } = data;

  let durationMultiplier;
  if (duration === "monthly") durationMultiplier = 1;
  if (duration === "yearly") durationMultiplier = 10;

  let planPrice;
  if (plan === "arcade") planPrice = 9 * durationMultiplier;
  if (plan === "advanced") planPrice = 12 * durationMultiplier;
  if (plan === "pro") planPrice = 15 * durationMultiplier;

  state.sumbtions.push(
    new Submition(name, email, Number(phone), plan, duration, addons)
  );

  const addonServicePrice = addons.service ? 1 * durationMultiplier : 0;
  const addonStoragePrice = addons.storage ? 2 * durationMultiplier : 0;
  const addonProfilePrice = addons.profile ? 2 * durationMultiplier : 0;
  const priceTotal =
    planPrice + addonProfilePrice + addonServicePrice + addonStoragePrice;

  const htmlSummary = `
                <div class="summary__row--1 flex space-between">
                    <div class="flex column space-between">
                      <span>${
                        plan === "arcade"
                          ? "Arcade"
                          : plan === "advanced"
                          ? "Advanced"
                          : "Pro"
                      } (${
    duration === "monthly" ? "Monthly" : "Yearly"
  })</span>
                      <a href="#">Change</a>
                    </div>
                    <div>
                      <span>$${planPrice}/${
    duration === "monthly" ? "mo" : "yr"
  }</span>
                    </div>
                  </div>

                  <div class="summary__row--2">
                    
                    ${
                      addons.service
                        ? `<div class="flex space-between pd-top-small">
                        <span class="coolGray medium spacing-small"
                    >Online service</span
                  >
                  <span class="lightMarineBlue medium spacing-small"
                    >+${duration === "monthly" ? "$1" : "$10"}/${
                            duration === "monthly" ? "mo" : "yr"
                          }</span>
                          </div>`
                        : ""
                    }
                    
                    ${
                      addons.storage
                        ? `<div class="flex space-between pd-top-small">
                          <span class="coolGray medium spacing-small"
                      >Larger storage</span
                    >
                    <span class="lightMarineBlue medium spacing-small"
                      >+${duration === "monthly" ? "$2" : "$20"}/${
                            duration === "monthly" ? "mo" : "yr"
                          }</span>
                            </div>`
                        : ""
                    }

                      ${
                        addons.profile
                          ? `<div class="flex space-between pd-top-small">
                          <span class="coolGray medium spacing-small"
                      >Online service</span
                    >
                    <span class="lightMarineBlue medium spacing-small"
                      >+${duration === "monthly" ? "$2" : "$20"}/${
                              duration === "monthly" ? "mo" : "yr"
                            }</span>
                            </div>`
                          : ""
                      }
                </div>
  `;

  const htmlTotal = `
  <span class="coolGray medium spacing-small">Total (per ${
    duration === "monthly" ? "month" : "year"
  })</span>
  <span class="purplishBlue bold size-medium">+$${priceTotal}/${
    duration === "monthly" ? "mo" : "yr"
  }</span>
  `;

  summary.innerHTML = htmlSummary;
  total.innerHTML = htmlTotal;

  return console.log(state);
});

// btn form backward function

function prevPage(e) {
  if (e.target.classList.contains("btn-prev--2")) {
    page1.classList.toggle("none");
    page2.classList.toggle("none");
    sidebarStep1.classList.toggle("active");
    sidebarStep2.classList.toggle("active");
  }
  if (e.target.classList.contains("btn-prev--3")) {
    page2.classList.toggle("none");
    page3.classList.toggle("none");
    sidebarStep2.classList.toggle("active");
    sidebarStep3.classList.toggle("active");
  }
  if (e.target.classList.contains("btn-prev--4")) {
    page3.classList.toggle("none");
    page4.classList.toggle("none");
    sidebarStep3.classList.toggle("active");
    sidebarStep4.classList.toggle("active");
  }
}

allNextBtns.forEach(() => addEventListener("click", prevPage));

//////////////////////////////////////////////////////////////////////

// duration switch logic
const monthly = document.getElementById("monthly");
const yearly = document.getElementById("yearly");

const arcade = document.getElementById("arcade");
const advanced = document.getElementById("advanced");
const pro = document.getElementById("pro");

const priceAddon1 = document.getElementById("price__addon--1");
const priceAddon2 = document.getElementById("price__addon--2");
const priceAddon3 = document.getElementById("price__addon--3");

monthly.addEventListener("click", (e) => {
  arcade.innerHTML = "<h3>Arcade</h3><p>$9/mo</p>";
  advanced.innerHTML = "<h3>Arcade</h3><p>$12/mo</p>";
  pro.innerHTML = "<h3>Arcade</h3><p>$15/mo</p>";

  priceAddon1.textContent = "+$1/mo";
  priceAddon2.textContent = "+$2/mo";
  priceAddon3.textContent = "+$2/mo";
});

yearly.addEventListener("click", (e) => {
  arcade.innerHTML = "<h3>Arcade</h3><p>$90/yr</p><span>2 month free</span>";
  advanced.innerHTML = "<h3>Arcade</h3><p>$120/yr</p><span>2 month free</span>";
  pro.innerHTML = "<h3>Arcade</h3><p>$150/yr</p><span>2 month free</span>";

  priceAddon1.textContent = "+$10/yr";
  priceAddon2.textContent = "+$20/yr";
  priceAddon3.textContent = "+$20/yr";
});
