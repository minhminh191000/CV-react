#!/bin/bash
# Deploy script for CV-react on VPS
# Usage: ./deploy.sh
# Run this on the VPS whenever you want to update the site.

set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
WEB_ROOT="${WEB_ROOT:-/var/www/html}"

echo "==> Pulling latest changes..."
git -C "$REPO_DIR" fetch origin
git -C "$REPO_DIR" checkout main
git -C "$REPO_DIR" pull origin main

echo "==> Installing dependencies..."
npm --prefix "$REPO_DIR" install --silent

echo "==> Building..."
npm --prefix "$REPO_DIR" run build

echo "==> Copying dist/ to $WEB_ROOT ..."
cp -r "$REPO_DIR/dist/." "$WEB_ROOT/"

echo "==> Done! Site updated."
