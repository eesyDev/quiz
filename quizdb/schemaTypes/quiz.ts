export default {
    name: 'quiz',
    title: 'Quiz',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'localizedString'
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
            name: 'questions',
            title: 'Questions',
            type: 'array',  
            of: [{ type: 'reference', to: { type: 'question' } }] // Ссылки на вопросы
          }
    ],
    preview: {
        select: {
          title: 'title.ru'
        }
      }
}