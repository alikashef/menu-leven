# مرحله نصب وابستگی‌ها
FROM hub.hamdocker.ir/library/node:18.14.1 as dependencies
WORKDIR /nextl
COPY bun.lockb package.json ./
RUN curl -fsSL https://bun.sh/install | bash && \
    export BUN_INSTALL="/root/.bun" && \
    export PATH="$BUN_INSTALL/bin:$PATH" && \
    bun install

# مرحله بیلد
FROM hub.hamdocker.ir/library/node:18.14.1 as builder
WORKDIR /nextl
COPY . .
COPY --from=dependencies /nextl/node_modules ./node_modules
RUN export BUN_INSTALL="/root/.bun" && \
    export PATH="$BUN_INSTALL/bin:$PATH" && \
    bun build

# مرحله اجرا
FROM hub.hamdocker.ir/library/node:18.14.1 as runner
WORKDIR /nextl
COPY --from=builder /nextl/ ./
EXPOSE 3000
CMD ["bun", "start"]
