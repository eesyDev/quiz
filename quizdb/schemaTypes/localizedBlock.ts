export default {
  name: 'localizedBlock',
  title: 'Localized Block',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'array', // Массив блоков
      of: [{ type: 'block' }] // Используем тип блоков для форматирования текста
    },
    {
      name: 'ru',
      title: 'Russian',
      type: 'array', // Массив блоков
      of: [{ type: 'block' }] // Используем тип блоков для форматирования текста
    },
  ]
};
