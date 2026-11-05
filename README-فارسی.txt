نصب (۳ مرحله)
1) محتوای این zip را داخل ریشه‌ی پروژه (کنار package.json) استخراج کنید.
2) ترمینال را در همان پوشه باز کنید و اول پیش‌نمایش بگیرید:
      node apply-seo.mjs --dry
   اگر لیست فایل‌ها درست بود، اجرای واقعی:
      node apply-seo.mjs
3) بعدش:
      npm run build
   اگر خطا داد، فایل‌ها را از پوشه‌ی .seo-backup-... برگردانید و متن خطا را برای من بفرستید.

این اسکریپت چه کار می‌کند
- noindex برای: login, register, account, cart, checkout, wishlist, track-order, shipping-info-combined, supabase-test و همه‌ی فایل‌های account/ و admin/
- افزودن description فارسی به صفحه‌های عمومی که ندارند (روی description موجود چیزی نمی‌نویسد)
- فیلتر کردن همان صفحه‌های خصوصی از sitemap در astro.config
- BaseLayout: افزودن پسوند «| آسین استیل» به عنوان، تگ‌های Open Graph / Twitter و JSON-LD سازمان

کارهایی که خودتان باید بکنید
- ساخت public/og-default.jpg با اندازه‌ی 1200×630
- حذف supabase-test.astro از سایت منتشرشده
- تغییر نام Price-list.astro به price-list.astro (و اصلاح لینک‌ها)
- اگر در BaseLayout قبلاً تگ og داشتید، اسکریپت دستش نمی‌زند.
اسکریپت چند بار اجرا شود مشکلی ندارد (تکراری اضافه نمی‌کند).
