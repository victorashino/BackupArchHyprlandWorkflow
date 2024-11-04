const os = require("os");
const fs = require("fs");
const path = require("path");

// Função para ler o template e substituir variáveis
function generateSystemInfoHTML() {
    // Lê o arquivo template
    const templatePath = path.join(__dirname, "system-template.html");
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    // Obter informações do sistema
    const cpuInfo = os.cpus();
    const memoryInfo = {
        total: os.totalmem(),
        free: os.freemem(),
    };
    const uptime = os.uptime();

    // Substitui variáveis no template
    htmlContent = htmlContent
        .replace("{{CPU}}", cpuInfo[0].model)
        .replace("{{CORES}}", cpuInfo.length)
        .replace("{{MEMORY_TOTAL}}", (memoryInfo.total / (1024 ** 3)).toFixed(2))
        .replace("{{MEMORY_FREE}}", (memoryInfo.free / (1024 ** 3)).toFixed(2))
        .replace("{{UPTIME}}", (uptime / 3600).toFixed(2));

    return htmlContent;
}

// Gera e salva o arquivo final
const outputPath = path.join(__dirname, "system-info.html");
fs.writeFileSync(outputPath, generateSystemInfoHTML(), "utf8");
console.log(`System info HTML page generated at ${outputPath}`);
