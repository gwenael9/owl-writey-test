# On va lire chaque ligne du .env, car k6 ne supporte pas les fichiers .env directement
Get-Content .env | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.+)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
    }
}

# On exécute le script K6
k6 run perf/script.js
