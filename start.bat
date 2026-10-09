@echo off
echo ========================================================
echo   Starting CARROT AI (Intelligent Decision Engine)
echo ========================================================

echo [1/2] Starting Python FastAPI Backend on http://127.0.0.1:8000...
start "CARROT AI - Backend" cmd /k "cd /d %~dp0backend && py -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 2 /nobreak >nul

echo [2/2] Starting React + Vite Frontend on http://localhost:5173...
start "CARROT AI - Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================================
echo   CARROT AI is now running!
echo   Frontend: http://localhost:5173
echo   Backend API: http://127.0.0.1:8000
echo   API Docs: http://127.0.0.1:8000/docs
echo ========================================================
pause
