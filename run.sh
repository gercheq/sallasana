uid=`id -u $USER`
port=`expr 10000 + $uid`
count=`netstat -ant | grep LISTEN | grep -c ":${port}\W"`
uname=`uname -s`
if [ $count -gt 0 ]; then
    echo "You're already running a server"
    exit 1
fi

#echo "^[[32m"
echo "-----------------------------------------------------------"
echo "    Your devserver will be: http://sallasana.net:$port/"
echo "    Hit Ctrl-C a few times to kill this server."
echo "-----------------------------------------------------------"
#echo "^[[0m"

# Start the devserver.
pkill -U $uid -f 'manage.py runserver'
while true; do
    ./manage.py runserver_plus 0.0.0.0:$port
    sleep 1
done
