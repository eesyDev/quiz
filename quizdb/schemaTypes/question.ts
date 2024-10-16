export default {
  name: 'question',
  title: 'Question',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localizedString'
    },
    {
      name: 'questionText',
      title: 'Question Text',
      type: 'localizedBlock' // Локализуемый текст вопроса
    },
    {
      name: 'level',
      title: 'Level',
      type: 'reference',
      to: [{ type: 'level' }] 
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }] 
    },
    {
      name: 'hasOptions',
      title: 'Has Multiple Choice Options?',
      type: 'boolean',
      description: 'Indicates if the question has multiple choice answers.'
    },
    {
      name: 'answers',
      title: 'Answers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'answerText', title: 'Answer Text', type: 'localizedString' },
            { name: 'isCorrect', title: 'Is Correct', type: 'boolean' }
          ]
        }
      ],
      hidden: ({ document }: { document: any }) => !document?.hasOptions, // Показывать только если есть варианты ответа
      description: 'Provide multiple choice answers if applicable.'
    },
    {
      name: 'correctAnswerText',
      title: 'Correct Answer Text (for open-ended questions)',
      type: 'string',
      hidden: ({ document }: { document: any }) => document?.hasOptions, // Скрывать для вопросов с вариантами ответа
      description: 'For open-ended questions, provide the correct answer here.'
    }
  ],
  preview: {
    select: {
      title: 'title.ru'
    }
  }
};
