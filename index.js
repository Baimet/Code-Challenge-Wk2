document.addEventListener("DOMContentLoaded", (event) => {
  const itemInput = document.getElementById("itemInput");
  const addItemButton = document.getElementById("addItemButton");
  const shoppingList = document.getElementById("shoppingList");
  const clearListButton = document.getElementById("clearListButton");

  let items = JSON.parse(localStorage.getItem("shoppingList")) || [];

  const saveToLocalStorage = () => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  };

  const renderList = () => {
    shoppingList.innerHTML = "";
    items.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = item.name;
      listItem.classList.toggle("purchased", item.purchased);

      listItem.addEventListener("dblclick", () => {
        const newName = prompt("Edit item name:", item.name);
        if (newName !== null && newName.trim() !== "") {
          items[index].name = newName.trim();
          saveToLocalStorage();
          renderList();
        }
      });

      listItem.addEventListener("click", () => {
        items[index].purchased = !items[index].purchased;
        saveToLocalStorage();
        renderList();
      });

      shoppingList.appendChild(listItem);
    });
  };

  addItemButton.addEventListener("click", () => {
    const newItem = itemInput.value.trim();
    if (newItem) {
      items.push({ name: newItem, purchased: false });
      itemInput.value = "";
      saveToLocalStorage();
      renderList();
    }
  });

  clearListButton.addEventListener("click", () => {
    items = [];
    saveToLocalStorage();
    renderList();
  });

  renderList();
});
