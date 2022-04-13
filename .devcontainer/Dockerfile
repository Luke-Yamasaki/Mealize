ARG VARIANT="3.10-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/python:0-${VARIANT}

ARG NODE_VERSION='none'
RUN if ["${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

RUN sudo apt updte
RUN sudo apt install postgresql -y && \
sudo service postgresql start && \
sudo -u postgres psql -c "CREATE USER vscode WITH PASSWORD 'c963afc5-1d49-4576-9d49-baee82766610';" && \
sudo -u postgres psql -c "CREATE USER mealizedev WITH PASSWORD '0cbaf725-37af-4e4a-aaf2-6ee8a073fd85';" && \
sudo -u postgres psql -c "ALTER USER vscode WITH SUPERUSER;" && \
sudo -u postgres psql -c "CREATE DATABASE vscode WITH OWNER vscode" && \
sudo -u postgres psql -c "CREATE DATABASE mealize WITH OWNER mealizedev"\

ENV DATABASE_URL=postgresql://mealizedv:0cbaf725-37af-4e4a-aaf2-6ee8a073fd85@localhost/mealize
