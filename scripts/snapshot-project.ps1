#requires -Version 5.1
param(
  [string]$ProjectPath = "E:\gym-master-2026\gm-promotion",
  [string]$SnapshotRoot = "E:\gym-master-2026\_gm-promotion-snapshots"
)

$ErrorActionPreference = "Stop"
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$destination = Join-Path $SnapshotRoot "gm-promotion-$stamp"

New-Item -ItemType Directory -Force -Path $destination | Out-Null

$exclude = @(
  ".git",
  "node_modules",
  ".next",
  ".turbo",
  ".vercel",
  "out",
  "dist",
  "build",
  "coverage"
)

$args = @(
  $ProjectPath,
  $destination,
  "/E",
  "/COPY:DAT",
  "/DCOPY:DAT",
  "/R:2",
  "/W:2",
  "/NFL",
  "/NDL",
  "/NJH",
  "/NJS",
  "/NP",
  "/XD"
) + $exclude

& robocopy @args | Out-Null
$rc = $LASTEXITCODE

if ($rc -ge 8) {
  throw "Robocopy falló con exit code $rc"
}

Write-Host "Snapshot creado:"
Write-Host "  $destination"
