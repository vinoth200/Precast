//Script for slidebar toggle
const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.querySelector("#sidebar-close");
const menu = document.querySelector(".menu-content");
const menuItems = document.querySelectorAll(".submenu-item");
const subMenuTitles = document.querySelectorAll(".submenu .menu-title");

sidebarClose.addEventListener("click", () => sidebar.classList.toggle("close"));

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    menu.classList.add("submenu-active");
    item.classList.add("show-submenu");
    menuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show-submenu");
      }
    });
  });
});

subMenuTitles.forEach((title) => {
  title.addEventListener("click", () => {
    menu.classList.remove("submenu-active");
  });
});

console.log(menuItems, subMenuTitles);
// End of Slide Bar


// Main Page small card

document.addEventListener('DOMContentLoaded', function() {

  // Function to load precast data for a specific project
  function loadPrecastData(projectId) {
    fetch(`/get_precast/${projectId}/`)
        .then(response => response.json())
        .then(data => {
            const precastContainer = document.querySelector('.precast-container');
            precastContainer.innerHTML = '';

           // Inside the JavaScript code where you handle fetching and displaying card data
           data.forEach(item => {
           if (!item || !item.precast_number) {
            return;
          }
          let colorStyle = "";
          if (item.Yet_to_start) {
            colorStyle = "background-color: yellow;";
          } else if (item.Design_done) {
            colorStyle = "background-color: rgb(118, 238, 118);";
          } else if (item.Precast_done) {
            colorStyle = "background-color: orange;";
          } else if (item.Moving_to_site) {
            colorStyle = "background-color: rgb(218, 78, 78);";
          }
          
          const card = document.createElement("div");
          card.classList.add("card");
          card.style.cssText = `width: 3rem; height: 2.5rem; justify-content: center; align-items: center; ${colorStyle}`;
          card.innerHTML = `<h4>${item.precast_number}</h4>`;
          
          const imageElement = new Image();
          imageElement.classList.add("hover-image");
          
          const imagePath = item.image;
          if (imagePath) {
            imageElement.src = imagePath.startsWith('uploads/') ? `/media/${imagePath}` : imagePath;
          } else {
            imageElement.src = "/static/images/default-image.jpg"; // Provide a default image URL
          }
          
          card.appendChild(imageElement);
          precastContainer.appendChild(card);
        });
      });
    }     

  // Function to load precast data for the first project
  function loadPrecastForFirstProject() {
    const firstProjectLink = document.querySelector('.project-link');

    if (firstProjectLink) {
      const projectId = firstProjectLink.dataset.projectId;
      loadPrecastData(projectId);
    }
  }

  // Load precast data for the first project on page load
  loadPrecastForFirstProject();

  // Add event listeners for project links
  const projectLinks = document.querySelectorAll('.project-link');

  projectLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      const projectId = this.dataset.projectId;
      loadPrecastData(projectId);
    });
  });
});


//Jquery for image display on small card hover

$(document).ready(function() {
  $(".card-container").on("mouseenter", ".card", function() {
    var cardImageSrc = $(this).find("img").attr("src"); // Get the image source

    var enlargedCard = $("<div class='enlarged-card'><img src='" + cardImageSrc + "' alt='No Image Uploded'></div>");

    var cardPosition = $(this).position(); // Get the position of the hovered card
    var cardWidth = $(this).outerWidth(); // Get the width of the hovered card

    var topPosition = cardPosition.top;
    var leftPosition = cardPosition.left + cardWidth + 10; // Adjust the offset as needed

    enlargedCard.css({
      top: topPosition,
      left: leftPosition,
    });

    $(".card-container").append(enlargedCard);
  });

  $(".card-container").on("mouseleave", ".card", function() {
    $(".enlarged-card").remove();
  });
});

    
    