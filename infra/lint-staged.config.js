const isBackendFile = (file) =>
  file.includes('/backend/') || file.startsWith('backend/');

const withoutBackend = (filenames) =>
  filenames.filter((file) => !isBackendFile(file));

const quote = (file) => `"${file}"`;

export default {
  '*.{js,jsx,ts,tsx}': (filenames) => {
    const files = withoutBackend(filenames);
    return files.length > 0
      ? [`eslint --fix ${files.map(quote).join(' ')}`]
      : [];
  },
  '*.{json,md,css,scss,html}': (filenames) => {
    const files = withoutBackend(filenames);
    return files.length > 0
      ? [`prettier --write ${files.map(quote).join(' ')}`]
      : [];
  },
  '*.{ts,tsx}': (filenames) => {
    const files = withoutBackend(filenames);
    return files.length > 0 ? ["bash -c 'npm run typecheck'"] : [];
  },
};
