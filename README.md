1- Testes Unitários
- Funções
- Não inclui rotas


2- Testes de Integração
-> routes -> controllers -> useCases -> repository
<- repository <- usesCases <- controllers <- routes

Metodologia
TDD - Test Driven Development

DDD - Domain Driven Design

# Cadastro de Carro

**Requisitos Funcionais**
- [] Deve ser possível cadastrar um novo carro;
- [] Deve ser possível listar todas as categorias;

**Requisitos não Funcionais**

**Regra de Negócio**
- [] Não poderá cadastrar um carro existente (com a mesma placa);
- [] Não deve ser possível alterar a placa de um carro cadastrado (já existente);
- [] O carro deve ser cadastrado, por padrão, com disponibilidade ;
- [] Somente administrador poderá cadastrar os carros;

# Listagem de Carros

**RF**
- [] Deve ser possível listar todos os carros disponíveis;
- [] Deve ser possível listar todos carros disponíveis pelo nome da categoria;
- [] Deve ser possível listar todos carros disponíveis pelo nome da marca;
- [] Deve ser possível listar todos carros disponíveis pelo nome da carro;

**RN**
- [] O Usuário não precisa estar logado no carro

# Cadastro de especificação no carro
**RF**
- [] Deve ser possível cadastrar uma especificação para um carro;
- [] Deve ser possível listar todas as especificações;
- [] Deve ser possível listar todos os carros

**RN**
- [] Não deve ser possível cadastrar uma espcificação p/ um carro não cadastrado
- [] Não deve ser possível cadastrar já existente para o mesmo carro;
- [] Somente administrador poderá cadastrar os carros;

# Cadastro de imagens do Carro

**RF**
- [] Deve ser possível cadastrar a imagem do carro
- [] Deve ser possível listar todos os carros

**RNF**
- []Utilizar o multer para upload dos arquivos

**RN**
- [] O usuário poderá cadastrar mais de uma imagem para o mesmo carro
- [] Somente administrador poderá cadastrar os carros;

# Agendamento do aluguel

**RF**
- [] Deve ser possível listar todos

**RN**
- [] O aluguel deve ter duração miníma de 24h;
- [] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
