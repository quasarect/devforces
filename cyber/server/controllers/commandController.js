// controllers/commandController.js
require('dotenv').config();
const { Client } = require('ssh2');
const fs = require('fs');

const sshConfig = {
  host: process.env.EC2_HOST,
  username: process.env.EC2_USERNAME,
  privateKey: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
};

const executeCommand = async (command) => {
  return new Promise((resolve, reject) => {
    const conn = new Client();

    conn.on('ready', () => {
      conn.exec(command, (err, stream) => {
        if (err) return reject(err);

        let output = '';
        stream.on('data', (data) => {
          output += data.toString();
        });

        stream.on('close', () => {
          conn.end();
          resolve(output);
        });

        stream.stderr.on('data', (data) => {
          output += data.toString();
        });
      });
    })
    .connect(sshConfig)
    .on('error', (err) => reject(err));
  });
};

const runCommand = async (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'No command provided' });
  }

  try {
    const output = await executeCommand(command);
    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: 'Error executing command', details: error.message });
  }
};

module.exports = { runCommand };  // Ensure this line is present
