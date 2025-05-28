document.addEventListener('DOMContentLoaded', function() {
    // Gerenciamento da galeria de imagens
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Atualiza a imagem principal
            mainImage.src = this.src.replace('-thumb', '');
            
            // Atualiza a classe active
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Seleção de tamanho
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Controle de quantidade
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');

    function updateQuantity(value) {
        const currentValue = parseInt(quantityInput.value);
        const newValue = currentValue + value;
        
        if (newValue >= 1 && newValue <= 10) {
            quantityInput.value = newValue;
        }
    }

    decreaseBtn.addEventListener('click', () => updateQuantity(-1));
    increaseBtn.addEventListener('click', () => updateQuantity(1));

    // Validação manual do input de quantidade
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > 10) {
            value = 10;
        }
        this.value = value;
    });

    // Adicionar ao carrinho
    const addToCartBtn = document.getElementById('add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        const selectedSize = document.querySelector('.size-btn.selected');
        
        if (!selectedSize) {
            alert('Por favor, selecione um tamanho');
            return;
        }

        const productData = {
            name: document.querySelector('.product-title').textContent,
            price: document.querySelector('.current-price').textContent,
            size: selectedSize.textContent,
            quantity: quantityInput.value,
            image: mainImage.src
        };

        // Adiciona ao carrinho (simulado)
        addToCart(productData);
    });

    // Adicionar aos favoritos
    const wishlistBtn = document.getElementById('add-to-wishlist');
    wishlistBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = 'var(--secondary-color)';
            alert('Produto adicionado aos favoritos!');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
            alert('Produto removido dos favoritos!');
        }
    });

    // Função para adicionar ao carrinho
    function addToCart(product) {
        // Aqui você pode implementar a lógica real do carrinho
        // Por exemplo, salvar no localStorage ou fazer uma requisição ao backend
        console.log('Produto adicionado ao carrinho:', product);
        
        // Feedback visual
        const originalText = addToCartBtn.innerHTML;
        addToCartBtn.innerHTML = '<i class="fas fa-check me-2"></i>Adicionado!';
        addToCartBtn.disabled = true;
        
        setTimeout(() => {
            addToCartBtn.innerHTML = originalText;
            addToCartBtn.disabled = false;
        }, 2000);
    }

    // Zoom na imagem principal
    const mainImageContainer = document.querySelector('.main-image');
    mainImageContainer.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 768) { // Apenas em desktop
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width * 100;
            const yPercent = y / rect.height * 100;
            
            mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        }
    });

    mainImageContainer.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) {
            mainImage.style.transform = 'scale(1.5)';
        }
    });

    mainImageContainer.addEventListener('mouseleave', function() {
        mainImage.style.transform = 'scale(1)';
    });
}); 