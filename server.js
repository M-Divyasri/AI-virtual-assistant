const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; 


app.use(bodyParser.json());


const faqData = [
  {
    question: "What is your return policy?",
    answer: "You can return items within 30 days of purchase."
  },
  {
    question: "How do I track my order?",
    answer: "You can track your order through the link sent to your email."
  }
];


function getFAQAnswer(query) {
  const result = faqData.find(faq => query.toLowerCase().includes(faq.question.toLowerCase()));
  return result ? result.answer : "Sorry, I couldn't find an answer to your question.";
}


app.post('/webhook', (req, res) => {
  const userQuery = req.body.queryResult.queryText;  
  const faqAnswer = getFAQAnswer(userQuery);  

  
  return res.json({
    fulfillmentText: faqAnswer
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Webhook server is running on http://localhost:${port}`);
});
