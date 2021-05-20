#!/bin/bash

API="http://localhost:4741"
URL_PATH="/schoolYears/${SYID}/monthsOfYear"

curl "${API}${URL_PATH}/${MONTHID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "monthOfYear": {
      "month": "'"${MONTH}"'"
    }
  }'

echo
