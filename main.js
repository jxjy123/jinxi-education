// ==================== 导航栏功能 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // 点击导航链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    });
    
    // 导航链接高亮
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });
});

// ==================== 返回顶部按钮 ====================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== 院校筛选功能 ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const collegeCards = document.querySelectorAll('.college-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 移除所有按钮的active状态
        filterBtns.forEach(b => b.classList.remove('active'));
        // 添加当前按钮的active状态
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        collegeCards.forEach(card => {
            const city = card.getAttribute('data-city');
            
            if (filter === 'all') {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else if (city === filter || 
                       (filter === 'other' && city !== 'shenyang' && city !== 'dalian')) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ==================== 表单提交 ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const interest = document.getElementById('interest').value;
    const message = document.getElementById('message').value;
    
    // 验证手机号
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('请输入正确的手机号码');
        return;
    }
    
    // 构建提交信息
    const submitData = {
        name: name,
        phone: phone,
        interest: interest,
        message: message,
        timestamp: new Date().toLocaleString()
    };
    
    // 模拟提交成功
    console.log('提交数据:', submitData);
    
    // 显示成功提示
    alert('感谢您的咨询！我们会尽快与您联系。\n咨询电话：18602431151');
    
    // 重置表单
    contactForm.reset();
});

// ==================== 数字动画 ====================
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isPercent = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(counter);
            }
            
            let displayValue = Math.floor(current);
            if (isPlus) {
                displayValue += '+';
            }
            if (isPercent) {
                displayValue += '%';
            }
            
            stat.textContent = displayValue;
        }, stepTime);
    });
}

// 页面加载时触发数字动画
window.addEventListener('load', function() {
    // 延迟触发动画，让页面先加载
    setTimeout(animateNumbers, 500);
});

// ==================== 平滑滚动 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 卡片悬停效果 ====================
const cards = document.querySelectorAll('.product-card, .college-card, .major-card, .feature-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== 添加淡入动画CSS ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== 页面加载动画 ====================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 为各section添加滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// ==================== 添加滚动动画CSS ====================
const animateStyle = document.createElement('style');
animateStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    #home {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animateStyle);

// ==================== 咨询电话点击拨打 ====================
document.querySelectorAll('.nav-contact, .contact-item').forEach(item => {
    if (item.querySelector('span') && item.querySelector('span').textContent.includes('18602431151')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            window.location.href = 'tel:18602431151';
        });
    }
});

// ==================== 图片懒加载 ====================
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

console.log('沈阳锦溪教育官网已加载完成');