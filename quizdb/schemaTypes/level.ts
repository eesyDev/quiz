export default {
    name: 'level',
    title: 'Level',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }]
      },
      {
        name: 'difficulty',
        title: 'Difficulty Level',
        type: 'number',
        description: 'For example, 1 = Easy, 5 = Hard'
      }
    ]
  };
  