// Gera as regras de importação do ESLint baseado na configuração de features
function generateImportRules() {
  const zones = [];
  // Array de zonas de importação

  // Previnindo shared utilities de importar de features ou app directories
  zones.push({
    target: [
      './src/components/**',
      './src/config/**',
      './src/hooks/**',
      './src/lib/**',
      './src/stores/**',
      './src/types/**',
      './src/utils/**',
    ],
    from: ['./src/features/**', './src/app/**'],
    message:
      'Shared utilities should not import from features or app directories.',
  });

  // Prevenindo features importarem do app directory
  zones.push({
    target: `./src/features/**/**`,
    from: `./src/app/**/**`,
    message: `Features should not import from app directory.`,
  });

  // Feature dependency configuration
  // Configuração de dependências de features entre si
  const features = [
    {
      name: 'auth',
      allowedFeatures: [], // Features que auth pode importar (ex: auth não pode importar de ideas)
    },
    {
      name: 'ideas',
      allowedFeatures: ['auth'], // Ideas pode importar de auth
    },
    {
      name: 'profile',
      allowedFeatures: ['auth'], // Profile pode importar de auth
    },
    {
      name: 'reviews',
      allowedFeatures: ['auth'], // Reviews pode importar de auth
    },
  ];

  features.forEach((feature) => {
    // Pegando todas as features que o feature em questão não pode importar
    const forbiddenFeatures = features
      .filter(
        (f) =>
          f.name !== feature.name && !feature.allowedFeatures.includes(f.name),
      )
      .map((f) => f.name);
    // Se a feature tiver features que não pode importar, adiciona a zona de importação
    if (forbiddenFeatures.length > 0) {
      zones.push({
        target: `./src/features/${feature.name}/**`,
        from: `./src/features/{${forbiddenFeatures.join(',')}}/**`,
        message: `${feature.name} feature should not import from ${forbiddenFeatures.join(', ')} features.`,
      });
    }
  });

  return zones;
}

export const importRules = generateImportRules();
