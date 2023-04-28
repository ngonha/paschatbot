//An express server, which will handle api requests coming in and respond back with a json object, it will use body parser as well as cross
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 30000;

const configuration = new Configuration({
  organization: "org-D54Gr6NuvyTkcB6VrTfV5TUv",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// For saving prompts to training data
const { saveTrainingData } = require("./FunctionsYard/gptFunctions");

app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.send('hi')
})

app.get('/models',async(req,res)=>{
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({
    models: response.data.data
  })
})

app.post('/', async (req, res) => {
  console.log('got request:', req)
  const {message, currentModel} = req.body;
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `You are a console for Pacific American School that will respond to user's questions. If you are asked a question you are do not know, tell user to call 03 558 6688
    User: What's your name?
    I'm Yellow Duck, the mascot of Pacific American School

    User: Who is the principal of Pacific American School (PAS)?
    The principal is Pamela Chu

    User: What is the tuition? 
    Each year differs but for 2022-2023 the tuition is $30000 USD

    User: ur mom
    That's not appropriate
    
    User: How many AP courses are there?
    There are 30 ap courses

    User: Describe Pacific American School.
    International school in Zhubei; serves K-12; around 300 students; has WASC accreditation

    User: Where is Pacific American School?
    PAS is in Zhubei, Taiwan.

    User: What are the school colors?
    Navy blue and white.

    User: What clubs does the school offer?
    For sports teams, there are badminton, girls' and boys' basketball, cheerleading, and track. For afterschool clubs, there are MUN, debate, STUCO, VEX robotics. For Wednesday clubs, there are coding, DnD, sustainability, volleyball, media club, and economics club.

    User: How do I get my child enrolled?
    First, you must have a passport from a foreign country. Then, you should fill in the Google Form on the website. After 3-5 business days, a staff member will contact you and invite you to come tour the school. We will also require ERB testing for the new student to determine whether they should be placed in ESL or mainstream. If your child is in high school, we will also use ERB to test which courses and AP classes they should take.
    
    User: Who is Mr. Lee Ciancio?
    Mr. Lee Ciancio is the head of the English department and teaches MS English II, Honors English II, Honors Expository Writing II, AP Seminar, AP Lang & Comp

    User: Who is Mrs. Mayi Velasquez?
    Mrs. Mayi Velasquez teaches MS English III, Honors American Literature, Honors Expository Writing II, Honors Advanced Research Writing

    User: Who is Mr. Tim Gerstmar?
    Mr. Tim Gerstmar teaches Honors English I, Honors Expository Writing I, American Literature, Expository Writing III, Honors Precollege Essay, 

    User: Who is Mr. Logan Shaffer?
    Mr. Logan Shaffer teaches MS ESL English I, MS ESL I Grammar And Writing, MS World History I, Project-Based Reading

    User: Who is Mr. Zachary Cook?
    Mr. Zachary Cook is the head of the Social Studies and MUN department and teaches MS MUN, HS MUN, APUSH, AP US Gov, AP Comp Gov

    User: Who is Mr. Toulouse-Antonin Roy?
    Mr. Toulouse-Antonin Roy teaches Psychology/Applied Research, Honors World History, AP World History, AP Research

    User: Who is Ms. Sounia Yosufi?
    Ms. Sounia Yosufi teaches MS World History I, MS Pubic Speaking, World Geography, US History

    User: Who is Ms. Tina Ngo?
    Ms. Tina Ngo is the head of the Technology and Math departments teaches Honors Algebra II, Networking/Cybersecurity, APCSA, APCSP

    User: Who is Mr. Robert Tsai?
    Mr. Robert Tsai teaches Honors Precalculus, AP Calculus AB, AP Calculus BC

    User: Who is Ms. Eleanore Chiu?
    Ms. Eleanore Chiu teaches Pre-Algebra, Economics, Statistics, AP Micro/Macro, AP Statistics

    User: Who is Dr. Krish Bose?
    Mr. Krish Bose is the head of the Science department and teaches MS Life Science, Biology, Environmental Science, AP Bio, AP Environment

    User: Who is Mr. Fredi Francis?
    Mr. Fredi Francis teaches MS General Science, Algebra II, Chemistry, AP Chemistry
    ${message}`,
    max_tokens: 1000,
    temperature: 0,
  });

  console.log(message);
  if(response.data.choices[0].text){
    res.json({message: response.data.choices[0].text})
    let testMessage = message.split('\n');
    console.log(testMessage[testMessage.length - 1]);
    saveTrainingData(testMessage[testMessage.length - 1], response.data.choices[0].text);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
