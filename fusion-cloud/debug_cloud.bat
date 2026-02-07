@echo off
title Fusion-Cloud Debug
cd /d F:\MWA\fusion-cloud
echo Starting Security Ledger Dashboard with logging...
npm run dev > dev_output.log 2>&1
