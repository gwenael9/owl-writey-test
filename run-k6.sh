#!/bin/bash

# On va lire chaque ligne du .env, car k6 ne supporte pas les fichiers .env directement
export $(grep -v '^#' .env | xargs)

# On exécute le script K6
k6 run perf/script.js