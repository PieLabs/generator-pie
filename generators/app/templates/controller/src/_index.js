export function outcome(question, session) {

  return new Promise((resolve) => {
    var correct = (session.answer === question.answer);
    resolve({
      score: {
        scaled: correct ? 1 : 0
      }
    });
  });

}

export function model(question, session, env) {

  return new Promise((resolve) => {
    var response = {};
    if (env.mode === 'evaluate') {
      let correct = session && session.answer && session.answer === question.answer;
      response.result = correct;
      response.feedback = correct ? question.feedback.correct : question.feedback.incorrect;
    }
    resolve(response);
  });

}