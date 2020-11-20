##################################################
#	Commands for build, deploy and test	 #
##################################################

#------- Boot and Delete development server -----#
up:
	docker-compose up --build

down:
	docker-compose down -v

#------ Required for local devdependencies ------#
reinstall:
	rm -rf frontend/node_modules
	rm -rf backend/node_modules
	rm -rf test/node_modules
	yarn --cwd frontend
	yarn --cwd backend
	yarn --cwd test 

install:
	yarn --cwd test 
	yarn --cwd frontend
	yarn --cwd backend

uninstall:
	rm -rf frontend/node_modules
	rm -rf backend/node_modules
	rm -rf test/node_modules

#--------- Test code for repo standards ---------#
# Requires containers to be up:
cucumber:
	docker-compose exec frontend yarn bdd 

test:
	yarn run --cwd frontend test
	yarn run --cwd backend test

test-frontend: 
	yarn run --cwd frontend test 

test-backend: 
	yarn run --cwd backend test 

#--- Required code linting for repo standards --#
lint: 
	yarn run --cwd frontend lint
	yarn run --cwd backend lint

lint-frontend: 
	yarn run --cwd frontend lint

lint-backend: 
	yarn run --cwd backend lint
