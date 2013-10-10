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
echo "    Your devserver will be: http://$USER.sallasana.net/"
echo "    Hit Ctrl-C a few times to kill this server."
echo "-----------------------------------------------------------"
#echo "^[[0m"

# Start the devserver.
pkill -U $uid -f 'manage.py runfcgi'
while true; do
    #./manage.py runserver_plus 0.0.0.0:$port
    ./manage.py runfcgi host=127.0.0.1 port=$port daemonize=false debug=true
    sleep 1
done
