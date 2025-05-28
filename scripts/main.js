// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Animação suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Adicionar classe 'active' ao item do menu quando estiver visível
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Funcionalidade de carrinho de compras
    const addToCartButtons = document.querySelectorAll('.btn-dark');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.card-title').textContent;
            const productPrice = productCard.querySelector('.card-text').textContent;

            // Adicionar ao carrinho (simulado)
            alert(`Produto adicionado ao carrinho:\n${productName}\n${productPrice}`);
            
            // Aqui você pode adicionar a lógica real do carrinho
            // Por exemplo, salvar no localStorage ou fazer uma requisição ao backend
        });
    });

    // Newsletter
    const newsletterForm = document.querySelector('footer form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Aqui você pode adicionar a lógica real de inscrição
                alert('Obrigado por se inscrever em nossa newsletter!');
                this.reset();
            }
        });
    }

    // Lazy loading para imagens
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que não suportam lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
}); 