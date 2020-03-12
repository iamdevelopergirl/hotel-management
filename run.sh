#!/bin/bash
kill $(lsof -i tcp:8080 | tail -n +2 | awk '{ print $2 }')
mvn spring-boot:run &
cd ./webapp/ && npm install && npm start
