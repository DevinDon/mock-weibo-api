# README

# Debug

If you use VSCode, try below code to debug your project:

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug: Currect File",
      "runtimeArgs": [
        "-r",
        "ts-node/register"
      ],
      "args": [
        "${relativeFile}"
      ],
      "sourceMaps": true,
      "cwd": "${workspaceFolder}",
      "protocol": "inspector"
    }
  ]
}

```
