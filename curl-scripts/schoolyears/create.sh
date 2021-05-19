#!/bin/bash

API="http://localhost:4741"
URL_PATH="/schoolyears"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "schoolyear": {
      "startYear": "'"${START}"'",
      "endYear": "'"${END}"'"
    }
  }'

echo
