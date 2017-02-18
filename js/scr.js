function pesquisa () {

	document.getElementById("saida").value = " "
	var nome = document.getElementById("nome").value + " "

	obj = requisicao("https://api.github.com/users/" + nome)

	// Pegando o total de seguidores.
	var qtdSeguidores = obj.followers
	
	document.getElementById("saida").value += "Login: " + obj.login + "\nSeguidores: " + qtdSeguidores + "\n\n"

	// Pega todos os repositórios de todos os seguidores.
	var seguidores = getSeguidores(obj.followers_url)

}

function getSeguidores (url) {

	/*
		Definição das das variavéis:
		var obj: 		Recebe um array contendo todos os seguidores do usuário pesquisado.
		var usuario:  	Será utilizada para formata a saída da aplicação.
		var x: 			Utilizada para interar no array de objetos(obj).
		var url 		Armazena o endereço do seguidor de acordo com o interador.
		var seguidor 	Objeto com as informações do seguidor.
		var repos 		Lista de repositórios do seguidor.

	*/
	var obj = requisicao(url)
	var usuario = ""
	var x
	var url
	var seguidor
	var repos

	// Interarando no array de objetos que possui todos os seguidores do pesquisado.
	// Nesta interação será pego a url do seguidor e depois será feito o acesso a sua lista de repositórios.
	for (x in obj){

		// url do seguidor. Pegando o nome completo e a lista de repositório.
		url = obj[x].url
		seguidor = requisicao(url)

		usuario = "\n***** " + usuario + seguidor.name + "\n\n"

		// Pegando a lista de repositório do seguidor e listando.
		url = seguidor.repos_url
		repos = requisicao(url)

		// Interando na lista de repositórios do seguidor.
		var i
		for(i in repos){
			usuario += repos[i].name + "\n"
			document.getElementById("saida").value += usuario
			usuario = ""
		}

	}

}// Fim da função getSeguidores()

// Função que faz a requisição para a url passada, converte para um objeto javascript e o retorna.
function requisicao(url) {
	// Requisição HTTP
	var req = new XMLHttpRequest()
	req.open('GET', url + "?access_token=c94a7416808edf2eaa0abf3500d12f3eed903f55", false)
	req.send()

	var out = req.responseText
	var obj = JSON.parse(out)

	return obj
}
