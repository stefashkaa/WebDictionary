@ECHO OFF
cd ..
git reset --hard 
git pull
REM The following commands does not work due to lack of write permissions
REM appcmd stop sites "Web Dictionary"
REM appcmd start sites "Web Dictionary"
REM You should use iisreset
iisreset /stop
dotnet publish -c Release -o c://inetpub/wwwroot/webdictionary
iisreset /start
EXIT 1