#!/bin/sh

API="http://localhost:4741"
URL_PATH="/schoolYears/${SYID}/months/${MONTHID}/days"

curl "${API}${URL_PATH}/${DAYID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
