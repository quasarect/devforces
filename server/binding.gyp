{
  "targets": [
    {
      "target_name": "pixelmatch_module",
      "sources": ["services\pixelmatch\pixelmatch_module.cpp"],
      "include_dirs": [                                                                        
                 "<!(node -p \"require('node-addon-api').include_dir\")",         
                 "../node_modules/node-addon-api",                                                    
                 "node_modules/node-addon-api",                                                       
                 "/usr/include/node",                                                                 
                 "/usr/local/include/node",                                                           
             ],                                                                                       
             "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"],   

      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"]
    }
  ]
}
