#!/bin/bash
# Setup script - Initialize all projects

set -e

echo "🚀 Setting up The Founder's Infrastructure Playbook..."
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Setup each project
for project in projects/*/; do
  if [ -f "$project/package.json" ]; then
    project_name=$(basename "$project")
    echo "📦 Setting up $project_name..."
    
    # Install project dependencies
    if [ -f "$project/starter/package.json" ]; then
      echo "  → Installing starter dependencies..."
      cd "$project/starter" && npm install && cd - > /dev/null
    fi
    
    if [ -f "$project/solution/package.json" ]; then
      echo "  → Installing solution dependencies..."
      cd "$project/solution" && npm install && cd - > /dev/null
    fi
  fi
done

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Navigate to a project: cd projects/01-broken-windows"
echo "  2. Read the README: cat README.md"
echo "  3. Start working: cd starter && npm start"
echo ""
echo "Happy coding! 🎉"

