@echo off
echo Cleaning Next.js cache...
if exist .next rmdir /s /q .next
if exist .turbo rmdir /s /q .turbo
if exist node_modules\.cache rmdir /s /q node_modules\.cache
echo Cache cleaned! You can now run npm run dev or npm run build
pause
