#!/bin/bash

API="http://localhost:4741"
URL_PATH="/schoolYears/${SYID}/daysOfYear"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "dayOfYear": {
      "day": "'"${DAY}"'"
    }
  }'

echo
