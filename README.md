### How to reproduce the bug

- start server => `npm run start`
- run client => `npm run client`

The server never saw any requests coming, and the client never finished
Now, if we comment out the interceptor registration on line `28` inside `src/main.ts`

- start server => `npm run start`
- run client => `npm run client`

Everything works fine
