// 轮播图功能
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

// 显示指定幻灯片
function showSlide(index) {
    // 隐藏所有幻灯片
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // 确保索引在有效范围内
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;
    
    // 显示当前幻灯片
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// 切换到下一张/上一张
function changeSlide(direction) {
    currentSlideIndex += direction;
    showSlide(currentSlideIndex);
}

// 跳转到指定幻灯片
function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// 自动播放轮播图
function autoSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    if (slides.length > 0) {
        showSlide(0);
        // 每5秒自动切换
        setInterval(autoSlide, 5000);
        
        // 添加触摸滑动支持
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        if (carouselWrapper) {
            let startX = 0;
            let endX = 0;
            
            carouselWrapper.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
            });
            
            carouselWrapper.addEventListener('touchend', function(e) {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                // 如果滑动距离大于50px，则切换幻灯片
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        // 向左滑动，显示下一张
                        changeSlide(1);
                    } else {
                        // 向右滑动，显示上一张
                        changeSlide(-1);
                    }
                }
            });
            
            // 鼠标悬停时暂停自动播放
            carouselWrapper.addEventListener('mouseenter', function() {
                clearInterval(window.carouselInterval);
            });
            
            carouselWrapper.addEventListener('mouseleave', function() {
                window.carouselInterval = setInterval(autoSlide, 5000);
            });
        }
    }
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');
    
    // 创建移动端导航菜单
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <div class="mobile-nav-content">
            <a href="#" class="mobile-nav-link">首页</a>
            <a href="#" class="mobile-nav-link">联系我们</a>
            <a href="#" class="mobile-nav-link">新闻咨询</a>
            <a href="#" class="mobile-nav-link">关于优哩哩</a>
        </div>
    `;
    
    // 添加移动端导航样式
    const mobileNavStyle = document.createElement('style');
    mobileNavStyle.textContent = `
        .mobile-nav {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background-color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            z-index: 999;
            max-height: calc(100vh - 60px);
            overflow-y: auto;
        }
        
        .mobile-nav.active {
            transform: translateY(0);
        }
        
        .mobile-nav-content {
            padding: 20px;
        }
        
        .mobile-nav-link {
            display: block;
            padding: 15px 0;
            color: #333;
            text-decoration: none;
            font-weight: 500;
            border-bottom: 1px solid #f0f0f0;
            transition: color 0.3s ease;
        }
        
        .mobile-nav-link:hover {
            color: #007bff;
        }
        
        .mobile-nav-link:last-child {
            border-bottom: none;
        }
        

        
        @media (min-width: 769px) {
            .mobile-nav {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(mobileNavStyle);
    document.body.appendChild(mobileNav);
    
    // 移动端导航切换功能
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // 切换图标
            const icon = this.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // 点击页面其他地方关闭移动端导航
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-nav') && !e.target.closest('.mobile-nav-toggle')) {
            mobileNav.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    });
    

    
    // 平滑滚动到锚点
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // 关闭移动端导航
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            }
        });
    });
    
    // 滚动时导航栏效果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 滚动时添加阴影效果
        if (scrollTop > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 微信添加按钮点击效果
    const addWechatBtn = document.querySelector('.add-wechat-btn');
    if (addWechatBtn) {
        addWechatBtn.addEventListener('click', function() {
            // 复制微信号到剪贴板
            const wechatId = 'V13158448888';
            
            // 先复制微信号
            if (navigator.clipboard) {
                navigator.clipboard.writeText(wechatId).then(function() {
                    showToast('微信号已复制到剪贴板: ' + wechatId);
                }).catch(function() {
                    showToast('请手动复制微信号: ' + wechatId);
                });
            } else {
                showToast('请手动复制微信号: ' + wechatId);
            }
            
            // 尝试跳转到微信
            setTimeout(function() {
                // 检测设备类型并尝试不同的跳转方式
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                
                if (isMobile) {
                    // 移动端尝试打开微信
                    const wechatUrl = 'weixin://';
                    window.location.href = wechatUrl;
                    
                    // 如果微信未安装，提示用户
                    setTimeout(function() {
                        showToast('请打开微信添加好友: ' + wechatId);
                    }, 1000);
                } else {
                    // 桌面端提示用户
                    showToast('请在手机微信中搜索添加: ' + wechatId);
                }
            }, 500);
        });
    }
    
    // 简单的Toast提示函数
    function showToast(message) {
        // 创建toast元素
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 14px;
            text-align: center;
            max-width: 90%;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 10);
        
        // 3秒后移除
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    

    
    // 图片懒加载效果（为未来的图片准备）
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            console.log('点击图片位置，可以在这里添加图片查看功能');
        });
    });
    
    // 页面加载完成后的动画效果
    const animateElements = document.querySelectorAll('.section-title, .section-subtitle, .article-card, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 页面加载时的欢迎动画
window.addEventListener('load', function() {
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.style.opacity = '0';
        mainTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            mainTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            mainTitle.style.opacity = '1';
            mainTitle.style.transform = 'translateY(0)';
        }, 100);
    }
});
