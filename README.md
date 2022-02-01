# Documentação Projeto Node
 ## Conexão Banco de Dados(MongoDB)
 - O projeto foi desenvolvido utilizando docker, dessa maneira não é necessária a instalação do banco no seu sistema.
 ## Como Testar a Aplicação
 - Primeiramente é necessário clonar o repósitorio utilizando o comando a seguir -> git clone https://github.com/YuriDavello/sps_back.git
 - Com o projeto clonado em um diretório de preferência, abra a pasta no editor que preferir
 - Serão necessários três passos para a aplicação rodar, primeiramente digite -> "npm install"
 - Segundamente, crie uma pasta chamada "config" dentro da pasta "src", logo após crie um arquivo com o nome "secret.json" dentro de config e passe um objeto chave-valor com a chave sendo "key" e o valor o seu secret de preferência, em formato json dentro desse arquivo.
 - Por último, como o projeto foi feito utilizando Docker, iremos incializá-lo com o comando -> "docker-compose up"
 - obs: é necessário ter o Docker instalado na sua máquina
 - Pronto, o projeto será inicializado na sua máquina
 - O projeto está configurado para rodar na porta http://localhost:9000
