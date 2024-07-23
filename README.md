### How to reproduce the bug

- start server => `npm run start`
- run client => `npm run client`

The server never saw any request coming and client never finish

Now, if we comment interceptor registration line 28 inside `src/main.ts`

- start server => `npm run start`
- run client => `npm run client`

Everything works fine
