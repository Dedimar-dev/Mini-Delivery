create table usuarios (
  id serial primary key,
  nome text not null,
  senha text not null,
  email text not null,
  nome_loja text not null
)

create table produtos (
  id serial primary key,
  usuario_id integer not null,
  nome text not null,
  descricao text,
  valor integer not null,
  quantidade integer not null,
  foreign key (usuario_id) references usuarios (id)
)

