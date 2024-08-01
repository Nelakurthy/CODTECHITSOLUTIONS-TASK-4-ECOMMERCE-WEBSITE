// mycart.js
document.addEventListener('DOMContentLoaded', function() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-price');

    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay(); // Initialize cart display on page load

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let totalAmount = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <p>${item.name} - Rs. ${item.price}</p>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
                totalAmount += parseInt(item.price, 10);
            });
            totalAmountElement.textContent = `Total Price: Rs. ${totalAmount}`;
        }
        cartCountElement.textContent = cart.length;
    }

    // Event delegation for remove buttons
    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = event.target.getAttribute('data-index');
            if (index !== null && index >= 0 && index < cart.length) {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            } else {
                console.error('Invalid index for remove-from-cart button.');
            }
        }
    });
});
