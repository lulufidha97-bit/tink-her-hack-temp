// --- Data Management & Utilities ---

function getClothes() {
    return JSON.parse(localStorage.getItem("clothes")) || [];
}

function saveClothes(clothes) {
    localStorage.setItem("clothes", JSON.stringify(clothes));
}

// Convert file to Base64
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// --- Add Clothes Page ---

async function saveCloth() {
    // Prevent default form submission if called from form
    if (event) event.preventDefault();

    const type = document.getElementById("type").value;
    const color = document.getElementById("color").value;
    const brand = document.getElementById("brand") ? document.getElementById("brand").value : "";
    const occasion = document.getElementById("occasion") ? document.getElementById("occasion").value : "Casual";
    const imageUrlInput = document.getElementById("imageUrl") ? document.getElementById("imageUrl").value : "";
    const fileInput = document.getElementById("imageFile");

    if (!color) {
        alert("Please enter a color!");
        return;
    }

    let finalImageUrl = imageUrlInput;

    // specific handling for file upload
    if (fileInput && fileInput.files && fileInput.files[0]) {
        try {
            finalImageUrl = await readFileAsDataURL(fileInput.files[0]);
        } catch (e) {
            console.error("Error reading file", e);
            alert("Error reading image file.");
            return;
        }
    }

    const clothes = getClothes();
    const newCloth = {
        id: Date.now(),
        type,
        color,
        brand,
        occasion,
        imageUrl: finalImageUrl,
        dateAdded: new Date().toLocaleDateString()
    };

    clothes.push(newCloth);
    saveClothes(clothes);

    alert("Cloth Saved Successfully!");

    // Reset form
    document.getElementById("color").value = "";
    if (document.getElementById("brand")) document.getElementById("brand").value = "";
    if (document.getElementById("imageUrl")) document.getElementById("imageUrl").value = "";
    if (fileInput) fileInput.value = "";
}

// --- My Closet Page ---

function displayCloset() {
    const clothes = getClothes();
    const container = document.getElementById("closetList");

    if (!container) return;

    container.innerHTML = "";

    if (clothes.length === 0) {
        container.style.display = "block"; // Reset grid if needed for message
        container.innerHTML = "<p style='text-align: center; color: #555; width: 100%;'>Your closet is empty! <br>Go add some clothes.</p>";
        return;
    }

    container.style.display = "grid"; // Ensure grid

    clothes.forEach(item => {
        const card = document.createElement("div");
        card.className = "cloth-card";

        let imageHtml = "";
        if (item.imageUrl) {
            imageHtml = `<img src="${item.imageUrl}" alt="${item.type}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 10px;">`;
        } else {
            const icon = item.type === "Top" ? "👕" : (item.type === "Bottom" ? "👖" : "👟");
            imageHtml = `<div style="font-size: 50px; line-height: 100px;">${icon}</div>`;
        }

        card.innerHTML = `
            ${imageHtml}
            <h3>${item.color}</h3>
            <p>${item.type}</p>
            <button onclick="deleteCloth(${item.id})" class="delete-btn">Remove</button>
        `;
        container.appendChild(card);
    });
}

function deleteCloth(id) {
    if (!confirm("Delete this item?")) return;

    let clothes = getClothes();
    clothes = clothes.filter(item => item.id !== id);
    saveClothes(clothes);
    displayCloset();
}

// --- Home Screen Logic ---

let currentSuggestion = null;

function initHome() {
    generateHomeMatch();
    loadHistory(); // load history just for debug or updating state
}

function generateHomeMatch() {
    const clothes = getClothes();

    const tops = clothes.filter(item => item.type === "Top");
    const bottoms = clothes.filter(item => item.type === "Bottom");

    const topDisplay = document.getElementById("topDisplay");
    const bottomDisplay = document.getElementById("bottomDisplay");

    if (!topDisplay || !bottomDisplay) return;

    if (tops.length === 0 || bottoms.length === 0) {
        topDisplay.innerHTML = `<div class="placeholder-img">👕</div><p class="item-name">Add Tops</p>`;
        bottomDisplay.innerHTML = `<div class="placeholder-img">👖</div><p class="item-name">Add Bottoms</p>`;
        currentSuggestion = null;
        return;
    }

    const randomTop = tops[Math.floor(Math.random() * tops.length)];
    const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];

    currentSuggestion = { top: randomTop, bottom: randomBottom, date: new Date().toLocaleDateString() };

    // Render Top
    renderItem(topDisplay, randomTop, "👕");
    // Render Bottom
    renderItem(bottomDisplay, randomBottom, "👖");

    addToHistory(currentSuggestion);
}

function renderItem(container, item, iconFallback) {
    let imgHtml = "";
    if (item.imageUrl) {
        imgHtml = `<img src="${item.imageUrl}" class="cloth-img">`;
    } else {
        imgHtml = `<div class="placeholder-img">${iconFallback}</div>`;
    }
    container.innerHTML = `${imgHtml}<p class="item-name">${item.color}</p>`;
}

function addToHistory(outfit) {
    if (!outfit) return;
    let history = JSON.parse(localStorage.getItem("outfitHistory")) || [];
    // Only add if different from the very last one to avoid spam on page refresh
    if (history.length > 0) {
        const last = history[0];
        if (last.top.id === outfit.top.id && last.bottom.id === outfit.bottom.id) {
            return;
        }
    }
    history.unshift(outfit);
    if (history.length > 20) history.pop();
    localStorage.setItem("outfitHistory", JSON.stringify(history));
}

// --- Favorites ---

function saveCurrentToFavorites() {
    if (!currentSuggestion) {
        alert("No outfit generated yet!");
        return;
    }

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // Check duplicates
    const isDuplicate = favorites.some(fav => fav.top.id === currentSuggestion.top.id && fav.bottom.id === currentSuggestion.bottom.id);
    if (isDuplicate) {
        alert("Already in favorites!");
        return;
    }

    favorites.push(currentSuggestion);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    alert("Outfit added to Favorites! ❤️");
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const container = document.getElementById("favoritesList");

    if (!container) return;

    container.innerHTML = "";

    if (favorites.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>No favorites saved yet.</p>";
        return;
    }

    favorites.forEach((outfit, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.marginBottom = "15px";
        card.innerHTML = `
            <h3>Favorite #${index + 1}</h3>
            <div class="match-display" style="gap: 10px;">
                <div class="item-display">
                     ${getImgTag(outfit.top, "👕")}
                     <p class="item-name">${outfit.top.color}</p>
                </div>
                <div style="font-size: 20px;">+</div>
                <div class="item-display">
                     ${getImgTag(outfit.bottom, "👖")}
                     <p class="item-name">${outfit.bottom.color}</p>
                </div>
            </div>
            <button onclick="removeFavorite(${index})" class="delete-btn" style="width: auto; padding: 5px 15px;">Remove</button>
        `;
        container.appendChild(card);
    });
}

function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
}

// --- History Page ---

function loadHistoryPage() {
    const history = JSON.parse(localStorage.getItem("outfitHistory")) || [];
    const container = document.getElementById("historyList");

    if (!container) return;

    container.innerHTML = "";

    if (history.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>No history yet.</p>";
        return;
    }

    history.forEach((outfit) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.marginBottom = "15px";

        card.innerHTML = `
            <p style="color: #888; font-size: 0.8rem; margin-bottom: 15px;">Generated: ${outfit.date}</p>
            <div class="match-display" style="gap: 10px;">
                <div class="item-display" style="width: 35%;">
                     ${getImgTag(outfit.top, "👕")}
                     <p class="item-name">${outfit.top.color}</p>
                </div>
                <div class="item-display" style="width: 35%;">
                     ${getImgTag(outfit.bottom, "👖")}
                     <p class="item-name">${outfit.bottom.color}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
// Alias for onload
function loadHistory() {
    loadHistoryPage();
}

function getImgTag(item, fallbackIcon) {
    if (item.imageUrl) {
        return `<img src="${item.imageUrl}" style="width: 80px; height: 100px; border-radius: 8px; object-fit: cover;">`;
    } else {
        return `<div style="font-size: 40px;">${fallbackIcon}</div>`;
    }
}