<h1>API DE CADASTRO DE CLIENTES E CONTATOS</h1>
<h2>Esta Api é destinada a Criação de um cadastro simples de clientes, podendo cada cliente ter diversos contatos com seus respectivos CRUDs<h2>
<h2>Criada para fins acadêmicos a fim de criar uma aplicação em formato full stack.<h2>
<p>O Front End dessa aplicação pode ser encontrado no seguinte <a href='https://github.com/hugommbrito/client_register_front_end'>repositório</a></p>
<hr/>
<h2><strong>Instalação da API</strong></h2>
<p>Para instalar a API faça um clone do repositório localmente em sua máquina e siga os passos a seguir</p>
<ol>
    <li>Configure o seu arquivo .env
        <ul>
            <li>Faça uma cópia do arquivo <i>.env.example</i> e renomeie para <i>.env</i></li>
            <li>Crie localmente o seu banco de dados com PostgreSQL</li>
            <li>Configure o, recém-criado, arquivo <i>.env</i> com os dados de seu banco seguindo o exemplo dado</li>
        </ul>
    </li>
    <li>Abra o terminal na pasta do repositório</li>
    <li>Instale as dapendências da aplicação: <code>npm install</code></li>
    <li>Rode as migrações: <code>npm run typeorm migration:run -- -d ./src/data-source</code></li>
    <li>Inicie o servidor local: <code>npm run server</code></li>
</ol>
<hr/>
<h2><strong>Rotas da Aplicação</strong></h2>
<h2>Para facilitar os seus testes, use o arquivo <i>Insomnia_2023-06-05</i> para importar as migrações automaticamente para o seu insomnia, se necessário, faça alterações no enviroment do insomnia</h2>
<ul>
    <li><h2 style="background-color:green;"><strong>Rotas de Clientes: '/client'</strong></h2>
        <ul>
            <li><h2 style="background-color:MediumSeaGreen; color:black; font-weight:bold">POST</h2></li>
                <p>Cria um novo cliente adionando a ele o contato informado</p>
                <strong>Parâmetros esperados:</strong>
                <pre>BODY:
{
    "name": "test 1",
    "email": "test1@mail.com",
    "phone": "12345678901"
}
                </pre>
                <strong>Retorno esperado:</strong>
                <pre>STATUS: 201(Created)
{
	"id": "064dd8f5-e47a-4c45-a516-42f89a0d9805",
	"name": "test 1",
	"createdAt": "2023-06-05T08:04:03.650Z",
	"contacts": [
		{
			"id": "50d7fe7e-7b88-4f8a-8fab-4fc7712ac882",
			"email": "test1@mail.com",
			"phone": "12345678901",
			"createdAt": "2023-06-05T08:04:03.661Z"
		}
	]
}
                </pre>
            <li><h2 style="background-color:MediumSeaGreen; color:black; font-weight:bold">GET</h2></li>
                <p>Retorna todos os clientes o banco de dados com os seus respectivos contatos</p>
                                <strong>Parâmetros esperados:</strong>
                <pre>
                </pre>
                <strong>Retorno esperado:</strong>
                <pre>STATUS: 200(OK)
[
	{
		"id": "064dd8f5-e47a-4c45-a516-42f89a0d9805",
		"name": "test 1",
		"createdAt": "2023-06-05T08:04:33.933Z",
		"contacts": [
			{
				"id": "0d7fe7e-7b88-4f8a-8fab-4fc7712ac882",
				"email": "test1@mail.com",
				"phone": "12345678901",
				"createdAt": "2023-06-05T08:59:41.407Z"
			},
			{
				"id": "7436b451-0e1e-4254-9034-5f92176bdf1e",
				"email": "test10@mail.com",
				"phone": "12345678901",
				"createdAt": "2023-06-05T08:59:41.407Z"
			}
		]
	},
	{
		"id": "4afa0265-2629-4045-a202-a189f42d857c",
		"name": "test 2",
		"createdAt": "2023-06-05T08:04:33.933Z",
		"contacts": [
			{
				"id": "7b8d78c9-df65-4f0d-9725-8489deb9abbb",
				"email": "test2@mail.com",
				"phone": "12345678901",
				"createdAt": "2023-06-05T08:59:41.407Z"
			}
		]
	}
]
                </pre>
            <li><h2 style="background-color:MediumSeaGreen; color:black; font-weight:bold">PATCH</h2></li>
                <p>Altera o nome de um determinado cliente</p>
                <strong>Parâmetros esperados:</strong>
                <pre>
PATH:
/clientID
~
BODY:
{
	"name": "test 10"
}
                </pre>
                <strong>Retorno esperado:</strong>
                <pre>STATUS: 200(OK)
{
	"name": "test 10",
	"id": "84c0efc4-08e7-4316-a846-ec0dc9641275",
	"createdAt": "2023-06-05T08:03:39.602Z",
	"contacts": [
		{
			"email": "test1@mail.com",
			"phone": "12345678901",
			"id": "7436b451-0e1e-4254-9034-5f92176bdf1e",
			"createdAt": "2023-06-05T08:03:39.657Z"
		}
	]
}
                </pre>
            <li><h2 style="background-color:MediumSeaGreen; color:black; font-weight:bold">DELETE</h2></li>
                <p>Deleta um determinado cliente juntamente com todos os contatos associados a ele</p>
                <strong>Parâmetros esperados:</strong>
                <pre>
PATH:
/clientID
                </pre>
                <strong>Retorno esperado:</strong>
                <pre>STATUS: 204(No Content)</pre>
        </ul>
    </li>
    <li><h2 style="background-color:green;"><strong>Rotas de Contatos: '/contacts'</strong></h2>
        <ul>
            <li><h2 style="background-color:MediumSeaGreen; color:black; font-weight:bold">POST</h2></li>
                <p>Cria um novo contato para o cliente informado, caso não exista cliente com esse nome, cria um novo cliente e adiciona o contato a ele</p>
                <strong>Parâmetros esperados:</strong>
                <pre>BODY:
{
	"name": "test 2",
	"email": "test2@mail.com",
	"phone": "12345678901"
}
                </pre>
                <strong>Retorno esperado:</strong>
                <pre>STATUS: 201(Created)
{
	"message": "Contato adicionado ao cliente test 2",
	"client": {
		"id": "4afa0265-2629-4045-a202-a189f42d857c",
		"name": "test 2",
		"createdAt": "2023-06-05T08:04:33.933Z",
		"contacts": [
			{
				"id": "7b8d78c9-df65-4f0d-9725-8489deb9abbb",
				"email": "test2@mail.com",
				"phone": "12345678901",
				"createdAt": "2023-06-05T08:59:41.407Z"
			}
		]
	}
}
                </pre>
            <li><h2 style="background-color:MediumSeaGreen; color:black; font-weight:bold">GET</h2></li>
                <p>Retorna todos os conatos o banco de dados.</p>
                <strong>Parâmetros esperados:</strong>
                <pre>
                </pre>
                <strong>Retorno esperado:</strong>
                <pre>STATUS: 200(OK)
[
	{
		"id": "6a29e172-bec5-4d3c-a356-402c60bf3800",
		"email": "test20@update.com",
		"phone": "12345678901",
		"createdAt": "2023-06-05T08:04:33.955Z"
	},
	{
		"id": "7b8d78c9-df65-4f0d-9725-8489deb9abbb",
		"email": "test30@update.com",
		"phone": "12345678901",
		"createdAt": "2023-06-05T08:04:33.955Z"
	},
	{
		"id": "4afa0265-2629-4045-a202-a189f42d857c",
		"email": "test40@update.com",
		"phone": "12345678901",
		"createdAt": "2023-06-05T08:04:33.955Z"
	}
]
                </pre>
            <li><h2 style="background-color:MediumSeaGreen; color:black; font-weight:bold">PATCH</h2></li>
                <p>Altera um ou todos os dados de um determinado contato</p>
                <strong>Parâmetros esperados:</strong>
                <pre>
PATH:
/contactID
~
BODY:
{
	"email": "test20@update.com"
}
ou
{
	"phone": "98765432109"
}
ou
{
    "email": "test20@update.com",
	"phone": "98765432109"
}
                </pre>
                <strong>Retorno esperado:</strong>
                <pre>STATUS: 200(OK)
{
	"name": "test 10",
	"id": "84c0efc4-08e7-4316-a846-ec0dc9641275",
	"createdAt": "2023-06-05T08:03:39.602Z",
	"contacts": [
		{
			"email": "test20@update.com",
			"phone": "98765432109",
			"id": "7436b451-0e1e-4254-9034-5f92176bdf1e",
			"createdAt": "2023-06-05T08:03:39.657Z"
		}
	]
}
                </pre>
            <li><h2 style="background-color:MediumSeaGreen; color:black; font-weight:bold">DELETE</h2></li>
                <p>Deleta um determinado contato da base de dados.</p>
                <strong>Parâmetros esperados:</strong>
                <pre>
PATH:
/contactID
                </pre>
                <strong>Retorno esperado:</strong>
                <pre>STATUS: 204(No Content)</pre>
        </ul>
    </li>
</ul>
