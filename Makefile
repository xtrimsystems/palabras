.PHONY: npm-install start build up dev autobuild start-dev syn exec

npm-install:
	docker-compose run --rm -w /www node npm install

start: build up # Build the application and serves it at localhost:5000

build:
	docker-compose run --rm -w /www node npm run build
up:
	docker-compose run --rm -w /www node npm run start
dev:
	docker-compose run --rm -w /www node npm run dev # Builds the application, listens to changes on files and serves it at localhost:5000
sync:
	docker-compose run --rm -w /www node npm run sync # Allows external devices to connect to localhost

exec:
	docker-compose run --rm -w /www node npm run build