const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

// لدعم البيانات JSON
app.use(express.json());

// نقطة نهاية للتحقق من رمز التفعيل
app.post('/api/verify', (req, res) => {
  const { code } = req.body;
  // يمكنك استخدام ملف .env لتخزين الرموز، هنا مثال بسيط
  const allowedCodes = ["11111", "IAGSJ81628JAVW", "KABWJWHYSV", "KAHWUWHVSKV"];
  if (allowedCodes.includes(code)) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

// تقديم الملفات الثابتة من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// أي طلب غير معرف يعيد صفحة h1-index.html (الصفحة الرئيسية)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'h1-index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
