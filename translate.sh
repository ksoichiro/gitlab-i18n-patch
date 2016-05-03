# Usage: ./translate.sh VERSION
#  e.g.
#   ./translate.sh v8.2.0
#   -> patches/v8.2.0/app_ja.patch will be generated
version=$1

if [ -z $version ]; then
  versions=(
    "v8.3.0"
    "v8.3.8"
    "v8.4.0"
    "v8.4.9"
    "v8.5.0"
    "v8.5.11"
    "v8.6.0"
    "v8.6.7"
    "v8.7.0"
  )
else
  versions=($version)
fi

for v in ${versions[@]}; do
  echo "Translate ${v}"
  pushd gitlabhq > /dev/null
  git checkout $v > /dev/null
  popd > /dev/null
  npm run build

  mkdir -p patches/$v/
  pushd gitlabhq > /dev/null
  git diff > ../patches/$v/app_ja.patch
  git reset --hard HEAD > /dev/null
  popd > /dev/null
done
