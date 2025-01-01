FROM mongo

WORKDIR /seed
COPY *.json ./
CMD find . -name "*.json" -exec basename {} .json \; | xargs -I@ mongoimport --host mongo --collection @ --type json --file @.json --jsonArray
