const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

class FileManager {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async showMenu() {
    console.log('File Manager Application');
    console.log('1. Read File');
    console.log('2. Write File');
    console.log('3. Copy File');
    console.log('4. Delete File');
    console.log('5. List Directory Contents');
    console.log('6. Exit');
  }

  async readFile() {
    const filename = await this.prompt('Enter filename to read: ');
    try {
      const data = await fs.readFile(filename, 'utf-8');
      console.log('\n--- File Content ---');
      console.log(data);
      console.log('--- End of File ---\n');
    } catch (err) {
      this.handleError(err, `reading file ${filename}`);
    }
  }

  async writeFile() {
    const filename = await this.prompt('Enter filename to write: ');
    const content = await this.prompt('Enter content to write: ');
    try {
      await fs.writeFile(filename, content, 'utf-8');
      console.log(`File '${filename}' written successfully`);
    } catch (err) {
      this.handleError(err, `writing file ${filename}`);
    }
  }

  async copyFile() {
    const source = await this.prompt('Enter source filename: ');
    const destination = await this.prompt('Enter destination filename: ');
    try {
      await fs.copyFile(source, destination);
      console.log(`File copied from '${source}' to '${destination}'`);
    } catch (err) {
      this.handleError(err, `copying file from ${source} to ${destination}`);
    }
  }

  async deleteFile() {
    const filename = await this.prompt('Enter filename to delete: ');
    const confirm = await this.prompt(`Are you sure you want to delete '${filename}'? (yes/no): `);
    
    if (confirm.toLowerCase() === 'yes') {
      try {
        await fs.unlink(filename);
        console.log(`File '${filename}' deleted successfully`);
      } catch (err) {
        this.handleError(err, `deleting file ${filename}`);
      }
    } else {
      console.log('Delete operation cancelled');
    }
  }

  async listDirectory() {
    const dirPath = await this.prompt('Enter directory path (or press Enter for current directory): ');
    const directory = dirPath || '.';
    
    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });
      console.log(`\n--- Contents of '${directory}' ---`);
      
      for (const entry of entries) {
        const type = entry.isDirectory() ? '[DIR]' : '[FILE]';
        const fullPath = path.join(directory, entry.name);
        
        try {
          const stats = await fs.stat(fullPath);
          const size = entry.isFile() ? `${stats.size} bytes` : '';
          console.log(`${type} ${entry.name} ${size}`);
        } catch (err) {
          console.log(`${type} ${entry.name} (cannot read stats)`);
        }
      }
      console.log('End of Directory');
    } catch (err) {
      this.handleError(err, `listing directory ${directory}`);
    }
  }

  handleError(err, operation) {
    const errorMessages = {
      'ENOENT': 'File or directory not found',
      'EACCES': 'Permission denied',
      'EEXIST': 'File already exists',
      'EISDIR': 'Expected a file but found a directory',
      'ENOTDIR': 'Expected a directory but found a file'
    };
    
    const message = errorMessages[err.code] || err.message;
    console.error(`Error ${operation}: ${message}`);
  }

  prompt(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  async run() {
    let running = true;
    
    while (running) {
      await this.showMenu();
      const choice = await this.prompt('Enter your choice (1-6): ');
      
      switch (choice) {
        case '1':
          await this.readFile();
          break;
        case '2':
          await this.writeFile();
          break;
        case '3':
          await this.copyFile();
          break;
        case '4':
          await this.deleteFile();
          break;
        case '5':
          await this.listDirectory();
          break;
        case '6':
          console.log('Exiting File Manager. Goodbye!');
          running = false;
          break;
        default:
          console.log('Invalid choice. Please enter a number between 1 and 6.');
      }
    }
    
    this.rl.close();
  }
}
const fileManager = new FileManager();
fileManager.run();