@echo off
cd /d "%~dp0"
python start-studio.py
if errorlevel 1 pause
