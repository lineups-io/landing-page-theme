#!/bin/sh
sed "s/GITHUB_ACCESS_TOKEN/$GITHUB_ACCESS_TOKEN/" package.json > .package.json
cat .package.json > package.json
rm .package.json
