# Como rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar o banco
```bash
npm run prisma:migrate
npm run prisma:seed
```

### 3. Rodar em modo dev (padrão)
No arquivo `.env`:
```env
APP_ENV=dev
```

Inicie o servidor:
```bash
npm run dev
```

Nesse modo:
- Pedidos e produtos usam o banco SQLite com Prisma (`PrismaOrderRepository` e `PrismaProductRepository`).
- O e-mail usa o `EtherealMailProvider` (precisa de internet e retorna o link do e-mail no campo `emailPreview`).

Para testar:
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": "cliente@teste.com",
    "items": [{ "productId": 1, "quantity": 1 }],
    "paymentMethod": "credit_card",
    "paymentDetails": { "cardNumber": "1234567812345678", "cvv": "123" }
  }'
```

---

### 4. Rodar em modo test (sem banco e sem internet)
No arquivo `.env`, altere apenas a variável:
```env
APP_ENV=test
```

Inicie o servidor:
```bash
npm run dev
```

Nesse modo:
- Os pedidos são guardados num array em memória (`InMemoryOrderRepository`) e os produtos vêm da memória (`InMemoryProductRepository`), sem tocar no banco de dados.
- O e-mail é simulado no terminal com `console.log` (`ConsoleMailProvider`), sem precisar de internet. O `emailPreview` retorna `null`.

---

### 5. Como trocar de modo
Basta mudar `APP_ENV=dev` ou `APP_ENV=test` no arquivo `.env` e reiniciar o servidor. Nenhum arquivo de código precisa ser alterado.

---
