/***
 *  Essa função é responsável por aplicar os headers de segurança ao response.
 *  Essa função é chamada no middleware do Next.js para aplicar os headers de segurança ao response.
 */
export function applySecurityHeaders(
  responseHeaders: Headers,
  nonce: string,
): void {
  const isProd = (process.env.NODE_ENV as string) === 'production';
  const apiUrl = process.env.VITE_API_URL as string | undefined;
  const securityHeaders = getSecurityHeaders(isProd, apiUrl, nonce);

  Object.entries(securityHeaders).forEach(([key, value]) => {
    responseHeaders.set(key, value);
  });
}

/**
 *  Essa função é responsável por gerar os headers de segurança baseados em variáveis de ambiente e nonce.
 */
function getSecurityHeaders(
  isProd: boolean,
  apiUrl?: string,
  nonce?: string,
): Record<string, string> {
  return {
    'X-Frame-Options': 'DENY', // Evita que o conteúdo seja exibido em um iframe externo.
    'X-Content-Type-Options': 'nosniff', // Evita que o navegador execute conteúdo de tipos de mídia diferentes.
    'Referrer-Policy': 'strict-origin-when-cross-origin', // Evita que o navegador envie o referrer para outros domínios.
    ...(isProd
      ? { 'Strict-Transport-Security': 'max-age=63072000; includeSubDomains' }
      : {}),

    'Content-Security-Policy': [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}'`, // Permite que o navegador execute scripts com o nonce.
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:", // Permite que o navegador carregue imagens de qualquer domínio.
      `connect-src 'self' ${apiUrl}`, // Permite que o navegador conecte-se apenas ao domínio da aplicação.
    ].join('; '),
  };
}
