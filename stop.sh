kill $(lsof -i tcp:8080 | tail -n +2 | awk '{ print $2 }')
kill $(lsof -i tcp:3000 | tail -n +2 | awk '{ print $2 }')
