#!/bin/bash
# Test all projects

set -e

echo "🧪 Running tests for all projects..."
echo ""

PASSED=0
FAILED=0

# Test each project
for project in projects/*/; do
  if [ -f "$project/package.json" ]; then
    project_name=$(basename "$project")
    echo "Testing $project_name..."
    
    # Test solution if it exists
    if [ -f "$project/solution/package.json" ] && grep -q '"test"' "$project/solution/package.json"; then
      cd "$project/solution"
      if npm test > /dev/null 2>&1; then
        echo "  ✅ $project_name solution tests passed"
        PASSED=$((PASSED + 1))
      else
        echo "  ❌ $project_name solution tests failed"
        FAILED=$((FAILED + 1))
      fi
      cd - > /dev/null
    else
      echo "  ⚠️  $project_name has no tests"
    fi
  fi
done

echo ""
echo "📊 Test Results:"
echo "  ✅ Passed: $PASSED"
echo "  ❌ Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
  echo "🎉 All tests passed!"
  exit 0
else
  echo "⚠️  Some tests failed. Check the output above."
  exit 1
fi

