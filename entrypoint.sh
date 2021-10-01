#!/bin/sh

test -n "$BASE_API_URL"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#BASE_API_URL#$BASE_API_URL#g"

exec "$@"