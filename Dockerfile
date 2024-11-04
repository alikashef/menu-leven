# استفاده از یک تصویر پایه برای node
FROM node:18-alpine AS dependencies

# نصب bun
RUN curl -fsSL https://bun.sh/install | bash

# تعریف مسیر نصب bun در متغیرهای محیطی
ENV BUN_INSTALL="/root/.bun"
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

# تعیین دایرکتوری کاری
WORKDIR /app

# کپی کردن فایل‌های پکیج و نصب وابستگی‌ها با استفاده از bun
COPY package.json bun.lockb ./
RUN bun install

# مرحله ساخت
FROM node:18-alpine AS build

# کپی کردن وابستگی‌ها از مرحله قبلی
COPY --from=dependencies /app/node_modules ./node_modules

# تنظیم متغیرهای محیطی برای bun
ENV BUN_INSTALL="/root/.bun"
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

# اجرای دستور build با bun
RUN bun build

# تنظیم نهایی برای اجرا
CMD ["bun", "start"]
