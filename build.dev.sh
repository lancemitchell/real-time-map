#!/bin/bash

# Settings
TEMPLATE_FILES="config.json favicon.ico favicon.png index.html"
CONFIG_JSON_VERSION_FILE="config.json"
BUILD_UNIX_TIMESTAMP_FILE="build.meta"
BUILD_PUBLIC_DIR="splmap.dev"
BUILD_TEMPLATE_DIR="_splmap.Template"
BUILD_RELATIVE_PATH="../_Builds"
BUILD_PROD_RELATIVE_PATH="./dist"
ZIP_CMD="/usr/bin/7z"

# Init
UNIX_TIMESTAMP=`date +%s`
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
BUILD_ROOT_PATH="$CURRENT_DIR/$BUILD_RELATIVE_PATH"
BUILD_TEMPLATE_PATH="$BUILD_ROOT_PATH/$BUILD_TEMPLATE_DIR"
BUILD_PUBLIC_PATH="$BUILD_ROOT_PATH/$BUILD_PUBLIC_DIR"
CONFIG_JSON_VERSION_PATH="$BUILD_TEMPLATE_PATH/$CONFIG_JSON_VERSION_FILE"
VERSION=`grep "version" $CONFIG_JSON_VERSION_PATH | tr -d '[:space:]",' | cut -f2 -d":"`
BUILD_PUBLIC_ZIP_FILE="${BUILD_PUBLIC_DIR}.v${VERSION}.zip"
BUILD_PUBLIC_ZIP_FILE_PATH="$BUILD_ROOT_PATH/${BUILD_PUBLIC_ZIP_FILE}"
BUILD_UNIX_TIMESTAMP_PATH="${BUILD_PUBLIC_PATH}/${BUILD_UNIX_TIMESTAMP_FILE}"

# Generate new build
echo "---- BUILDING v${VERSION} ----"
npm run build
EXIT_CODE=$?
if [[ $EXIT_CODE != 0 ]]; then exit $EXIT_CODE; fi

# Copy files
echo "---- MOVING v${VERSION} FILES ----"
rm -rf ${BUILD_PUBLIC_PATH}
mkdir ${BUILD_PUBLIC_PATH}
cp -ar ${CURRENT_DIR}/${BUILD_PROD_RELATIVE_PATH}/* ${BUILD_PUBLIC_PATH}
for file in $TEMPLATE_FILES; do cp -a $BUILD_TEMPLATE_PATH/$file ${BUILD_PUBLIC_PATH}; done

echo "---- Creating Build Metadata File: ${BUILD_UNIX_TIMESTAMP_PATH}"
echo "SpartanLync v${VERSION}" > ${BUILD_UNIX_TIMESTAMP_PATH}
echo "${UNIX_TIMESTAMP}" >> ${BUILD_UNIX_TIMESTAMP_PATH}

# Create ZIP file
echo "---- ZIPPING BUILD TO ${BUILD_PUBLIC_ZIP_FILE} ----"
rm -rf ${BUILD_PUBLIC_ZIP_FILE_PATH}
(cd ${BUILD_ROOT_PATH} && ${ZIP_CMD} a -r ${BUILD_PUBLIC_ZIP_FILE} ${BUILD_PUBLIC_DIR} > /dev/null)

