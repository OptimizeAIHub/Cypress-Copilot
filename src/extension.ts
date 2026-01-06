import * as vscode from 'vscode';
import AsyncOpenAI from "openai";
import configData from './config.json';

async function openAIcallStep(userApiKey: string, inputText: string, modelName: string): Promise<string> {

	try {
		const openai = new AsyncOpenAI({ apiKey: userApiKey });

		const getStepCodeAPIcall = await openai.chat.completions.create({
			model: modelName,
			messages: [
				{ role: "system", content: configData.system_prompt_code },
				{ role: "user", content: "for {feature} =" + configData.few_shot_assistant_feature_code },
				{ role: "assistant", content: "the example step definition javascript file is {step} = " + configData.few_shot_assistant_step_code },
				{
					role: "user", content: "for {feature} = " + inputText + "lets think step by step."
						+ "Step 1: Strictly follow exact syntax for importing page object class.follow lower came case name convention, "
						+ "The example syntax is - import {loginPage} from '@pages/LoginPage'"
						+ "Step 2 : Strictly Write multiple imports when importing more than one page object class. "
						+ "For example this is incorrect syntax - import { calcPage, compPage } from '@pages';"
						+ " and the correct syntax example is -import { calcPage } from '@pages/CalcPage'; "
						+ "import { compPage } from '@pages/CompPage';  "
						+ "Step 3 : do not include explanation"
						+ "your task is to write the code with step definitions for every scenario and the javascript file is {step} ="
				}
			]
			//max_tokens: configData['gpt_max_tokens'],
			//temperature: configData['gpt_temperature'],
			//top_p: configData['gpt_top_p']
		});

		// Check if the response has valid content
		const result = (getStepCodeAPIcall.choices
			&& getStepCodeAPIcall.choices.length > 0
			&& getStepCodeAPIcall.choices[0].message
			&& getStepCodeAPIcall.choices[0].message.content)
			? getStepCodeAPIcall.choices[0].message.content
			: 'No response for getStepCodeAPIcall from OpenAI';

		console.log("OpenAI response for getStepCodeAPIcall:: " + JSON.stringify(getStepCodeAPIcall, null, 2));
		//console.log("OpenAI response for getStepCodeAPIcall:: " + result);
		return result;

	} catch (error: any) {
		return error.message;
	}

}

async function openAIcallPom(userApiKey: string, inputText: string, modelName: string): Promise<string> {

	const openai = new AsyncOpenAI({ apiKey: userApiKey });

	const getPomCodeAPIcall = await openai.chat.completions.create({
		model: modelName,
		messages: [
			{ role: "system", content: configData.system_prompt_code },
			{ role: "user", content: "for the {step} file =" + configData.few_shot_assistant_step_code },
			{ role: "assistant", content: "the page object class implementation is {page} = " + configData.few_shot_assistant_page_code },
			{
				role: "user", content: "lets think step by step."+
					"Step 1: Define all Web element methods along with their selectors."+
					"Step 2: Write the complete Web element interaction logic in the UI methods."+
					"Step 3: Provide a complete implementation for every verification method."+
					"Step 4: In the absence of implementation details, assume and write the code. Do not leave any method without full implementation."+
					"Step 5: If application behavior or functionality is unclear, assume the most common behavior/functionality."+
					"Step 6: Avoid leaving any placeholders; implement the full logic for each method."+
					"Step 7: Ensure that the Page Object Class is implemented for all page imports in the step definition file."+
					"Step 8: Ensure the Cypress code does not have any JavaScript type errors."+
					"Step 9: Review the generated code thoroughly. Verify each step, and if any step is not followed, rewrite the code accordingly." +
							   "for the given {step} file =" + inputText +"the page object class implementation is {page} = "
			}
		]
		//max_tokens: configData['gpt_max_tokens'],
		//temperature: configData['gpt_temperature'],
		//: configData['gpt_top_p']
	});

	const result = (getPomCodeAPIcall.choices
		&& getPomCodeAPIcall.choices.length > 0
		&& getPomCodeAPIcall.choices[0].message
		&& getPomCodeAPIcall.choices[0].message.content) ? getPomCodeAPIcall.choices[0].message.content
		: 'No response for getPomCodeAPIcall from OpenAI';
    
	console.log("OpenAI response for getPomCodeAPIcall:: " + JSON.stringify(getPomCodeAPIcall, null, 2));
	//console.log("openai response for getPomCodeAPIcall::" + result);

	return result;
}

function isValidBDDFormat(inputText: string): boolean {
    // Split the text into lines
    const lines = inputText.split('\n').map(line => line.trim());

    // Check if the first line starts with "Feature:"
    if (!lines[0]?.startsWith('Feature:')) {
        return false;
    }

    // Valid BDD keywords
    //const validKeywords = ['Feature:', 'Background:', 'Scenario:', 'Given', 'When', 'Then', 'And', 'But'];

	let expectedKeywords = ['given', 'when', 'then'];
	let keywordIndex = 0; // To track which keyword we are expecting
	let givenFlag = false;
	let isValid = true;
	
	for (const line of lines) {
		// Skip empty lines and lines that don't start with the expected keywords
		if (line === '' || !expectedKeywords.some(keyword => line.toLowerCase().startsWith(keyword))) {
			continue; // Skip this iteration if the line is empty or doesn't start with any of the expected keywords
		}
		if ( line.toLowerCase().startsWith('given')) {
			givenFlag = true;
		}

		// Check if the line starts with the expected keyword
		if (line.toLowerCase().startsWith(expectedKeywords[keywordIndex])) {
			keywordIndex++; // Move to the next keyword
	
			// If all three keywords have been found, stop further checking
			if (keywordIndex === 3 || ( keywordIndex === 2 && givenFlag)) {
				break;
			}
		} else {
			console.log('Failed isValidBDDFormat():: ' + line);
			return false;
		}
	}
	
	// Check if we found all three keywords in the correct order
	if ( !isValid ) {
		console.log('The required sequence of "given", "when", "then" was not found.');
		return false;
	}

    // All checks passed, valid BDD format
    return true;
}

export async function activate(context: vscode.ExtensionContext) {

	let newPanel: vscode.WebviewPanel | undefined = undefined;

	console.log('Extension "Cypress Copilot" is now active!');

	// Command to store the API key
	const setApiKeyCommand = vscode.commands.registerCommand('ccaia.setApiKey', async () => {
		const apiKey = await vscode.window.showInputBox({ prompt: 'Enter your OpenAI API key', ignoreFocusOut: true, password: true });
		if (apiKey) {
			await context.secrets.store('openai-api-key', apiKey);
			vscode.window.showInformationMessage('API Key stored successfully.');
		}
	});

	const processtest = vscode.commands.registerCommand('ccaia.processTest', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello VS code from Suresh Nettur - PT!');

		// Create and show panel
		let currentPanel = vscode.window.createWebviewPanel(
			'processTests',
			'process Tests',
			vscode.ViewColumn.One,
			{ enableScripts: true, }
		);

		// And set its HTML content
		currentPanel.webview.html = getWebviewContent();

		// handle receiving messages from the webview
		currentPanel.webview.onDidReceiveMessage(async message => {
			if (!currentPanel) {
				return;
			}

			switch (message.command) {
				case 'alert':
					//vscode.window.showInformationMessage('Hello VS code from Suresh Nettur - PT!');
					//console.log('Input given:: ' + message.text);

					if (message.text.length === 0) {
						vscode.window.showErrorMessage(`Please enter a valid test.`);
						currentPanel.webview.postMessage({type: 'error', pomCode: "", stepCode: ""});
						return;
					}

					if ( ! isValidBDDFormat( message.text ) ) {
						vscode.window.showErrorMessage(`Please enter valid BDD scenario using Feature, Scenario,Given,When,Then keywords.`);
						currentPanel.webview.postMessage({type: 'error', pomCode: "", stepCode: ""});
						return;
					}

					let apiResponseforStep = "Step Code - Not Available.";
					let apiResponseforPom = "Pom Code - Not Available.";

					if (message.apiKey && message.apiKey.trim() !== "") {
						await context.secrets.store('openai-api-key', message.apiKey);
					}

					const apiKey = await context.secrets.get('openai-api-key');
					if (!apiKey) {
						vscode.window.showErrorMessage('API Key is not available. Please set it using Ctrl-Shift-p and select - Set API Key or click API Key Settings.');
						currentPanel.webview.postMessage({type: 'error', pomCode: "", stepCode: ""});
						return;
					}

					try {
						let result = await openAIcallStep(apiKey, message.text, message.model);
						//console.log('response from openai for openAIcallStep:: ' + result);

						if (result !== 'Failed to get a valid response from OpenAI.') {
							apiResponseforStep = result;
							apiResponseforPom = await openAIcallPom(apiKey, apiResponseforStep, message.model);
						}

						currentPanel.webview.postMessage({
							type: 'message', pomCode: apiResponseforPom, stepCode: apiResponseforStep
						});
					}
					catch (error: any) {
						console.error('Error calling OpenAI message:', error);
						vscode.window.showErrorMessage(`Failed to get response from OpenAI. ${error}`);
						currentPanel.webview.postMessage({type: 'error', pomCode: "", stepCode: ""});
					}
					return;
			}

		}, undefined, context.subscriptions);

	});

	context.subscriptions.push(processtest);
	context.subscriptions.push(setApiKeyCommand);
}

function getWebviewContent() {
	return `<!DOCTYPE html>
  <html>
    <head>
        <style>
			body {
  				background-color: var(--vscode-editor-background, #0f172a);
  				color: var(--vscode-editor-foreground, #e5e7eb);
			}
			table {
				font-family: arial, sans-serif;
				border: 0px solid #dddddd;
				border-collapse: collapse;
			}
			td, th {
				border: 0px solid #dddddd;
				text-align: center;
				padding: 0px;
				width: 25%;
			}
			textarea {
  				resize: none;
				padding: 15px;
				font-size: 16px;
				font-family: 'Segoe UI', sans-serif;
				color: white;
				background-color: #3a3a3a;
				border: none;
				overflow: auto;
				outline: none;
			}
			.fancy-button {
				padding: 12px 24px;
				font-size: 14px;
				font-family: 'Segoe UI', Tahoma, Geneva, sans-serif;
				color: white;
				height: 40px;
				background-color: #5a67d8;
  				color: #ffffff;
				border: none;
				border-radius: 6px;
				outline: none;
	        }
			.fancy-button:disabled {
			    background-color: #cccccc;
    			color: #666666;
    			cursor: not-allowed;
    			opacity: 0.7;
			}
			h1.fancy {
            	font-family: 'Segoe UI', serif;
            	font-size: 30px;
            	text-align: center;
				background: linear-gradient(135deg, #7c83ff, #60a5fa);
				color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				font-weight: bold;
				margin-bottom: 0px;
        	}
			h4.fancy {
				font-family: 'Segoe UI', monospace;
				font-size: 16px;
				color: #94a3b8;
				letter-spacing: 1px;
				transition: all 0.3s ease-in-out;
				margin-top: 0px; 
        	}
			.fancy-label {
				font-family: 'Segoe UI', sans-serif;
				font-size: 16px;
				font-weight: bold;
				color: #94a3b8;
				letter-spacing: 1px;
				text-align: left;
				align: left;
			}
			.fancy-select {
				width: 150px;
				height: 35px;
				max-width: 300px;
				padding: 10px 15px;
				font-family: 'Arial', sans-serif;
				font-size: 12px;
				color: white;
				background-color: #3a3a3a;
				border: none;
				border-radius: 5px;
				background-repeat: no-repeat;
				background-position: right 10px center;
				background-size: 12px;
				cursor: pointer;
			}
	        option {
    	        padding: 10px;
        	    font-size: 16px;
        	}
		    .rounded-input {
				width: 200px;
				height: 35px;
				font-size: 12px;
				outline: none;
				color: white;
				background-color: #3a3a3a;
				border: none;
				border-radius: 5px;
				background-size: 12px;
			}
		    .hidden {
            	display: none;
        	}
	    </style>
    </head>
	
	<body>

	<script type="text/javascript">

		const vscode = acquireVsCodeApi(); 

		function clearAll() {
			document.getElementById("txt").value = "Enter BDD scenario here to generate Cypress code for web application testing.";
			document.getElementById("pomCodeText").value = "";
			document.getElementById("stepCodeText").value = "";
			document.getElementById("apiKeyTF").value = "";
		}

		function displayOut() {
			document.getElementById('gcBtn').disabled = true;
			document.getElementById('clearBtn').disabled = true;
			document.getElementById('gcBtn').value = "Processing...";

			vscode.postMessage({
				command: "alert", 
				text: document.getElementById("txt").value,
				model: document.getElementById("gpt").value,
				apiKey: document.getElementById("apiKeyTF").value,
			});

		}

		function checkApiKey() {
			vscode.postMessage({
				command: "checkApiKey"
			});
		}
		
		function showApiKeyInput() {
    	    const apiKeyRow = document.getElementById('apiKeyTF');

            if (apiKeyRow.classList.contains('hidden')) {
                apiKeyRow.classList.remove('hidden');
            } else {
                apiKeyRow.classList.add('hidden');
            }
			
			const apiKeyLabel = document.getElementById('apiKeyLabel');

            if (apiKeyLabel.classList.contains('hidden')) {
                apiKeyLabel.classList.remove('hidden');
            } else {
                apiKeyLabel.classList.add('hidden');
            }
        }

		function sampleScenario(){
			document.getElementById("txt").value = "Feature: User Login\\n" 
			+ "\\tAs a user, I want to be able to log into the application to access my account.\\n\\n"
			+ "  Background: \\n\\tGiven the web browser is at the saucelabs login page.\\n\\n"
			+ "  Scenario: Successful Login \\n"
			+ "\\tWhen the user enters the username \\"valid_user\\", the password \\"valid_pwd\\", and clicks on the login button\\n"
			+ "\\tThen the user should be redirected to the dashboard page.\\n\\n"
			+ "  Scenario: Locked User Login \\n"
			+ "\\tWhen the user enters the username \\"locked_user\\", the password \\"pwd\\", "
			+ "and clicks on the login button\\n"
			+ "\\tThen the user should see an error message \\"Your account is locked. Please contact support.\\".";
		}

        window.addEventListener("message", event => {
			document.getElementById("gcBtn").disabled = false;
			document.getElementById("clearBtn").disabled = false;
			document.getElementById("gcBtn").value = " Generate Code ";

			if ( event.data.pomCode ) {
				document.getElementById("pomCodeText").value = event.data.pomCode;
				document.getElementById("stepCodeText").value = event.data.stepCode;
				// document.getElementById("pomCodeText").focus();
				// document.getElementById("pomCodeText").selectionStart = 0;
				// document.getElementById("pomCodeText").selectionEnd = 0;
			}
			else{
				document.getElementById("txt").focus();
			}
        });

        window.addEventListener("error", event => {
			document.getElementById("gcBtn").disabled = false;
			document.getElementById("clearBtn").disabled = false;
			document.getElementById("gcBtn").value = " Generate Code ";
			document.getElementById("pomCodeText").value = event.data.pomCode;
			document.getElementById("stepCodeText").value = event.data.stepCode;
			document.getElementById("txt").focus();
        });

	</script>

	<form>

  		<table style="width: 100%;">
    		<tr>
        		<td colspan=4>
					<h1 class="fancy">Cypress Copilot</h1>
					<h4 class="fancy">Automate Cucumber/BDD Tests with AI Assistance<h4>
				</td>
    		</tr>

			<tr>
				<td>
					<label class="fancy-label">OpenAI Model &nbsp;</label>
					<select name="LLM" id="gpt" class="fancy-select">
						<option value="gpt-4o">gpt-4o</option>
						<option value="gpt-4o-mini">gpt-4o-mini</option>
						<option value="gpt-5-mini">gpt-5-mini</option>
						<option value="gpt-5-nano">gpt-5-nano</option>
						<option value="gpt-5">gpt-5</option>
						<option value="o1">o1</option>
						<option value="o1-preview">o1-preview</option>
						<option value="o1-mini">o1-mini</option>
						<option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
						<option value="gpt-4-turbo">gpt-4-turbo</option>
					</select>
				</td>
				<td>
					<label id="apiKeyLabel" class="fancy-label hidden" >OpenAI API Key &nbsp;</label>
					<input id="apiKeyTF" class="rounded-input hidden" type="password">
				</td>
			</tr>
			<tr><td colspan=4>&nbsp;</td></tr>
			<tr>
				<td colspan=4>
					<label class="fancy-label">BDD Scenarios</label>
				</td>
			</tr>
    		<tr>
        		<th colspan=4>
					<textarea id="txt" rows="14" cols="105" align="left">Enter BDD scenario here to generate Cypress code for web application testing.</textarea>
				</th>
    		</tr>
			<tr><td colspan=4>&nbsp;</td></tr>
			<tr>
				<td colspan=4>
					<input class="fancy-button" type="button" id="gcBtn" onclick="displayOut()" value=" Generate Code " /> &nbsp;
					<input class="fancy-button" type="button" id="clearBtn" onclick="clearAll()" value=" Clear " /> &nbsp;
					<input class="fancy-button" type="button" onclick="showApiKeyInput()" value=" API Key Settings " /> &nbsp;
					<input class="fancy-button" type="button" onclick="sampleScenario()" value=" Sample Scenario " />
				</td>
			</tr>
			<tr><td colspan=4>&nbsp;</td></tr>
			<tr>
				<td colspan=4>
					<label class="fancy-label">Page Object Class Code</label>
				</td>
			</tr>
			<tr>
				<td colspan=4>
					<textarea id="pomCodeText" rows="8" cols="105" readonly="readonly"></textarea>
				</td>
			</tr>
			<tr><td colspan=4>&nbsp;</td></tr>
			<tr>
				<td colspan=4>
					<label class="fancy-label">Step Definition Code</label>
				</td>
			</tr>
			<tr>
				<td colspan=4>
					<textarea id="stepCodeText" rows="8" cols="105" readonly="readonly"></textarea>
				</td>
			</tr>

  		</table>
	</form>

</body>
</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() { }
