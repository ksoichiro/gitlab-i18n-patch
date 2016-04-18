# Usage: ./translate.sh VERSION
#  e.g.
#   ./translate.sh v8.2.0
#   -> patches/v8.2.0/app_ja.patch will be generated
version=$1

if [ -z $version ]; then
  exit 1
fi

pushd gitlabhq > /dev/null
git checkout $version
popd > /dev/null
npm run build

mkdir -p patches/$version/
pushd gitlabhq > /dev/null
git diff > ../patches/$version/app_ja.patch
git reset --hard HEAD
popd > /dev/null
