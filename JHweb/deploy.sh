#!/bin/bash

# ==============================================================================
# Geometry Projects Deployment Script
# Usage: ./deploy.sh [ProjectName1] [ProjectName2] ...
# If no arguments are provided, it deploys the 3 latest projects by default.
# ==============================================================================

# Configuration
SERVER="root@simawt.cn"
REMOTE_BASE="/var/www/math"
TECHBOT_DIR="/Users/newpc/TechBot"

# Default projects if none specified
DEFAULT_PROJECTS=("Rhombus_Max_Area" "MidpointRoc" "HandInHand-basic")

if [ $# -gt 0 ]; then
    PROJECTS=("$@")
else
    PROJECTS=("${DEFAULT_PROJECTS[@]}")
fi

echo "🚀 Starting deployment to $SERVER..."

for PROJECT in "${PROJECTS[@]}"; do
    PROJECT_DIR="$TECHBOT_DIR/$PROJECT"
    
    echo ""
    echo "=================================================================="
    echo "📦 Project: $PROJECT"
    echo "=================================================================="
    
    if [ ! -d "$PROJECT_DIR" ]; then
        echo "❌ Error: Directory $PROJECT_DIR not found."
        continue
    fi

    # 1. Build project
    cd "$PROJECT_DIR"
    echo "🛠️  Building project..."
    npm run build
    
    if [ $? -ne 0 ]; then
        echo "❌ Error: Build failed for $PROJECT."
        continue
    fi

    # 2. Upload to server
    echo "📤 Uploading to $REMOTE_BASE/$PROJECT/..."
    # Ensure remote directory exists
    ssh "$SERVER" "mkdir -p $REMOTE_BASE/$PROJECT"
    
    # Sync dist folder content
    rsync -avz --delete dist/ "$SERVER:$REMOTE_BASE/$PROJECT/"
    
    if [ $? -eq 0 ]; then
        echo "✅ $PROJECT deployed successfully!"
    else
        echo "❌ Error: Failed to upload $PROJECT."
    fi
done

echo ""
echo "=================================================================="
echo "🎉 All requested deployments finished."
echo "=================================================================="
