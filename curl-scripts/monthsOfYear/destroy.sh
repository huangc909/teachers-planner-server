#!/bin/bash

API="http://localhost:4741"
URL_PATH="/schoolYears/${SYID}/monthsOfYear"

curl "${API}${URL_PATH}/${MONTHID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
