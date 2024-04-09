run:
	docker-compose up -d

stop:
	docker-compose down

kill:
	docker-compose down -v

restart:
	docker-compose restart

logs:
	docker-compose logs -f

build:
	docker-compose build

check:
	docker-compose ps