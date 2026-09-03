const API_URL = "http://localhost:5000/api/items";

const itemForm = document.getElementById("itemForm");
const formMessage = document.getElementById("formMessage");
const itemsContainer = document.getElementById("itemsContainer");
const searchBox = document.getElementById("searchBox");
const filterType = document.getElementById("filterType");

// load items when page opens
document.addEventListener("DOMContentLoaded", loadItems);

// handle form submit
itemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newItem = {
    type: document.getElementById("type").value,
    title: document.getElementById("title").value.trim(),
    description: document.getElementById("description").value.trim(),
    location: document.getElementById("location").value.trim(),
    contact: document.getElementById("contact").value.trim(),
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    if (!res.ok) throw new Error("Failed to submit report");

    formMessage.textContent = "Report submitted successfully!";
    formMessage.style.color = "green";
    itemForm.reset();
    loadItems();
  } catch (err) {
    formMessage.textContent = "Something went wrong. Please try again.";
    formMessage.style.color = "red";
  }
});

// search and filter listeners
searchBox.addEventListener("input", loadItems);
filterType.addEventListener("change", loadItems);

// fetch items from backend
async function loadItems() {
  const search = searchBox.value.trim();
  const type = filterType.value;

  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (type) params.append("type", type);

  try {
    const res = await fetch(`${API_URL}?${params.toString()}`);
    const items = await res.json();
    renderItems(items);
  } catch (err) {
    itemsContainer.innerHTML = "<p>Could not load items. Is the server running?</p>";
  }
}

// render item cards
function renderItems(items) {
  if (items.length === 0) {
    itemsContainer.innerHTML = "<p>No items found.</p>";
    return;
  }

  itemsContainer.innerHTML = items
    .map((item) => {
      const dateStr = new Date(item.date).toLocaleDateString();
      return `
        <div class="item-card ${item.type} ${item.resolved ? "resolved" : ""}">
          <span class="badge">${item.type}</span>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description)}</p>
          <p><strong>Location:</strong> ${escapeHTML(item.location)}</p>
          <p><strong>Contact:</strong> ${escapeHTML(item.contact)}</p>
          <div class="meta">Posted on ${dateStr}</div>
          <div class="actions">
            ${
              !item.resolved
                ? `<button class="resolve-btn" onclick="resolveItem('${item.id}')">Mark Resolved</button>`
                : ""
            }
            <button class="delete-btn" onclick="deleteItem('${item.id}')">Delete</button>
          </div>
        </div>
      `;
    })
    .join("");
}

// mark an item as resolved
async function resolveItem(id) {
  try {
    await fetch(`${API_URL}/${id}/resolve`, { method: "PATCH" });
    loadItems();
  } catch (err) {
    alert("Could not update item.");
  }
}

// delete an item
async function deleteItem(id) {
  if (!confirm("Delete this report?")) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadItems();
  } catch (err) {
    alert("Could not delete item.");
  }
}

// basic escaping to avoid breaking html with special characters
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
