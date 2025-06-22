// Скрипт плавной прокрутки
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});document.getElementById('receiptForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const file = form.receipt.files[0];
  const username = document.getElementById('username').value;

  if (!file || !username) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('username', username);

  try {
    const response = await fetch('/api/upload-receipt', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    document.getElementById('receiptStatus').innerText = result.message || 'Успешно отправлено!';
  } catch (error) {
    console.error(error);
    document.getElementById('receiptStatus').innerText = 'Ошибка при отправке.';
  }
});
