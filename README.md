# RichPay - Payment Gateway

Module payment gateway **RichApps Pay**

## Install

```bash
npm install richpay
```
Atau versi terbaru dari GitHub:
```bash
npm install github:gilangf3000/RichPay
```
## How to Use?

```javascript
// ES Module
import RichPay from 'richpay'

const client = new RichPay('API_KEY_KAMU')

const payment = await client.createPayment(10000)
console.log(payment)
```

```javascript
// CommonJS
const RichPay = require('richpay')

const client = new RichPay('API_KEY_KAMU')

client.createPayment(15000).then(console.log)
```

## Method

- createPayment(amount)
- checkStatus(trx_id)
- checkID(code, id)
- cancelPayment(trx_id)

## Structure

```bash
.
├── README.md
├── dist
│   ├── cjs
│   │   └── index.cjs
│   └── esm
│       └── index.js
├── package-lock.json
├── package.json
├── src
│   └── index.ts
├── test
├── tsconfig.cjs.json
├── tsconfig.esm.json
└── tsconfig.json
```

Support: CommonJS, ES Module, TypeScript
