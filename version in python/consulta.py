# coding: utf-8

import json
import urllib2
import sys

def main():

	nome = raw_input('Nome: ')

	obj = requisicao("https://api.github.com/users/" + nome)

	# Pegando o total de seguidores.
	qtdSeguidores = obj['followers']

	print '\nLogin: ' + obj['login'] + "\nSeguidores: " + str(qtdSeguidores)

	# Pega todos os repositórios de todos os seguidores.
	seguidores = getSeguidores(obj['followers_url'])

def getSeguidores(url):

	'''
		Definição das das variavéis:
		var obj: 		Recebe um array contendo todos os seguidores do usuário pesquisado.
		var usuario:  	Será utilizada para formata a saída da aplicação.
		var x: 			Utilizada para interar no array de objetos(obj).
		var url 		Armazena o endereço do seguidor de acordo com o interador.
		var seguidor 	Objeto com as informações do seguidor.
		var repos 		Lista de repositórios do seguidor.

	'''
	obj = requisicao(url)
	usuario = ''
	url = ''
	seguidor = ''
	repos = ''

	# Interarando no array de objetos que possui todos os seguidores do pesquisado.
	# Nesta interação será pego a url do seguidor e depois será feito o acesso a sua lista de repositórios.
	for x in obj:
		print str(type(x))
		# url do seguidor. Pegando o nome completo e a lista de repositório.
		url = x['url']
		seguidor = requisicao(url)

		if seguidor == None:
			print "NULLLLLLLLLLLLL"
			continue

		usuario = '\n ***** ' + str(usuario) + str(seguidor['name']) + '\n\n  '

		# Pegando a lista de repositório do seguidor e listando.
		url = seguidor['repos_url']
		repos = requisicao(url)

		# Interando na lista de repositórios do seguidor.
		for i in repos:
			usuario = '  ' + usuario + i['name'] + '\n'
			print usuario
			usuario = ''

def requisicao(url):

	try:
		# Requisição HTTP
		req = urllib2.urlopen(url + '?access_token=c94a7416808edf2eaa0abf3500d12f3eed903f55').read()
		obj = json.loads(req)
		return obj

	except:
		print '\n\nErro na requisição do json'
main()
