FROM oven/bun:1

LABEL org.opencontainers.image.source https://github.com/mmccorm1ck/comingSoon

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

USER bun

ENV PORT=3000

EXPOSE 3000

CMD [ "bun", "run", "index.tsx" ]