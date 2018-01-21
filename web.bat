@echo off

set tag="latest"

docker build -t tehraven/realmens.space:%tag% .
docker rm -f web
docker run -d --name web -p 80:80 -p 443:443 -t tehraven/realmens.space:%tag%
  
docker ps
docker logs web