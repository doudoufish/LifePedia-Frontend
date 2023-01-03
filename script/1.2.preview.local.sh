#!/bin/bash

pnpm use.local
echo ===== current config.ts =====
./node_modules/.bin/cat src/pkg/env/config.ts
echo
pnpm build
pnpm preview
