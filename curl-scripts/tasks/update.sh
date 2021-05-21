#!/bin/bash

API="http://localhost:4741"
URL_PATH="/schoolYears/${SYID}/months/${MONTHID}/days/${DAYID}/tasks"

curl "${API}${URL_PATH}/${TASKID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "task": {
      "name": "'"${NAME}"'",
      "note": "'"${NOTE}"'",
      "dueDate": "'"${DUEDATE}"'",
      "priority": "'"${PRIORITY}"'",
      "checkmark": "'"${CHECKMARK}"'"
    }
  }'

echo
