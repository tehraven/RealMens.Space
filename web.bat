@echo off

set tag="latest"

FOR /f "tokens=*" %%i IN ('docker ps -a -q') DO docker rm -f %%i
FOR /f "tokens=*" %%i IN ('docker service ls -q') DO docker service rm -f %%i

docker build -t tehraven/realmens.space:%tag% .
docker rm -f web
docker run -d --name web -p 80:80 -p 443:443 -t tehraven/realmens.space:%tag%
  
docker ps
docker logs web