#!/bin/bash

API="http://localhost:4741"
URL_PATH="/schoolYears/${SYID}/months"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "month": {
      "month": "'"${MONTH}"'",
      "number": "'"${NUM}"'"
    }
  }'

echo
