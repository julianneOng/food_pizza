const pizzas = [
  {
    name: "Margherita",
    description: "Classic mozzarella delight.",
    price: 9.99,
    image: "https://th.bing.com/th/id/OIP.GfDfzbPY_JOC2a2DHPG4JwHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc2"
  },
  {
    name: "Pepperoni Feast",
    description: "Loaded with pepperoni and cheese.",
    price: 11.99,
    image: "https://pizza.cafeela.pk/wp-content/uploads/2021/05/Pepperoni-Feast.jpg"
  },
  {
    name: "Veggie Supreme",
    description: "Topped with fresh vegetables.",
    price: 10.49,
    image: "https://i.pinimg.com/originals/48/b5/d2/48b5d236bac9c2d3415a7ba3159280e5.jpg"
  }
];

const menu = document.getElementById("pizzaMenu");
const orderList = document.getElementById("orderList");
const deliveryForm = document.getElementById("deliveryForm");
const confirmation = document.getElementById("confirmation");

let order = [];

pizzas.forEach((pizza, index) => {
  const card = `
    <div class="col-md-4">
      <div class="card">
        <img src="${pizza.image}" class="card-img-top" alt="${pizza.name}">
        <div class="card-body">
          <h5 class="card-title">${pizza.name}</h5>
          <p class="card-text">${pizza.description}</p>
          <p class="card-text fw-bold">$${pizza.price.toFixed(2)}</p>
          <button class="btn btn-primary" onclick="addToOrder(${index})">Add to Order</button>
        </div>
      </div>
    </div>
  `;
  menu.innerHTML += card;
});

function addToOrder(index) {
  order.push(pizzas[index]);
  updateOrderList();
}

function updateOrderList() {
  orderList.innerHTML = "";
  order.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${item.name} <span>$${item.price.toFixed(2)}</span>`;
    orderList.appendChild(li);
  });
}

deliveryForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (order.length === 0) {
    alert("Please add at least one pizza to your order.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !address || !phone) {
    alert("Please fill in all delivery details.");
    return;
  }

  const total = order.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  confirmation.classList.remove("d-none");
  confirmation.innerHTML = `
    <strong>Thank you, ${name}!</strong> <br/>
    Your order of <strong>$${total}</strong> is on the way to: <br/>
    <em>${address}</em> 📦<br/>
    📞 We'll contact you at: <strong>${phone}</strong>
  `;

  // Reset
  order = [];
  updateOrderList();
  deliveryForm.reset();
});
