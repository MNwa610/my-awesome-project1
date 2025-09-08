// ===== THEME TOGGLE =====
const KEY = 'theme';
const btn = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Автовыбор темы
if (localStorage.getItem(KEY) === 'dark' || (!localStorage.getItem(KEY) && prefersDark)) {
    document.body.classList.add('theme-dark');
    btn?.setAttribute('aria-pressed', 'true');
}

// Переключение темы
btn?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('theme-dark');
    btn.setAttribute('aria-pressed', String(isDark));
    localStorage.setItem(KEY, isDark ? 'dark' : 'light');
});

// ===== MODAL FUNCTIONALITY =====
const dialog = document.getElementById('contactDialog');
const openButton = document.getElementById('openDialog');
const closeButton = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

// Функция для форматирования телефона
function formatPhoneNumber(input) {
    const digits = input.value.replace(/\D/g, '').slice(0, 11);
    const normalizedDigits = digits.replace(/^8/, '7');
    
    const parts = [];
    if (normalizedDigits.length > 0) parts.push('+7');
    if (normalizedDigits.length > 1) parts.push(' (' + normalizedDigits.slice(1, 4));
    if (normalizedDigits.length >= 4) parts[parts.length - 1] += ')';
    if (normalizedDigits.length >= 5) parts.push(' ' + normalizedDigits.slice(4, 7));
    if (normalizedDigits.length >= 8) parts.push('-' + normalizedDigits.slice(7, 9));
    if (normalizedDigits.length >= 10) parts.push('-' + normalizedDigits.slice(9, 11));
    
    input.value = parts.join('');
}

// Обработчик для телефона
const phoneInput = document.getElementById('phone');
phoneInput?.addEventListener('input', () => {
    formatPhoneNumber(phoneInput);
});

// Открытие модального окна
openButton?.addEventListener('click', () => {
    lastActive = document.activeElement;
    dialog.showModal();
    dialog.querySelector('input, select, textarea, button')?.focus();
});

// Закрытие модального окна
closeButton?.addEventListener('click', () => {
    dialog.close('cancel');
});

// Обработка отправки формы
form?.addEventListener('submit', (e) => {
    // Сброс кастомных сообщений
    [...form.elements].forEach(el => el.setCustomValidity?.(''));
    
    // Проверка встроенных ограничений
    if (!form.checkValidity()) {
        e.preventDefault();
        
        // Таргетированное сообщение для email
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }
        
        form.reportValidity();
        
        // Подсветка проблемных полей
        [...form.elements].forEach(el => {
            if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
        });
        return;
    }
    
    // Успешная отправка
    e.preventDefault();
    alert('Форма успешно отправлена!');
    dialog.close('success');
    form.reset();
});

// Возврат фокуса после закрытия модалки
dialog?.addEventListener('close', () => {
    lastActive?.focus();
});

// ===== FORM VALIDATION FOR CONTACTS PAGE =====
const contactPageForm = document.getElementById('contactPageForm');
const phonePageInput = document.getElementById('phonePage');

// Обработчик для телефона на странице контактов
phonePageInput?.addEventListener('input', () => {
    formatPhoneNumber(phonePageInput);
});

// Обработка отправки формы на странице контактов
contactPageForm?.addEventListener('submit', (e) => {
    // Сброс кастомных сообщений
    [...contactPageForm.elements].forEach(el => el.setCustomValidity?.(''));
    
    // Проверка встроенных ограничений
    if (!contactPageForm.checkValidity()) {
        e.preventDefault();
        
        // Таргетированное сообщение для email
        const email = contactPageForm.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }
        
        contactPageForm.reportValidity();
        
        // Подсветка проблемных полей
        [...contactPageForm.elements].forEach(el => {
            if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
        });
        return;
    }
    
    // Успешная отправка
    e.preventDefault();
    alert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    contactPageForm.reset();
});