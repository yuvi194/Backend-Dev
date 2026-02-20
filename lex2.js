const fs = require('fs');
const readline = require('readline');
const fsPromises = require('fs').promises;
class LogAnalyzer {
  constructor(logFilePath) {
    this.logFilePath = logFilePath;
    this.stats = {
      totalLines: 0,
      errorCount: 0,
      warningCount: 0,
      infoCount: 0,
      debugCount: 0,
      errors: [],
      warnings: [],
      timestamps: []
    };
  }
  async analyze() {
    console.log(`Analyzing log file: ${this.logFilePath}\n`); 
    try {
      await fsPromises.access(this.logFilePath);
      const readStream = fs.createReadStream(this.logFilePath, {
        encoding: 'utf8',
        highWaterMark: 64 * 1024 
      });
      const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
      });
      for await (const line of rl) {
        this.processLine(line);
      }
      await this.generateReport();
    } catch (err) {
      console.error('Error analyzing log file:', err.message);
      throw err;
    }
  }
  processLine(line) {
    this.stats.totalLines++; 
    const lowerLine = line.toLowerCase();
    const timestampMatch = line.match(/\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}/);
    if (timestampMatch) {
      this.stats.timestamps.push(timestampMatch[0]);
    }
    if (lowerLine.includes('error')) {
      this.stats.errorCount++;
      this.stats.errors.push(line.trim());
    } else if (lowerLine.includes('warning') || lowerLine.includes('warn')) {
      this.stats.warningCount++;
      this.stats.warnings.push(line.trim());
    } else if (lowerLine.includes('info')) {
      this.stats.infoCount++;
    } else if (lowerLine.includes('debug')) {
      this.stats.debugCount++;
    }
  }
  async generateReport() {
    const report = this.createReportContent(); 
    console.log(report);
    const reportFileName = `log_analysis.txt`;
    try {
      await fsPromises.writeFile(reportFileName, report, 'utf-8');
      console.log(`Report saved to: ${reportFileName}`);
    } catch (err) {
      console.error('Error saving report:', err.message);
    }
  }
  createReportContent() {
    const separator = '='.repeat(60);
    let report = `${separator}\n`;
    report += `LOG FILE ANALYSIS REPORT\n`;
    report += `Generated: ${new Date().toLocaleString()}\n`;
    report += `Log File: ${this.logFilePath}\n`;
    report += `${separator}\n\n`; 
    report += `SUMMARY STATISTICS:\n`;
    report += `${'-'.repeat(40)}\n`;
    report += `Total Lines Processed: ${this.stats.totalLines}\n`;
    report += `Error Count: ${this.stats.errorCount}\n`;
    report += `Warning Count: ${this.stats.warningCount}\n`;
    report += `Info Count: ${this.stats.infoCount}\n`;
    report += `Debug Count: ${this.stats.debugCount}\n\n`;
    if (this.stats.totalLines > 0) {
      report += `DISTRIBUTION:\n`;
      report += `${'-'.repeat(40)}\n`;
      report += `Errors: ${((this.stats.errorCount / this.stats.totalLines) * 100).toFixed(2)}%\n`;
      report += `Warnings: ${((this.stats.warningCount / this.stats.totalLines) * 100).toFixed(2)}%\n`;
      report += `Info: ${((this.stats.infoCount / this.stats.totalLines) * 100).toFixed(2)}%\n`;
      report += `Debug: ${((this.stats.debugCount / this.stats.totalLines) * 100).toFixed(2)}%\n\n`;
    }
    if (this.stats.timestamps.length > 0) {
      report += `TIME RANGE:\n`;
      report += `${'-'.repeat(40)}\n`;
      report += `First Entry: ${this.stats.timestamps[0]}\n`;
      report += `Last Entry: ${this.stats.timestamps[this.stats.timestamps.length - 1]}\n\n`;
    }
    if (this.stats.errors.length > 0) {
      report += `RECENT ERRORS (Last 10):\n`;
      report += `${'-'.repeat(40)}\n`;
      const recentErrors = this.stats.errors.slice(-10);
      recentErrors.forEach((error, index) => {
        report += `${index + 1}. ${error}\n`;
      });
      report += '\n';
    }
    if (this.stats.warnings.length > 0) {
      report += `RECENT WARNINGS (Last 10):\n`;
      report += `${'-'.repeat(40)}\n`;
      const recentWarnings = this.stats.warnings.slice(-10);
      recentWarnings.forEach((warning, index) => {
        report += `${index + 1}. ${warning}\n`;
      });
      report += '\n';
    }
    report += `${separator}\n`;
    report += `END OF REPORT\n`;
    report += `${separator}\n`;
    return report;
  }
}
async function main() {
  const logFilePath = process.argv[2] || 'application.log'; 
  const analyzer = new LogAnalyzer(logFilePath);
  try {
    await analyzer.analyze();
  } catch (err) {
    console.error('Failed to analyze log file:', err.message);
    process.exit(1);
  }
}
main();
async function createSampleLog() {
  const sampleLogs = `2024-02-09 10:15:23 INFO Application started successfully
2024-02-09 10:15:24 DEBUG Loading configuration files
2024-02-09 10:15:25 INFO Database connection established
2024-02-09 10:16:01 WARNING High memory usage detected: 85%
2024-02-09 10:16:30 ERROR Failed to connect to external API: timeout
2024-02-09 10:17:00 INFO User login: user@example.com
2024-02-09 10:17:15 DEBUG Processing user request
2024-02-09 10:18:00 ERROR Database query failed: connection lost
2024-02-09 10:18:30 WARNING Retrying database connection
2024-02-09 10:18:35 INFO Database reconnected successfully
2024-02-09 10:19:00 DEBUG Cache cleared
2024-02-09 10:20:00 ERROR Authentication failed for user: invalid_user
2024-02-09 10:20:30 WARNING Rate limit exceeded for IP: 192.168.1.100
2024-02-09 10:21:00 INFO Background job started
2024-02-09 10:22:00 ERROR File not found: /data/missing.txt`;
  await fsPromises.writeFile('application.log', sampleLogs, 'utf-8');
  console.log('Sample log file created: application.log');
}
createSampleLog();