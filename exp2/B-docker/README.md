# Exp2-B Docker environment

This folder is self-contained with its own:
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `public/index.html`

Commands:

```bash
cd exp2/B-docker
docker build -t exp2b-app .
docker run -d --name exp2b-container -p 8080:80 exp2b-app
```

Open `http://localhost:8080`.

For Docker Desktop viva:
- Image: `exp2b-app`
- Container: `exp2b-container` (running)
