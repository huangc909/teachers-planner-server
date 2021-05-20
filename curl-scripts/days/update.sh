#!/bin/bash

API="http://localhost:4741"
URL_PATH="/schoolYears/${SYID}/months/${MONTHID}/days"

curl "${API}${URL_PATH}/${DAYID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "day": {
      "day": "'"${DAY}"'"
    }
  }'

echo
