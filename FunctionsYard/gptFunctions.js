function toTrainingFormat(prompt, response) {
    const escapedMessage = JSON.stringify(prompt);
    const escapedResponse = JSON.stringify(response);
    const stringRep = `{
        message: ${escapedMessage},
        response: ${escapedResponse}
    }`;
    return stringRep;
}