
ARG VARIANT="3.10-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/python:0-${VARIANT}

ARG NODE_VERSION="none"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

RUN sudo apt update
RUN sudo apt install postgresql -y && \
sudo service postgresql start && \
sudo -u postgres psql -c "CREATE USER vscode WITH PASSWORD 'c04e05b8-8fd1-4b20-96ed-6f0cb0ed40a2';" && \
sudo -u postgres psql -c "CREATE USER mealizedev WITH PASSWORD '6498fed5-8d49-4a85-82ee-03230c500fc6';" && \
sudo -u postgres psql -c "ALTER USER vscode WITH SUPERUSER;" && \
sudo -u postgres psql -c "CREATE DATABASE vscode WITH OWNER vscode" && \
sudo -u postgres psql -c "CREATE DATABASE mealize WITH OWNER mealizedev"

ENV DATABASE_URL=postgresql://mealizedev:6498fed5-8d49-4a85-82ee-03230c500fc6@localhost/mealize

ARG VARIANT="3.10-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/python:0-${VARIANT}

ARG NODE_VERSION="none"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

RUN sudo apt update
RUN sudo apt install postgresql -y && \
sudo service postgresql start && \
sudo -u postgres psql -c "CREATE USER vscode WITH PASSWORD 'c04e05b8-8fd1-4b20-96ed-6f0cb0ed40a2';" && \
sudo -u postgres psql -c "CREATE USER mealizedev WITH PASSWORD '6498fed5-8d49-4a85-82ee-03230c500fc6';" && \
sudo -u postgres psql -c "ALTER USER vscode WITH SUPERUSER;" && \
sudo -u postgres psql -c "CREATE DATABASE vscode WITH OWNER vscode" && \
sudo -u postgres psql -c "CREATE DATABASE mealize WITH OWNER mealizedev"

ENV DATABASE_URL=postgresql://mealizedev:6498fed5-8d49-4a85-82ee-03230c500fc6@localhost/mealize
