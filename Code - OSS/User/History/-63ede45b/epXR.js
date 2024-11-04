const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Função para capturar informações usando o Neofetch
function getSystemInfo() {
    try {
        // Executa o neofetch e captura o resultado
        const output = execSync("neofetch --off --stdout").toString();
        
        // Divide o resultado em linhas e cria um objeto com as informações relevantes
        const systemInfo = {};
        output.split("\n").forEach(line => {
            const [key, value] = line.split(":").map(part => part.trim());
            if (key && value) systemInfo[key] = value;
        });
        
        return {
            os: systemInfo["OS"] || "N/A",
            kernel: systemInfo["Kernel"] || "N/A",
            shell: systemInfo["Shell"] || "N/A",
            de: systemInfo["DE"] || "N/A",
            terminal: systemInfo["Terminal"] || "N/A",
            uptime: systemInfo["Uptime"] || "N/A"
        };
    } catch (error) {
        console.error("Erro ao obter informações do sistema:", error);
        return {};
    }
}

// Função para gerar o HTML a partir do template
function generateSystemInfoHTML() {
    const templatePath = path.join(__dirname, "system-template.html");
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    const info = getSystemInfo();
    htmlContent = htmlContent
        .replace("{{OS}}", info.os)
        .replace("{{KERNEL}}", info.kernel)
        .replace("{{SHELL}}", info.shell)
        .replace("{{DE}}", info.de)
        .replace("{{TERMINAL}}", info.terminal)
        .replace("{{UPTIME}}", info.uptime);

    return htmlContent;
}

// Gera e salva o arquivo final
const outputPath = path.join(__dirname, "system-info.html");
fs.writeFileSync(outputPath, generateSystemInfoHTML(), "utf8");
console.log(`System info HTML page generated at ${outputPath}`);
