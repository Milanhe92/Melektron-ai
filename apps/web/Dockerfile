# Faza 1: Builder
FROM node:18.17.0-alpine AS builder
WORKDIR /app
COPY package*.json./
# Instaliraj samo produkcione zavisnosti radi manje slike
RUN npm ci --omit=dev
# Kopiraj ostatak koda pre build-a
COPY..
RUN npm run build

# Faza 2: Produkcija
FROM node:18.17.0-alpine
WORKDIR /app

# Kreiraj korisnika sa manjim privilegijama
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Kopiraj build artefakte iz 'builder' faze
# Koristi se standalone izlaz za optimizovanu sliku
COPY --from=builder /app/.next/standalone./
COPY --from=builder /app/.next/static./.next/static
COPY --from=builder /app/public./public

# Postavi vlasništvo
RUN chown -R nextjs:nodejs /app

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]