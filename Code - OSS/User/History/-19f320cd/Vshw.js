const os = require("os");
const fs = require("fs");
const path = require("path");

function generateSystemInfoHTML() {
    const templatePath = path.join(__dirname, "system_template.html");
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    const cpuInfo = os.cpus();
    const memoryInfo = {
        total: os.totalmem(),
        free: os.freemem(),
    };
    const uptime = os.uptime();

    htmlContent = htmlContent
        .replace("{{CPU}}", cpuInfo[0].model)
        .replace("{{CORES}}", cpuInfo.length)
        .replace("{{MEMORY_TOTAL}}", (memoryInfo.total / (1024 ** 3)).toFixed(2))
        .replace("{{MEMORY_FREE}}", (memoryInfo.free / (1024 ** 3)).toFixed(2))
        .replace("{{UPTIME}}", (uptime / 3600).toFixed(2));

    return htmlContent;
}

const outputPath = path.join(__dirname, "system_info.html");
fs.writeFileSync(outputPath, generateSystemInfoHTML(), "utf8");
console.log(`System info HTML page generated at ${outputPath}`);
