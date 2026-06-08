# MiniStock Mobile

Aplicativo React Native com Expo para a equipe de estoque da MiniStock consultar, cadastrar, editar e remover produtos usando a API publica DummyJSON.

## Funcionalidades

- Login em `/auth/login` com persistencia do token via AsyncStorage.
- Lista de produtos com FlatList, paginacao infinita e pull to refresh.
- Busca por termo e filtro por categoria.
- Tela de detalhes com preco, estoque, avaliacao e descricao.
- Cadastro, edicao e exclusao com confirmacao.
- Logout funcional.

## Stack

- React Native com Expo
- axios
- React Navigation native-stack
- AsyncStorage

## Credenciais de teste

```text
Usuario: emilys
Senha:   emilyspass
```

## Como rodar

```bash
npm install
npm start
```

Depois, abra o app pelo Expo Go ou por um emulador Android/iOS.

## Organizacao

```text
src/
  components/      Componentes reutilizaveis
  contexts/        Estado de autenticacao
  navigation/      Pilhas de navegacao
  screens/         Telas do aplicativo
  services/        Instancia axios e servicos de API
  theme/           Cores compartilhadas
```

## Axios

A instancia unica fica em `src/services/api.js`, com `baseURL`, `timeout`, interceptor de request para injetar `Authorization: Bearer <token>` e interceptor de response para tratar 401, 404, erros 5xx e timeout.

As telas nao chamam `axios` diretamente. Elas usam `authService` e `productService`, mantendo a separacao entre interface e comunicacao com a API. Filtros e paginacao usam o objeto `params` do axios.

Para verificar as regras principais:

```bash
npm run lint:axios
```

## Capturas de tela

as imagens e videos diponivel no portal



