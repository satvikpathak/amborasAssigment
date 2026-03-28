#!/bin/bash
echo "Starting install..."
npm install framer-motion lucide-react tailwind-merge --legacy-peer-deps
echo "Install finished with exit code $?"
ls -la node_modules/framer-motion
