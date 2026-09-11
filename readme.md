# Meu Dog

Aplicação acadêmica para cadastro e gerenciamento de animais domésticos disponíveis para adoção. Esta primeira etapa entrega a API REST de criação e consulta de animais e uma apresentação visual inicial em React.

## Status atual

Implementado:

- `POST /api/animais`
- `GET /api/animais`
- `GET /api/animais/{id}`
- Persistência da entidade `Animal` no PostgreSQL existente
- Validações básicas do cadastro
- Frontend React/Vite com dados estáticos de demonstração

Ainda não implementado:

- `PUT` e `DELETE`
- Integração React + Spring Boot
- `fetch`, `axios`, React Query ou qualquer chamada HTTP no frontend
- Autenticação, imagens, adoção, adotantes e filtros

## Tecnologias

### Backend

- Java 17
- Spring Boot 3.5.7
- Spring Web
- Spring Data JPA / Hibernate
- Bean Validation
- PostgreSQL
- Maven

### Frontend

- React 19
- Vite
- JavaScript
- CSS

### Infraestrutura

- Docker Compose
- PostgreSQL 18.3

## Arquitetura

O backend segue o padrão simples usado no projeto `task-api-simple`: a camada web recebe HTTP, a camada application orquestra o caso de uso, o domínio representa o animal e a infraestrutura fornece o repository Spring Data JPA.

```text
HTTP
  -> web/AnimalController
  -> application/AnimalService
  -> infrastructure/AnimalRepository
  -> PostgreSQL
```

## Estrutura de pastas

```text
meu-dog/
├── src/main/java/com/jpcadinelli/meudog/
│   ├── MeuDogApplication.java
│   ├── application/
│   │   ├── AnimalNotFoundException.java
│   │   └── AnimalService.java
│   ├── domain/
│   │   ├── Animal.java
│   │   ├── AnimalId.java
│   │   ├── AnimalPorte.java
│   │   ├── AnimalSexo.java
│   │   └── StatusAdocao.java
│   ├── infrastructure/
│   │   └── AnimalRepository.java
│   └── web/
│       ├── AnimalController.java
│       ├── AnimalRequest.java
│       ├── AnimalResponse.java
│       └── ApiExceptionHandler.java
├── src/main/resources/application.properties
├── src/test/java/com/jpcadinelli/meudog/
├── frontend/
│   ├── src/components/
│   ├── src/data/dogs.js
│   ├── src/assets/dogs-hero.png
│   ├── src/App.jsx
│   └── src/styles.css
├── docker-compose.yml
├── pom.xml
└── readme.md
```

## Modelo de dados

A aplicação cria/atualiza somente a tabela `animais` no schema `meu-dog`.

| Coluna | Tipo | Obrigatória | Observação |
| --- | --- | --- | --- |
| `id` | UUID | sim | Gerado pela aplicação |
| `nome` | varchar | sim | Não vazio |
| `especie` | varchar | sim | Espécie do animal, como `Cachorro` ou `Gato` |
| `idade` | integer | sim | Maior ou igual a zero |
| `raca` | varchar | sim | Não vazio |
| `sexo` | varchar | sim | `MACHO` ou `FEMEA` |
| `porte` | varchar | sim | `PEQUENO`, `MEDIO` ou `GRANDE` |
| `descricao` | varchar | não | Texto opcional |
| `status` | varchar | sim | Começa como `DISPONIVEL` |
| `data_cadastro` | timestamp | sim | Definida no momento da criação |

O status e a data de cadastro não fazem parte do request de criação. O cliente também não informa o ID. A espécie é obrigatória e usa texto para permitir a inclusão de novas espécies sem alteração de enum ou de tabela.

## Banco de dados

O `docker-compose.yml` existente utiliza:

```text
host: localhost
porta: 5432
database: database
usuario: admin
senha: Admin@123
schema: meu-dog
```

Para iniciar o PostgreSQL e criar automaticamente o schema em uma instalação nova:

```bash
docker compose up -d postgres
```

O Compose monta a pasta `init/` em `/docker-entrypoint-initdb.d`. O script `init/01-create-schema.sql` executa `CREATE SCHEMA IF NOT EXISTS "meu-dog"`, portanto o schema é criado automaticamente quando o volume PostgreSQL é inicializado pela primeira vez. Para conferir:

```bash
docker exec postgres-dev psql -U admin -d database -c '\dn'
```

Se o volume já existir, o PostgreSQL não executa novamente os scripts de `init/`. Nesse caso, o schema que já foi criado permanece disponível; em um banco existente sem o schema, execute uma vez:

```bash
docker exec postgres-dev psql -U admin -d database \
  -c 'CREATE SCHEMA IF NOT EXISTS "meu-dog";'
```

Como o nome contém hífen, ele é tratado como identificador citado pela entidade JPA (`schema = "\"meu-dog\""`). A configuração também define `currentSchema`, `spring.datasource.hikari.schema` e `hibernate.default_schema` como `meu-dog`. Assim, o Hibernate trabalha com o nome real sem renomear ou criar outro schema.

O padrão `spring.jpa.hibernate.ddl-auto=update` cria a tabela `animais` na primeira inicialização da aplicação e adiciona a coluna `especie` quando ela ainda não existir. Para outro ambiente, a URL, as credenciais e o comportamento do DDL podem ser substituídos pelas variáveis `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` e `DB_DDL_AUTO`; o schema permanece fixo em `meu-dog` para preservar o banco existente.

Como a coluna `especie` é obrigatória para novos cadastros, bancos que já possuam animais cadastrados antes desta alteração devem preencher os registros antigos com `Cachorro` antes de tornar a coluna obrigatória. No banco deste projeto a tabela estava sem registros, então o Hibernate aplicou a alteração diretamente. Em evoluções futuras, o projeto deverá utilizar uma migration versionada, como Flyway, para tratar esse tipo de mudança com histórico.

Em um banco já preenchido, a preparação pode ser feita antes de iniciar o backend:

```sql
ALTER TABLE "meu-dog".animais ADD COLUMN IF NOT EXISTS especie VARCHAR(255);
UPDATE "meu-dog".animais SET especie = 'Cachorro' WHERE especie IS NULL;
ALTER TABLE "meu-dog".animais ALTER COLUMN especie SET NOT NULL;
```

## Executar o backend

Com Java 17 e Maven disponíveis:

```bash
./mvnw spring-boot:run
```

Ou, caso o Maven esteja instalado:

```bash
mvn spring-boot:run
```

A API fica disponível em `http://localhost:8080`.

## Executar o frontend

O frontend é uma apresentação vertical independente, sem consumo da API nesta etapa:

```bash
cd frontend
npm install
npm run dev
```

O Vite informará o endereço local, normalmente `http://localhost:5173`.

Os cards de Caramelo, Luna e Bob estão em `frontend/src/data/dogs.js` como mocks visuais, prontos para serem removidos quando a listagem real for integrada.

## Endpoints implementados

### Criar animal

`POST /api/animais`

Request:

```json
{
  "nome": "Caramelo",
  "especie": "Cachorro",
  "idade": 3,
  "raca": "Sem raça definida",
  "sexo": "MACHO",
  "porte": "MEDIO",
  "descricao": "Cão muito dócil e brincalhão"
}
```

Resposta: `201 Created`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Caramelo",
  "especie": "Cachorro",
  "idade": 3,
  "raca": "Sem raça definida",
  "sexo": "MACHO",
  "porte": "MEDIO",
  "descricao": "Cão muito dócil e brincalhão",
  "status": "DISPONIVEL",
  "dataCadastro": "2026-09-11T14:30:00"
}
```

```bash
curl -X POST http://localhost:8080/api/animais \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Caramelo",
    "especie": "Cachorro",
    "idade": 3,
    "raca": "Sem raça definida",
    "sexo": "MACHO",
    "porte": "MEDIO",
    "descricao": "Cão muito dócil e brincalhão"
  }'
```

Outro exemplo válido é um gato:

```json
{
  "nome": "Mimi",
  "especie": "Gato",
  "idade": 2,
  "raca": "SRD",
  "sexo": "FEMEA",
  "porte": "PEQUENO",
  "descricao": "Gata tranquila e carinhosa"
}
```

### Listar animais

`GET /api/animais` retorna todos os animais com `200 OK`.

```bash
curl http://localhost:8080/api/animais
```

### Buscar animal pelo ID

`GET /api/animais/{id}` retorna `200 OK` quando encontra o animal e `404 Not Found` quando não encontra.

```bash
curl http://localhost:8080/api/animais/550e8400-e29b-41d4-a716-446655440000
```

## Testes

Os testes cobrem:

- criação de animal válido com status disponível;
- listagem;
- busca de animal existente;
- busca de animal inexistente com exceção tratada;
- `201` e formato da resposta HTTP;
- request inválido com `400`.

Executar:

```bash
./mvnw test
```

O teste de contexto usa a configuração PostgreSQL da aplicação; portanto, mantenha o container iniciado para validar a conexão e a criação da tabela.

## Próximos passos

1. Adicionar atualização e exclusão de animais.
2. Criar a tela de cadastro e a listagem real no React.
3. Integrar o frontend com os três endpoints existentes.
4. Evoluir para adoção, imagens, filtros e autenticação.
