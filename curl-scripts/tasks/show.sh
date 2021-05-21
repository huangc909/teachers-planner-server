#!/bin/sh

API="http://localhost:4741"
URL_PATH="/schoolYears/${SYID}/months/${MONTHID}/days/${DAYID}/tasks"

curl "${API}${URL_PATH}/${TASKID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
