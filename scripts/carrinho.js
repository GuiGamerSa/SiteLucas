document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o carrinho
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();

    // Função para atualizar a quantidade
    window.updateQuantity = function(button, change) {
        const input = button.parentElement.querySelector('input');
        const currentValue = parseInt(input.value);
        const newValue = currentValue + change;
        
        if (newValue >= 1 && newValue <= 10) {
            input.value = newValue;
            updateItemQuantity(button.closest('.cart-item'), newValue);
        }
    };

    // Função para remover item
    window.removeItem = function(button) {
        const cartItem = button.closest('.cart-item');
        const productId = cartItem.dataset.productId;
        
        // Remove do array do carrinho
        cart = cart.filter(item => item.id !== productId);
        
        // Atualiza o localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Remove do DOM com animação
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            cartItem.remove();
            updateCartDisplay();
        }, 300);
    };

    // Função para atualizar a quantidade no carrinho
    function updateItemQuantity(cartItem, quantity) {
        const productId = cartItem.dataset.productId;
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }

    // Função para atualizar o display do carrinho
    function updateCartDisplay() {
        const cartItems = document.querySelector('.cart-items');
        const emptyCart = document.querySelector('.empty-cart');
        const orderSummary = document.querySelector('.order-summary');
        
        if (cart.length === 0) {
            cartItems.classList.add('d-none');
            emptyCart.classList.remove('d-none');
            orderSummary.classList.add('d-none');
        } else {
            cartItems.classList.remove('d-none');
            emptyCart.classList.add('d-none');
            orderSummary.classList.remove('d-none');
            updateOrderSummary();
        }
    }

    // Função para atualizar o resumo do pedido
    function updateOrderSummary() {
        const subtotal = cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        const discount = calculateDiscount(subtotal);
        const total = subtotal - discount;

        // Atualiza os valores no DOM
        document.querySelector('.summary-item:nth-child(1) span:last-child').textContent = 
            formatPrice(subtotal);
        document.querySelector('.summary-item:nth-child(3) span:last-child').textContent = 
            `-${formatPrice(discount)}`;
        document.querySelector('.summary-item:last-child strong:last-child').textContent = 
            formatPrice(total);
    }

    // Função para calcular desconto
    function calculateDiscount(subtotal) {
        const couponCode = document.querySelector('.coupon-section input').value;
        let discount = 0;

        // Aqui você pode implementar a lógica de cupons de desconto
        if (couponCode === 'URBAN10') {
            discount = subtotal * 0.1; // 10% de desconto
        }

        return discount;
    }

    // Função para formatar preço
    function formatPrice(price) {
        return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }

    // Função para finalizar compra
    window.proceedToCheckout = function() {
        if (cart.length === 0) {
            showAlert('Seu carrinho está vazio!', 'danger');
            return;
        }

        // Aqui você pode implementar a lógica de redirecionamento para o checkout
        // Por exemplo:
        // window.location.href = 'checkout.html';
        
        showAlert('Redirecionando para o checkout...', 'success');
    };

    // Função para mostrar alertas
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);

        // Remove o alerta após 3 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    // Event listener para cupom de desconto
    const couponButton = document.querySelector('.coupon-section button');
    couponButton.addEventListener('click', function() {
        const couponInput = this.previousElementSibling;
        const couponCode = couponInput.value.trim();

        if (couponCode === 'URBAN10') {
            showAlert('Cupom aplicado com sucesso!', 'success');
            updateOrderSummary();
        } else {
            showAlert('Cupom inválido!', 'danger');
        }
    });

    // Event listener para input de quantidade
    document.querySelectorAll('.quantity-control input').forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                value = 1;
            } else if (value > 10) {
                value = 10;
            }
            this.value = value;
            updateItemQuantity(this.closest('.cart-item'), value);
        });
    });
}); 