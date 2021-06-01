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
- [x] Deve ser possível cadastrar um novo carro;


**Requisitos não Funcionais**

**Regra de Negócio**
- [x] Não poderá cadastrar um carro existente (com a mesma placa);
<!-- - [] Não deve ser possível alterar a placa de um carro cadastrado (já existente); -->
- [x] O carro deve ser cadastrado, por padrão, com disponibilidade ;
- [x] Somente administrador poderá cadastrar os carros;

# Listagem de Carros

**RF**
- [x] Deve ser possível listar todos os carros disponíveis;
- [x] Deve ser possível listar todos carros disponíveis pelo nome da categoria;
- [x] Deve ser possível listar todos carros disponíveis pelo nome da marca;
- [x] Deve ser possível listar todos carros disponíveis pelo nome da carro;

**RN**
- [x] O Usuário não precisa estar logado no carro

# Cadastro de especificação no carro
**RF**
- [x] Deve ser possível cadastrar uma especificação para um carro;
<!-- - [] Deve ser possível listar todas as especificações;
- [] Deve ser possível listar todos os carros -->

**RN**
- [x] Não deve ser possível cadastrar uma espcificação p/ um carro não cadastrado
- [x] Não deve ser possível cadastrar já existente para o mesmo carro;
- [x] Somente administrador poderá cadastrar os carros;

# Cadastro de imagens do Carro

**RF**
- [x] Deve ser possível cadastrar a imagem do carro


**RNF**
- [x] Utilizar o multer para upload dos arquivos

**RN**
- [x] O usuário poderá cadastrar mais de uma imagem para o mesmo carro
- [x] Somente administrador poderá cadastrar os carros;

# Agendamento do aluguel

**RF**
- [x] Deve ser possível listar todos os carros disponíveis

**RN**
- [x] O aluguel deve ter duração miníma de 24h;
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- [x] O Usuário deve estar logado na aplicação.
- [x] Ao realizar um aluguel, o status do carro deverá ser alterado para o indisponível

# Devolução do carro

 **RF**
- [x] Deve ser possível realizar a devolução de um carro

**RN**
- [x] Se o carro for devolvido com menos de 24hs, deverá ser cobrado diária completa
- [x] Ao  realizar a devolução, o carro deverá ser liberado para outro alluguel
- [x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
- [x] Ao realizar a devolução, deverá ser calculado o total do aluguel
- [x] Caso o horário de devolução seja superior ao horário previsto de entrega,
 deverá ser cobrado multa proporcional aos dias de atraso
- [x] Casa haja multa, deverá ser somado ao total do aluguel
- [x] O Usuário deve estar logado na aplicação.

# Listagem de Aluguéis para usuário

**RF**
- [] Deve ser possível realizar a busca de todos os aluguéis para o usuário

**RN**
- [] O usuário deve estar logado na aplicação
