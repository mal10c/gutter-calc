@echo off

electron-packager . --overwrite --platform=win32 --arch=x64 --prune=true --out=release-builds --electron-version="1.4.13"
