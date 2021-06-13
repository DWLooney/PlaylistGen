@echo off
echo starting spring boot server...
start cmd.exe @cmd /k "cd .\youtubegen-server-spring & mvnw spring-boot:start"
echo "started spring boot server!"

echo starting node server...
start cmd.exe @cmd /k "cd .\youtubegen-server-node & npm run start"
echo started node server!

echo starting mongodb...
start cmd.exe @cmd /k "cd .\youtubegen-server-spring\db & mongod --dbpath .\"
echo All processes started
pause