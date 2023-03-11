## Arquivo de ambiente

Para a conexão com o banco de dados é necessário criar um arquivo com a extensão .env como no exemplo abaixo:

```
PORT=3000
DB_HOST=localhost
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```


* [x] Colocar login como rota principal - FRONT
* [x] Colocar tela de cadastro junto a de login
* [ ] Colocar api de login do google junto a tela de login
* [x] Criar regras de autenticação
* [ ] Criar processo de gerenciamento dos perfis conforme documentado no modulo A (2.2)
* [ ] Criar um grafico na tela de estatistica que filtre o mês e traga quantidade de agendamento por paciente por periodo



Administrador/Gerente é o usuário que ao realizar login com e-mail e senha,
possuirá acesso a todas as funcionalidades do sistema, sendo único responsável pelo
cadastro de novos dentistas, novos procedimentos, novas salas e inativação de outro
usuário com diferente perfil.

Usuário Dentista é o usuário que ao realizar login com e-mail e senha, possuirá
acesso a cadastro de novos pacientes, agendamento de consultas e visualização de
consultas e estatísticas de consultas somente atreladas ao seu perfil.

Usuário Paciente é o usuário que terá acesso ao cadastro na plataforma com
preenchimento de formulário de dados pessoais ou por uma conta Google e depois
de logado com e-mail e senha terá acesso ao cadastro de novas consultas e
visualização de consultas e estatísticas de consultas somente atreladas ao seu perfil.
