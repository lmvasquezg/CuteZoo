FROM ubuntu:latest

RUN apt-get update -y && \
    apt-get install -y python3-pip python3-dev git
    # apt-get install -y git

WORKDIR /cutezoo_server

RUN git clone https://github.com/lmvasquezg/CuteZoo.git

# COPY ./CuteZoo/server/requirements.txt .

RUN pip3 install -r CuteZoo/server/requirements.txt

COPY . .

EXPOSE 5000

ENTRYPOINT [ "python3" ]

CMD [ "CuteZoo/server/server.py" ]