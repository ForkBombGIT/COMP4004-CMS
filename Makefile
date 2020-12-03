##################################################
#	Commands for build, deploy and test	 #
##################################################

#------- Boot and Delete development server -----#
up:
	docker-compose build --parallel
	COMPOSE_HTTP_TIMEOUT=200 docker-compose up 

down:
	docker-compose down -v

#------ Required for local devdependencies ------#
reinstall:
	rm -rf frontend/node_modules
	rm -rf backend/node_modules
	yarn --cwd frontend
	yarn --cwd backend

install:
	yarn --cwd frontend
	yarn --cwd backend

uninstall:
	rm -rf frontend/node_modules
	rm -rf backend/node_modules

#--------- Test code for repo standards ---------#
# Requires containers to be up:
testAcceptance:
	yarn --cwd backend bdd 

testFrontend: 
	yarn --cwd frontend test 

testBackend: 
	yarn --cwd backend testLocal

