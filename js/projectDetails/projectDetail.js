import { initializeMobileNavigation } from "../home/mobileNavigation.js";
import { initializeFlowerBurst } from "../components/flowerBurst.js";
import { initializeLogoCursor } from "../home/logoCursor.js";

initializeMobileNavigation();
initializeFlowerBurst();
initializeLogoCursor();

const backToGrid = document.querySelector(".back-to-grid");
const savedCategory = sessionStorage.getItem("portfolio-category");

if (backToGrid && savedCategory) {
    backToGrid.href = `portfolio.html?category=${encodeURIComponent(savedCategory)}`;
}
