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
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title.en',
              maxLength: 60
            }
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
            name: 'icon',
            title: 'Icon',
            type: 'string'
          },
          {
            name: 'questions',
            title: 'Questions',
            type: 'array',  
            of: [{ type: 'reference', to: { type: 'question' } }]
          }
    ],
    preview: {
        select: {
          title: 'title.ru'
        }
      }
}