export default {
  input: `${process.env.VITE_API_URL}/doc`,
  output: {
    format: 'prettier', // serve para formatar o código gerado com Prettier
    path: './src/types/generated', // serve para especificar o caminho onde os tipos de dados da API serão gerados
  },
  plugins: [
    {
      name: '@hey-api/typescript',
      exportFromIndex: false, // serve para exportar os tipos de dados da API como um objeto exportado
    },
    'zod', // serve para validar os dados da resposta da API com Zod
  ],
};
