function toTrainingFormat(prompt, response) {
    const escapedMessage = JSON.stringify(prompt);
    const escapedResponse = JSON.stringify(response);
    const repObject = {
        message: escapedMessage,
        response: escapedResponse
    };
    return repObject;
}

function toTrainingString(prompt, response) {
    const escapedMessage = JSON.stringify(prompt);
    const escapedResponse = JSON.stringify(response);
    const repString = `{
        message: ${escapedMessage},
        response: ${escapedResponse}
    };`
    return repString;
}