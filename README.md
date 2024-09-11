## Server

### Install
``` bash
cd server 
npm install
```
### Run
``` bash
npm build && npm start # bun src/index.ts
```
### Run Development
``` bash
npx tsc --watch # terminal 1
npm run dev # terminal 2
--- OR ---
bun --watch src/index.ts 
```
### Test
``` bash
npm test # bun run test
```
#### Compile and Run Node Addons
``` bash 
npm run build-addons # bun run build-addons
```
---