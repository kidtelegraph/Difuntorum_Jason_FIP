const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');
const detailContainer = document.getElementById("detail-list");

navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute("data-visible");

    if (visibility === "false") {
        primaryNav.setAttribute("data-visible", "true");
        navToggle.setAttribute('aria-expanded', "true");
    } else if (visibility === "true") {
        primaryNav.setAttribute("data-visible", "false");
        navToggle.setAttribute('aria-expanded', "false");
    }
});


const details = [{
    title: "The Athlete",
    description: "This flavor is tailored for the sporty and active individuals who seek a refreshing and light beverage after their physical activities. It may have a crisp and clean taste, perfect for quenching their thirst",
    image: "images/mobile-img/mobile_products_f1.jpg"
  },
  {
    title: "The Nerd",
    description: "Geared towards the intellectually curious and creatively inclined, the Nerd flavor may have a more experimental and unconventional taste profile, appealing to those looking for something new and thought-provoking.",
    image: "images/mobile-img/mobile_products_f2.jpg"
  },
  {
    title: "The Gamer",
    description: "Designed to cater to the gaming community, this flavor might feature bolder and energizing notes to keep gamers refreshed during intense gaming sessions.",
    image: "images/mobile-img/mobile_products_f3.jpg"
  },
  {
    title: "The Outcast",
    description: "Embracing the uniqueness of those who feel like outsiders, this flavor could offer a mix of unexpected tastes, celebrating individuality and standing out from the crowd.",
    image: "images/mobile-img/mobile_products_f4.jpg"
  },
];

details.forEach((detail, index) => {
    const detailElement = document.createElement("div");
    detailElement.classList.add("detail");
    detailElement.innerHTML = `
      <span class="detail-title">${detail.title}</span>
      <span class="detail-description">${detail.description}</span>
      <img src="${detail.image}" alt="${detail.title}" class="detail-image">
      <button class="add-to-cart btn btn-primary" data-index="${index}">BUY NOW</button>
    `;
    detailContainer.appendChild(detailElement);
  });

  function toggleDetails() {
    const detailList = document.getElementById('detail-list');
    if (detailList.style.display === 'none') {
      detailList.style.display = 'block';
    } else {
      detailList.style.display = 'none';
    }
  }
  const supports = [
    {
      description: "If you have any questions or need assistance, our support team is here to help. Please feel free to reach out to us using the contact information below",
      image: "images/question.png"
    },
    {
      description: "For any inquiries related to our products or services, our dedicated customer support team is available to assist you. Contact us using the details provided",
      image: "images/operator.png"
    },
    {
      description: "If you have any questions or need assistance, our support team is here to help. Please feel free to reach out to us using the contact information below",
      image: "images/settings.png"
    }
  ];
document.addEventListener("DOMContentLoaded", function() {
  const supportContainer = document.getElementById("support-list");

  const supports = [
    {
      description: "If you have any questions or need assistance, our support team is here to help. Please feel free to reach out to us using the contact information below",
      image: "images/question.png"
    },
    {
      description: "For any inquiries related to our products or services, our dedicated customer support team is available to assist you. Contact us using the details provided",
      image: "images/operator.png"
    },
    {
      description: "If you have any questions or need assistance, our support team is here to help. Please feel free to reach out to us using the contact information below",
      image: "images/settings.png"
    }
  ];

  supports.forEach((support) => {
    const supportElement = document.createElement("div");
    supportElement.classList.add("support");
    supportElement.innerHTML = `
      <span class="support-description">${support.description}</span>
      <img src="${support.image}" alt="${support.title}" class="detail-image">
    `;
    supportContainer.appendChild(supportElement);
  });
});

  
  //Contact Form

function saveDataToLocalStorage(data) {
    const existingData = JSON.parse(localStorage.getItem('contactData')) || [];
    existingData.push(data);
    localStorage.setItem('contactData', JSON.stringify(existingData));
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
  
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    saveDataToLocalStorage(data);
  
    alert('Data sent successfully!');
  
    form.reset();
  }
  
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', handleSubmit);