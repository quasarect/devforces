cmd_Release/pixelmatch.node := ln -f "Release/obj.target/pixelmatch.node" "Release/pixelmatch.node" 2>/dev/null || (rm -rf "Release/pixelmatch.node" && cp -af "Release/obj.target/pixelmatch.node" "Release/pixelmatch.node")
