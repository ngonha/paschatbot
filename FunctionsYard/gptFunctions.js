function toTrainingFormat(prompt, response) {
    const escapedMessage = JSON.stringify(prompt);
    const escapedResponse = JSON.stringify(response);
    const repObject = {prompt: escapedMessage, completion: escapedResponse};
    return repObject;
}

function toTrainingString(prompt, response) {
    const escapedMessage = JSON.stringify(prompt);
    const escapedResponse = JSON.stringify(response);
    const repString = `{"prompt": ${escapedMessage}, "completion": ${escapedResponse}}`
    return repString;
}

function saveTrainingData(prompt, response) {
    // File System API and Node's File System module
    // With help from OpenAi
    const filePath = "./FunctionsYard/gptData.jsonl";
    const fs = require('fs');
    fs.access(filePath, (err) => {
        if (err) {
            // File doesn't exist
            // Create and write to file
            fs.writeFile(filePath, toTrainingString(prompt, response), function(err) {
                if (err) throw err;
                console.log("File created");
            });
        } else {
            // File exists
            // Append to file
            fs.appendFile(filePath, "\n" + toTrainingString(prompt, response), function(err) {
                if (err) throw err;
                console.log("Line appended to file");
            })
        }
    });
}

module.exports = { saveTrainingData };