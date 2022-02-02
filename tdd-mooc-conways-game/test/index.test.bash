output=$(eval node index.js)
expect=$(eval cat << EOF
. . . . .
. O O O .
. O O O .
O O . O O
. O O O .
. O O O .
. . O . .
. . . . .

RLE:
x = 5, y = 8
\$b3o\$b3o\$2ob2o\$b3o\$b3o\$2bo\$!
EOF
)
if [[ "$output" == "$expect" ]]
then
  tput setaf 2; echo "E2E test success"
else
  tput setaf 1; echo "E2E test failed"
  echo "Output was:"
  echo "$output"
  echo "$expect"
fi