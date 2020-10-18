#!/bin/sh

flask db upgrade
#flask translate compile
exec gunicorn -b :8080 --access-logfile - --error-logfile - taskapp:app
