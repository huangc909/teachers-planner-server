#!/bin/bash

API="http://localhost:4741"
URL_PATH="/schoolYears"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "schoolyear": {
      "startYear": "'"${START}"'",
      "endYear": "'"${END}"'"
    }
  }'

echo
