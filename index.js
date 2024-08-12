const mainCards = document.querySelector(".mainCards");
const msgModel = document.querySelector(".msgModel");
const msg = document.querySelector(".msgText");
const overlay = document.querySelector(".overlay");
const loading = document.querySelector(".loading");
const mobileInput = document.querySelector(".mobileInput");
const desktopInput = document.querySelector(".desktopInput");
const cartBtn = document.querySelector(".cartBtn");
const memberBtn = document.querySelector(".memberBtn");
const navCartNum = document.querySelector(".navCartNum");
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query");
const category = urlParams.get("category") || "all";
let nextPage = null;
const carouselDots = document.querySelector(".carouselDots");
const carouselSlides = document.querySelector(".carouselSlides");
let currentIndex = 0;
const slideInterval = 3000;
const appworksApi = "https://api.appworks-school.tw/api/1.0";
let storedCart = localStorage.getItem("cartItems");

if (storedCart) {
  storedCart = JSON.parse(storedCart);
  const cartItems = storedCart.reduce((total, item) => total + item.qty, 0);
  navCartNum.textContent = cartItems;
} else {
  navCartNum.textContent = 0;
}

//Check network status
const displayNetworkError = () => {
  msgModel.style.display = "flex";
  msg.textContent = "網路斷線,請檢查網路連線...";
  overlay.style.display = "block";
};

const hideNetworkError = () => {
  msgModel.style.display = "none";
  overlay.style.display = "none";
};

window.addEventListener("offline", displayNetworkError);
window.addEventListener("online", hideNetworkError);

//Check timeout
const fetchWithTimeout = async (url, options = {}) => {
  const { timeout = 3000, ...restOptions } = options;
  const controller = new AbortController();
  const signal = controller.signal;
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  const res = await fetch(url, {
    ...restOptions,
    signal,
  });
  clearTimeout(timeoutId);
  return res;
};

const updateQueryParams = (newParams) => {
  const url = new URL(window.location.href);
  for (const param of url.searchParams.keys()) {
    url.searchParams.delete(param);
  }
  for (const [key, value] of Object.entries(newParams)) {
    url.searchParams.set(key, value);
  }
  window.history.pushState({}, "", url);
};

//DOM
document.querySelector(".navLogo").addEventListener("click", () => {
  const homepage = `${window.location.origin}${window.location.pathname}`;
  window.location.href = homepage;
});

document.querySelector(".navLeftItems").addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const category = event.target.getAttribute("data-category");
    if (category) {
      window.location.href = `homepage.html?category=${category}`;
    }
  }
});

document.querySelector(".mobileSearchButton").addEventListener("click", () => {
  mobileInput.classList.toggle("hidden");
  mobileInput.focus();
});

mobileInput.addEventListener("blur", () => {
  mobileInput.classList.toggle("hidden");
});

document.querySelector(".desktopSearchButton").addEventListener("click", () => {
  const keyword = desktopInput.value.trim();
  if (keyword) {
    loadData("search", keyword).then(() => {
      desktopInput.value = "";
    });
  }
});

document.querySelectorAll(".searchInputs").forEach((input) => {
  let isComposing = false;
  input.addEventListener("compositionstart", () => {
    isComposing = true;
  });
  input.addEventListener("compositionend", () => {
    setTimeout(() => {
      isComposing = false;
    }, 100);
  });
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && !isComposing) {
      const keyword = input.value.trim();
      if (keyword) {
        updateQueryParams({ query: keyword });
        loadData("search", keyword).then(() => {
          input.value = "";
        });
      }
    }
  });
});

cartBtn.addEventListener("click", function () {
  window.location.href = "/cart";
});

memberBtn.addEventListener("click", function () {
  window.location.href = "/member";
});

// Get data
const fetchData = async (type, param, page) => {
  let url;
  loading.classList.remove("hidden");
  if (type === "search") {
    mainCards.replaceChildren();
  }
  switch (type) {
    case "category":
      url = `${appworksApi}/products/${param}?paging=${page}`;
      break;
    case "search":
      url = `${appworksApi}/products/search/?keyword=${param}&paging=${page}`;
      break;
    case "campaigns":
      url = `${appworksApi}/marketing/campaigns`;
      break;
    default:
      throw new Error("Unkown type");
  }
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`error:${res.status}`);
    }
    const data = await res.json();
    return { type, ...data };
  } catch (error) {
    if (error.name === "AbortError") {
      msgModel.style.display = "flex";
      msg.textContent = "請求超時，請稍後再試";
    } else {
      console.error(error);
    }
  } finally {
    loading.classList.add("hidden");
  }
};

//Render data
const renderProducts = (items) => {
  if (items.length > 0) {
    items.forEach((item) => {
      const colors = item.colors;
      const cardColorDivs = colors
        .map(
          (color) =>
            `<div class="mainCardColor" style="background:#${color.code};" ></div>`
        )
        .join("");
      mainCards.insertAdjacentHTML(
        "beforeend",
        `
      <a href="/product?id=${item.id}">
      <div class="mainCard">
      <img class="skeleton"/>
      <img src="${item.main_image}" style="display: none;" onload="handleImageLoad(this);" />
        <div class="mainCardColors">
          ${cardColorDivs}
        </div>
        <p class="mainCardText">${item.title}</p>
        <p class="mainCardText" id="mainProductPrice">$${item.price}</p>
      </div>
      </a>
      `
      );
    });
  } else {
    mainCards.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="result">
        <h2>查無結果</h2>
      </div>
      `
    );
  }
};

const renderCampaigns = (items) => {
  items.forEach((item, index) => {
    let lines = item.story.split("\r\n");
    const line1 = lines.slice(0, -1).join("<br>");
    const line2 = lines[lines.length - 1];
    carouselSlides.insertAdjacentHTML(
      "beforeend",
      `
      <div class="carouselSlide" style="background-image:url(${item.picture})">
        <a href="/product?id=${item.product_id}">
          <div class="mainText1">${line1}</div>
          <div class="mainText2">${line2}</div>
        </a>
      </div>
  `
    );
    carouselDots.insertAdjacentHTML(
      "beforeend",
      ` <button class="carouselDot ${
        index === 0 ? "dotsActive" : ""
      }" data-index=${index}></button>`
    );
  });
  document.querySelectorAll(".carouselSlide")[0].classList.add("slideActive");
};

//Slide effect
const initializeCarousel = () => {
  setInterval(animateCarousel, slideInterval);
  handleClickDot();
};

const animateCarousel = () => {
  const slides = document.querySelectorAll(".carouselSlide");
  const totalSlides = slides.length;
  if (totalSlides > 0) {
    const preIndex = currentIndex;
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel(preIndex, currentIndex);
  }
};

const updateCarousel = (preIndex, currentIndex) => {
  const slides = document.querySelectorAll(".carouselSlide");
  slides[preIndex].classList.remove("slideActive");
  slides[currentIndex].classList.add("slideActive");
  const offset = -currentIndex * 100;
  carouselSlides.style.transform = `translateX(${offset}%)`;
  updateActiveBot(currentIndex);
};

const updateActiveBot = (index) => {
  const dots = document.querySelectorAll(".carouselDot");
  dots.forEach((dot) => dot.classList.remove("dotsActive"));
  dots[index].classList.add("dotsActive");
};

window.handleImageLoad = (image) => {
  const skeleton = image.previousElementSibling;
  if (skeleton && skeleton.classList.contains("skeleton")) {
    skeleton.remove();
  }
  image.style.display = "block";
};

const handleClickDot = () => {
  const dots = document.querySelectorAll(".carouselDot");
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateCarousel(currentIndex, index);
    });
  });
};

//Infinite scroll
const handleScroll = async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    if (nextPage === null || nextPage === undefined) return;
    await loadData("category", category, nextPage);
  }
};

const loadData = async (type, param, page) => {
  let data = await fetchData(type, param, page);
  if (data && data.data) {
    if (type === "category" || type === "search") {
      renderProducts(data.data);
      nextPage = data.next_paging;
    } else if (type === "campaigns") {
      renderCampaigns(data.data);
    }
  }
};

const throttle = (callback, delay) => {
  let timeID = null;
  const throttledFunction = function (...args) {
    if (timeID) return;
    timeID = setTimeout(() => {
      callback.apply(this, args);
      timeID = null;
    }, delay);
  };
  return throttledFunction;
};

const loadInitalData = async () => {
  if (query) {
    await loadData("search", query, nextPage);
  } else {
    await loadData("category", category, nextPage);
  }
};

(async function () {
  await loadInitalData();
  await loadData("campaigns");
  initializeCarousel();
  window.addEventListener("scroll", throttle(handleScroll, 200));
  window.addEventListener("popstate", async () => {
    await loadInitalData();
  });
})();
