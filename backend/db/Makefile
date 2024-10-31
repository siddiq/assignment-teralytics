# Variables
PYTHONPATH=.
CSV_FILE=../files/inventory.csv

# Bring up Docker Compose
docker_up:
	docker-compose up -d

# Stop Docker Compose
docker_down:
	docker-compose down

# Rebuild Docker Compose (optional)
docker_rebuild:
	docker-compose up --build -d

# Run all (run Docker and then FastAPI server)
run_all: docker_up run
