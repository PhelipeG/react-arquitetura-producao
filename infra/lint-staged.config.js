export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix --no-warn-ignored'],
  '*.{json,md,css,scss,html}': ['prettier --write'],
  '*.{ts,tsx}': ["bash -c 'npm run typecheck'"],
};
