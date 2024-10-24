export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'userName',
        title: 'UserName',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'string'
      },
      {
        name: 'role',
        type: 'string',
        title: 'Role',
        options: { 
          list: ['admin', 'mentor', 'student'] 
        }
      },
      {
        name: 'quizzes',
        title: 'Quizzes',
        type: 'array',
        of: [{ 
          type: 'reference', 
          to: [{ type: 'quiz' }]  
        }]
      },
      {
        name: 'questions',
        title: 'Questions',
        type: 'array',
        of: [{ 
          type: 'reference', 
          to: [{ type: 'question' }]
        }]
      }
    ]
  }
  