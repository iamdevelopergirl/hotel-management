kill $(lsof -n -i4TCP:8080 | tail -n +2 | awk '{ print $2 }')
kill $(lsof -n -i4TCP:3000 | tail -n +2 | awk '{ print $2 }')
