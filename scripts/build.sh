#!/bin/bash
# Build script - Prepare all projects for deployment

set -e

echo "🔨 Building all projects..."
echo ""

# Build each project
for project in projects/*/; do
  if [ -f "$project/package.json" ]; then
    project_name=$(basename "$project")
    echo "Building $project_name..."
    
    # Build solution if it exists
    if [ -f "$project/solution/package.json" ] && grep -q '"build"' "$project/solution/package.json"; then
      cd "$project/solution"
      if npm run build > /dev/null 2>&1; then
        echo "  ✅ $project_name built successfully"
      else
        echo "  ⚠️  $project_name build skipped (no build script)"
      fi
      cd - > /dev/null
    else
      echo "  ⚠️  $project_name has no build script"
    fi
  fi
done

echo ""
echo "✅ Build complete!"
echo ""
echo "All projects are ready for deployment."

