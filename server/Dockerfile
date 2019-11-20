FROM ubuntu:latest

RUN apt-get update -y && \
    apt-get install -y python3-pip python3-dev

WORKDIR /cutezoo_server

COPY ./requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

#EXPOSE 5000

ENTRYPOINT [ "python3" ]

CMD [ "server.py" ]