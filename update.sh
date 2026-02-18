#!/bin/sh

CUR=$(pwd)

CURRENT=$(cd "$(dirname "$0")" || exit;pwd)
echo "${CURRENT}"

cd "${CURRENT}" || exit
git pull --prune
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit
  exit $result
fi

result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit
  exit $result
fi
echo ""
pwd
npx -y pnpm@latest self-update && pnpm install -r && pnpm up -r && pnpm audit --fix && pnpm up -r && pnpm lint-fix && pnpm build && pnpm install -r --no-frozen-lockfile
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit
  exit $result
fi
cd "${CURRENT}/wasm/app/wasm" || exit
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit
  exit $result
fi
echo ""
pwd
cargo update
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit
  exit $result
fi

cd "${CURRENT}/with-preact" || exit
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit
  exit $result
fi
echo ""
pwd
npx -y pnpm@latest self-update && pnpm install -r && pnpm up -r && pnpm audit --fix && pnpm lint-fix && pnpm build
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit
  exit $result
fi

cd "${CURRENT}" || exit
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit
  exit $result
fi
git commit -am "Bumps node modules" && git push
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit
  exit $result
fi

cd "${CUR}" || exit
