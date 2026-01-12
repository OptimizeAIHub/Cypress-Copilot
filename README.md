# Cypress Cucumber Copilot

Cypress Copilot is a Visual Studio Code extension that accelerates BDD (Behavior Driven Development) testing with AI-generated code suggestions.<br>
It allows users to input or copy-paste BDD scenarios, select an OpenAI model, and instantly generate code for step definitions and POM (Page Object Model) implementations.
<br><br>
Cypress Copilot utilizes the novel "Few-shot chain" prompt technique introduced by us in our research paper - https://ieeexplore.ieee.org/abstract/document/10812696.<br>
By leveraging our unique and novel prompt technique, Cypress Copilot exhibits superior code generation capabilities compare to gpt 3.5, gpt 4, github co-pilot, with minimal syntax issues and enhanced code maintainability.

**Author(s)**: Suresh Babu Nettur.

## Important Notes and Disclaimers
    1. Chatgpt, openai can make mistakes, please check imoortant information of these before proceeding.
    2. This tool currently supports only BDD format scenarios.
    3. Please check privacy policy and Terms of use.
    4. Risk of API Misuse: Be aware of potential risks associated with API hacks. Protect your API key and avoid sharing it publicly or exposing it in unsecured environments.
    5. Ethical Use Only: Users are strictly advised not to use this tool for any unethical, illegal, or harmful activities on the internet.
        The developers do not condone or support   misuse of this application.
    6. No Sensitive Information: Do not input any Personally Identifiable Information (PII) or Protected Health Information (PHI) into this tool.
        The developers are not responsible for any breach of privacy or misuse resulting from user-provided inputs.
    7. Limitations: This tool leverages on the GPT-4, GPT-3.5 OpenAI API, 
        and all inherent issues, limitations, or inaccuracies of the model will be reflected in the application's behavior. 
        Please use the tool with caution and verify critical outputs independently.

# Privacy Policy

This extension does not collect, store, or share any personal data.
If you have questions, please contact us.

# Terms of Use

By using this extension, you agree to the following terms:  
   1. This extension is provided "as is" without any warranties.
   2. The authors are not liable for any damages resulting from its use.
   3. You must comply with applicable laws while using this extension.

## Usage Guidelines

- **Ethical Use**: This extension is designed to assist users in generating code, scenarios, or documentation efficiently. Users are expected to use it responsibly and ethically.
- **Prohibited Activities**: Do not use this tool to create, promote, or support unethical, illegal, or harmful activities.
- **No Sensitive Data**: Do not input or share Personally Identifiable Information (PII), Protected Health Information (PHI), or other sensitive data in the extension. The developer is not responsible for any misuse of such data.
- **Accountability**:Users are solely responsible for the content generated or used with this extension. Misuse of this extension for inappropriate purposes is strictly prohibited.
- **Limitations**: The extension relies on external APIs like OpenAI for functionality. As a result, It may inherit the limitations or inaccuracies of the underlying API. Users should review all outputs and avoid blindly trusting the results.

## Features

- **AI-Powered Code Generation**: Automatically generate step definitions and POM implementations based on BDD scenarios.
- **Support for Multiple Models**: Select an OpenAI model from a drop-down box to tailor the code suggestions to your specific needs.
- **Code Preview**: View generated code in real-time, making it easy to copy or adjust before implementing.
- **Streamlined BDD Workflow**: Simplifies the process of creating end-to-end tests by providing ready-to-use code for popular testing frameworks.

## Requirements

Before using Cypress Copilot, ensure you have the following installed:

- **VS Code**: Ensure the latest version of Visual Studio Code is installed. Download from https://code.visualstudio.com/.
- **Node.js**: Installed globally, as this extension depends on Node.js to interact with Cypress and run commands.Download Node.js from https://nodejs.org/.
- **Cypress**: Installed in your project. Install via npm:
    npm install cypress --save-dev
- **Automation Repo**: To implement E2E (End to End) Web Automation tests in BDD/ Cucumber
    npm i "@badeball/cypress-cucumber-preprocessor"
    or
    Download or clone the cypress cucumber based boiler plate from "https://github.com/JoanEsquivel/cypress-cucumber-boilerplate/" 
    npm i all (for installing all its dependencies)
- **OpenAI API Access**: You will need an OpenAI API key for using the AI-based code suggestions.
    You can sign up for OpenAI https://openai.com/.


## Installation

1. Open Visual Studio Code.
2. Go to the **Extensions** view by clicking the Extensions icon in the Activity Bar.
3. Search for **Cypress Copilot**.
4. Click **Install** to add the extension to your environment.
5. Once installed, activate the extension by opening the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS) and select `Cypress Copilot`.

Alternatively, install via the command line using vsce:
    vsce install cypress-copilot

## Configuration

**Set OpenAI API Key**:  
    You can set the API key directly from VS Code.
    Press Ctrl+Shift+P, type Set API Key, and select the 'Set API Key' command to enter your OpenAI API key.

**Model Selection**:  
    Select the OpenAI model from the drop-down in the extension UI to choose the desired complexity and style of generated code.

## Usage
1. **Enter BDD Scenarios**: Copy-paste or manually type BDD scenarios into the input field.
2. **Select OpenAI Model**: Use the drop-down to choose the OpenAI model that best fits your needs.
3. **Generate Code**: Click on "Generate Code" to get suggestions for step definitions and POM implementations.
4. **View and Use Generated Code**: The results will be displayed in real-time, allowing you to copy the generated code directly into your project.

### Example Workflow

    Enter a scenario like:
        Scenario: User logs into the system
            Given the user is on the login page
            When the user enters valid credentials
            Then the user should be redirected to the dashboard

    Select an OpenAI model.

    Click Generate Code to receive step definition and POM suggestions.

## Known Issues
   1. API Key Not Persisting: In some cases, the OpenAI API key may not persist after restarting VS Code.
        If this happens, use Ctrl+Shift+P to open the command palette and re-enter your API key using the 'Set API Key' command.

   2. Inconsistent Model Outputs: Different OpenAI models may generate inconsistent results for step definitions and POM implementations, especially for non-standard scenarios.
        If you encounter unexpected output, try switching models to see if it improves the result.

### License

This project is licensed under the Apache License 2.0  
See the LICENSE file for details.

You are free to:
- **Share**: Copy and redistribute the material in any medium or format.
- **Adapt**: Remix, transform, and build upon the material.

Under the following terms:
- **Attribution**: You must give appropriate credit, provide a link to the license, and indicate if changes were made.

## Disclaimer
- **Ethical Usage**: This tool is designed for ethical development and testing purposes only. Do not use it for any unethical or inappropriate activities.
- **PII/PHI Handling**: Avoid including personally identifiable information (PII) or protected health information (PHI) in the input spec. The developers are not responsible for any misuse of the extension.


### Support

For issues or questions, visit the GitHub repository or contact us via the Visual Studio Code Marketplace.
