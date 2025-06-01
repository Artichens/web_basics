// ========== Плавная прокрутка для навигации ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

// ========== Анимация при скролле ==========
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.section, .project-card, .skill-item');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if(elementPosition < screenPosition) {
      element.classList.add('appear');
    }
  });
};

// Запускаем при загрузке и при скролле
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// ========== Интерактивные карточки проектов ==========
document.querySelectorAll('.project-card').forEach(card => {
  const url = card.getAttribute('data-url') || 
             card.querySelector('a')?.getAttribute('href');
  
  if (url) {
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', (e) => {
      // Не открываем ссылку если кликнули на кнопку
      if(!e.target.classList.contains('project-btn') && 
         e.target.tagName !== 'A') {
        window.open(url, '_blank');
      }
    });
  }
  
  // Анимация кнопки
  const btn = card.querySelector('.project-btn');
  if (btn) {
    card.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(0)';
    });
    
    card.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(100%)';
    });
  }
});

// ========== Темный режим ==========
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', 
      document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // Проверяем сохраненную тему
  if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
}

// ========== Анимация навыков ==========
document.querySelectorAll('.skill-item').forEach(item => {
  const img = item.querySelector('img');
  if (img) {
    item.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.2) rotate(15deg)';
    });
    
    item.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1) rotate(0)';
    });
  }
});

// ========== Анимация фото в About ==========
const aboutPhoto = document.querySelector('.about-photo');
if (aboutPhoto) {
  aboutPhoto.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    aboutPhoto.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  aboutPhoto.addEventListener('mouseleave', () => {
    aboutPhoto.style.transform = 'perspective(1000px) rotateY(-10deg) rotateX(0)';
  });
}