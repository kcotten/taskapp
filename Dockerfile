FROM python:3-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY src/requirements.txt ./

RUN pip3 install -r requirements.txt

# Bundle app source
COPY src /app
RUN chmod +x boot.sh

EXPOSE 8080
# CMD [ "python", "taskapp.py" ]
ENTRYPOINT [ "./boot.sh" ]
