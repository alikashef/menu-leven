# مرحله پایه: نصب Bun
FROM hub.hamdocker.ir/library/node:18.14.1 as base
WORKDIR /nextl

# نصب Bun
RUN curl -fsSL https://bun.sh/install | bash

# تعریف متغیر PATH برای استفاده از Bun
ENV PATH="/root/.bun/bin:$PATH"

# مرحله نصب وابستگی‌ها
FROM base as dependencies
WORKDIR /nextl
COPY package.json bun.lockb ./
RUN bun install

# مرحله ساخت برنامه
FROM base as builder
WORKDIR /nextl
COPY . .
COPY --from=dependencies /nextl/node_modules ./node_modules
RUN npx next build  # استفاده از next build به جای bun build

# مرحله اجرای برنامه
FROM base as runner
WORKDIR /nextl
COPY --from=builder /nextl/ ./

EXPOSE 3000
CMD ["npx", "next", "start"]  # استفاده از npx برای اجرای سرور
