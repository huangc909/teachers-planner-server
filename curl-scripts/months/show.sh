#!/bin/sh

API="http://localhost:4741"
URL_PATH="/schoolYears/${SYID}/months"

curl "${API}${URL_PATH}/${MONTHID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
