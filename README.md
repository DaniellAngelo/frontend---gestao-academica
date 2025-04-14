# GerenciadorDeAvaliaçõesDocker

Aplicação de gerenciamento de avaliação divida em microservices de aluno, disciplina e notas.

## INSTRUÇÕES DE USO:

### PASSO 1 - INSTALAR O DOCKER

Desinstale versões anteriores

``` 
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
 ```

configure o ambiente

```
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

instale o docker

``` 
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
``` 

verificando o funcionamento:

``` 
sudo docker run hello-world
```

para desinstalar use:

```
sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras 
```

```
 sudo rm -rf /var/lib/docker
 sudo rm -rf /var/lib/containerd 
```

### PASSO 2 - IMPLEMENTAR O POSTGRES

baixe a imagem do postgres:

```
docker pull postgres
```

execute os containers dos bancos para cada microservico:

``` 
docker run --name alunodb \
  -e POSTGRES_PASSWORD=5432 \
  -e POSTGRES_DB=alunodb \
  -p 5433:5432 \
  -v alunodb:/var/lib/postgresql/data \
  -d postgres
```

também sera necessário executar o comando alterando para disciplinadb e notadb

### PASSO 3 - IMPLEMENTAR O BACKEND SPRING

navegue até o diretório de cada BackEnd e aplique os seguintes comandos:

para construir a imagem

``` 
docker build -t backend .
```

alterando o nome da imagem conforme necessário.

executar o container
```
docker run --name aluno --network minha-rede -p 8081:8080 -d aluno
docker run --name disciplina --network minha-rede -p 8082:8080 -d disciplina
docker run --name nota --network minha-rede -p 8083:8080 -d nota
```

### Container do FRONTEND

```
docker build -t frontend-html .
docker run -d -p 8080:80 --name meu-frontend-container frontend-html
```
para acessar use: localhost:8080

### LINK PARA A IMAGEM NO DOCKERHUB

https://hub.docker.com/repository/docker/daniellangelo/frontend/general
