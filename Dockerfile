FROM python:3.9

ENV REACT_APP_BASE_URL=https://mealize.herokuapp.com/
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=true

WORKDIR /var/www

COPY . .

COPY /react-app/build/* app/static/

RUN pip install -r requirements.txt
RUN pip install psycopg2

CMD gunicorn app:app
