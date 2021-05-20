#!/bin/bash

API="http://localhost:4741"
URL_PATH="/schoolYears/${SYID}/daysOfYear"

curl "${API}${URL_PATH}/${DAYID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
