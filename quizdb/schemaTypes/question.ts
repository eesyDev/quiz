export default {
    name: 'question',
    title: 'Question',
    type: 'document',
    fields: [
      {
        name: 'questionText',
        title: 'Question Text',
        type: 'text'
      },
      {
        name: 'level',
        title: 'Level',
        type: 'reference',
        to: [{ type: 'level' }]
      },
      {
        name: 'answers',
        title: 'Answers',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'answerText', title: 'Answer Text', type: 'string' },
              { name: 'isCorrect', title: 'Is Correct', type: 'boolean' }
            ]
          }
        ]
      }
    ]
  };
  