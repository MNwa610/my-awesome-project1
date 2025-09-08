// Получаем элементы
const dialog = document.getElementById('contactDialog');
const openButton = document.getElementById('openDialog');
const closeButton = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

// Функция для форматирования телефона
function formatPhoneNumber(input) {
    const digits = input.value.replace(/\D/g, '').slice(0, 11);
    const normalizedDigits = digits.replace(/^8/, '7'); // нормализуем 8 -> 7
    
    const parts = [];
    if (normalizedDigits.length > 0) parts.push('+7');
    if (normalizedDigits.length > 1) parts.push(' (' + normalizedDigits.slice(1, 4));
    if (normalizedDigits.length >= 4) parts[parts.length - 1] += ')';
    if (normalizedDigits.length >= 5) parts.push(' ' + normalizedDigits.slice(4, 7));
    if (normalizedDigits.length >= 8) parts.push('-' + normalizedDigits.slice(7, 9));
    if (normalizedDigits.length >= 10) parts.push('-' + normalizedDigits.slice(9, 11));
    
    input.value = parts.join('');
}

// Обработчик события input для телефона
const phoneInput = document.getElementById('phone');
phoneInput?.addEventListener('input', () => {
    formatPhoneNumber(phoneInput);
});

// Открытие модального окна
openButton.addEventListener('click', () => {
    lastActive = document.activeElement;
    dialog.showModal();
    dialog.querySelector('input, select, textarea, button')?.focus();
});

// Закрытие модального окна
closeButton.addEventListener('click', () => {
    dialog.close('cancel');
});

// Обработка отправки формы
form?.addEventListener('submit', (e) => {
    // 1) Сброс кастомных сообщений
    [...form.elements].forEach(el => el.setCustomValidity?.(''));
    
    // 2) Проверка встроенных ограничений
    if (!form.checkValidity()) {
        e.preventDefault();
        
        // Пример: таргетированное сообщение для email
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }
        
        form.reportValidity(); // показать браузерные подсказки
        
        // Ally: подсветка проблемных полей
        [...form.elements].forEach(el => {
            if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
        });
        return;
    }
    
    // 3) Успешная «отправка» (без сервера)
    e.preventDefault();
    alert('Форма успешно отправлена!');
    dialog.close('success');
    form.reset();
});

// Возврат фокуса после закрытия модалки
dialog.addEventListener('close', () => {
    lastActive?.focus();
});