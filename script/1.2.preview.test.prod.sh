#!/bin/bash

pnpm use.test.prod
echo ===== current config.ts =====
./node_modules/.bin/cat src/pkg/env/config.ts
echo
pnpm build
pnpm preview
