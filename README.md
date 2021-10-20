# Microservices-lab

This is just a little project to test the micro-services architecture with nestjs :fire: applying different approaches.

## Requirements
- nodejs version installed an greater than 14.X version.
- a rabbitmq node available to be used (can use docker-compose for local node or [cloudamqp](https://www.cloudamqp.com/) to create a free node.

## Installation

- As this is a monorepo created with [lerna](https://lerna.js.org/) at the root path of the repository, execute this:

```bash
npx lerna bootstrap
```
- After that, please check the `.env_example` file on each micro-service and create a `.env` file based on the example file.

- finally on each micro-service root path, execute this:
```bash
npm run start:dev
```

## Usage
Import this postman collection to test the endpoints and see the terminal of each micro-service in order to check what is going on.

```json
{
	"info": {
		"_postman_id": "34952992-bca9-4752-85e2-bb4a5fc1791b",
		"name": "microservices-lab",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "auth-ms",
			"item": [
				{
					"name": "auth - register",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"fullName\": \"john test\",\n    \"email\": \"john.test@test.com\",\n    \"phoneNumber\": \"3001234567\",\n    \"password\": \"123456\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/auth/register",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"auth",
								"register"
							]
						}
					},
					"response": []
				},
				{
					"name": "auth - login",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"email\": \"john.test@test.com\",\n    \"password\": \"123456\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/auth/login",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"auth",
								"login"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "nitification-ms",
			"item": []
		}
	]
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
