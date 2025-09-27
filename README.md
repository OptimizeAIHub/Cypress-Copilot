# Cypress Copilot
**Note:** This GitHub repository contains the source code for the Cypress Copilot Visual Studio Code extension ( VS Code Plugin).

**Cypress Copilot** is a Visual Studio Code extension that accelerates BDD (Behavior Driven Development) testing with AI-powered code generation.

✨ Generate Cypress step definitions & Page Object Models instantly.

🧠 Powered by our novel Few-shot Chain Prompting (see our IEEE paper : https://ieeexplore.ieee.org/abstract/document/10812696 )
).

⚡ Fewer syntax and more code coverage than GPT-3.5, GPT-4, and GitHub Copilot for BDD code.

👉 Get it on the VS Code Marketplace : https://marketplace.visualstudio.com/items?itemName=SureshNettur.ccaia

**Authors**: Suresh Nettur, Shanthi Karpurapu, Unnati Nettur, Likhit Sagar Gajja.

## 🎥 DEMO

![Demo](https://github.com/user-attachments/assets/1955dc93-b265-4387-9d0b-c18f6317f036)




## ✨ Features

🤖 AI-powered code generation for step definitions & POM.

🔀 Supports multiple OpenAI models.

👀 Real-time code preview before use.

⚡ Streamlined BDD workflow with Cypress + Cucumber.

## 📘 Usage

1. To set the API key from VS Code.
    Press Ctrl+Shift+P or go to run commands in Visual Studio code type Generate Cypress Code Using AI, 
    Then click the 'API Key Settings' and enter your OpenAI API key.
3. Open extension from run command of Visual Studio code : Generate Cypress Code Using AI. Paste a BDD scenario:

    ``` Scenario: User logs into the system
          Given the user is on the login page
          When the user enters valid credentials
          Then the user should be redirected to the dashboard```
  
2. Select an OpenAI model.

3. Click Generate Code → preview Cypress code for step definitions & POM.

## ⚠️ Notes & Disclaimers

- Always review outputs — AI may produce errors.

- Supports BDD format scenarios only.

- Protect your API key — do not expose publicly.

- 🚫 Do not input PII/PHI or sensitive data.

Do not input or share Personally Identifiable Information (PII), Protected Health Information (PHI), or other sensitive data in the extension. The developer of this extension is not responsible for any misuse of such data. This extension is designed to assist users in generating code, scenarios, or documentation efficiently. Users are expected to use it responsibly and ethically. Inherits limitations of OpenAI models (GPT-3.5/GPT-4). The authors are not liable for any damages resulting from its use. Users are solely responsible for the content generated or used with this extension. Misuse of this extension for inappropriate purposes is strictly prohibited. You must comply with applicable laws while using this extension. This extension is provided "as is" without any warranties.You must comply with applicable laws while using this extension.

## 📦 Prerequisites

Before using Cypress Copilot Extension, ensure you have the following installed:

- **VS Code**: Ensure the latest version of Visual Studio Code is installed. Download from https://code.visualstudio.com/.
- **Node.js**: Installed globally, as this extension depends on Node.js to interact with Cypress and run commands.Download Node.js from https://nodejs.org/.
- **Cypress**: Installed in your project. Install via npm:
    `npm install cypress --save-dev `
- **Automation Repo**: To implement E2E (End to End) Web Automation tests in BDD/ Cucumber
     `npm i "@badeball/cypress-cucumber-preprocessor" `
    or
    Download or clone the cypress cucumber based boiler plate from "https://github.com/JoanEsquivel/cypress-cucumber-boilerplate/" 
    `npm i all` (for installing all its dependencies)
- **OpenAI API Access**: You will need an OpenAI API key for using the AI-based code suggestions.
    You can sign up for OpenAI https://openai.com/.

## 🐞 Known Issues
   1. API Key Not Persisting: In some cases, the OpenAI API key may not persist after restarting VS Code.
        If this happens, use Ctrl+Shift+P to open the command palette and re-enter your API key using the 'Set API Key' command.
   2. Inconsistent Model Outputs: Different OpenAI models may generate inconsistent results for step definitions and POM implementations, especially for non-standard scenarios. If you encounter unexpected output, try switching models to see if it improves the result.

## 📜 License

This project is licensed under the Apache License 2.0, the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).  
See the LICENSE file for details. You are free to:
- **Share**: Copy and redistribute the material in any medium or format.
- **Adapt**: Remix, transform, and build upon the material.
Under the following terms:
- **Attribution**: You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- **NonCommercial**: You may not use the material for commercial purposes.

## 💬 Support

For issues or questions, visit the GitHub repository or contact us via the Visual Studio Code Marketplace.
