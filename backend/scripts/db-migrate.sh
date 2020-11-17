#!/bin/sh

counter=0

until [ $counter -gt 5 ]
do
  npm run db:migrate && break
  counter=$((counter+1))
  sleep 15
done
