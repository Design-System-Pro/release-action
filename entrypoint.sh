#!/bin/bash
set -e

# Perform release
if [ "$DRY_RUN" = "true" ]; then
  npx semantic-release --dry-run
else
  npx semantic-release
fi
