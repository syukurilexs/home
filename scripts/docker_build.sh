cd ../
docker build --pull --rm -f "Dockerfile" -t syukurilexshome:latest "." 
docker tag syukurilexshome:latest syukurilexs/home:latest
docker push syukurilexs/home:latest