#!/bin/bash
mvn spring-boot:run &
cd ./webapp/ && npm start
