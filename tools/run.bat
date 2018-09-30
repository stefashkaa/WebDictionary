@ECHO OFF
cd ..
git reset --hard 
git pull
appcmd stop sites "Web Dictionary"
dotnet publish -c Release -o c://inetpub/wwwroot/webdictionary
appcmd start sites "Web Dictionary"
EXIT 1