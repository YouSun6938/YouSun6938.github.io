// 图片查看大图功能 (Lightbox)
function initLightbox() {
    // 检查是否已经存在 lightbox
    if (document.querySelector('.lightbox')) return;

    // 创建并注入 Lightbox HTML
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" src="" alt="大图预览">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // 监听所有项目图片点击 (兼容主页和项目详情页)
    const setupImageListeners = () => {
        const images = document.querySelectorAll('.image-gallery img, .feature-image img');
        images.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // 禁止背景滚动
            });
        });
    };

    setupImageListeners();

    // 点击背景或关闭按钮关闭
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // 恢复背景滚动
    };

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
            closeLightbox();
        }
    });
    
    // 按 ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// 初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
} else {
    initLightbox();
}
