export const allUsersQuery = () => {
    const query = `*[_type == "user"]`;
  
    return query;
  };
  

  export const allCategoriesQuery = () => {
    const query = `*[_type == "category"]`;
  
    return query;
  };

export const allLevels = () => {
  const query = `*[_type == "level"]`

  return query
}

export const categoryQuestions = (category: string) => {
  const query = `*[_type == "question" && category->slug.current == "${category}"]`

  return query
}

export const quizesCat = (category: string) => {
  const query = `*[_type == "quiz" && category->slug.current == "${category}"]`

  return query
}

export const quizesCatAndLevel = (category: string, level: string) => {
  if (!category || !level) {
    console.error('Invalid category or level:', category, level);
    return ''; // Возвращаем пустую строку, если параметры некорректны
  }
  const query = `*[_type == "quiz" && category->slug.current == "${category}" && level._ref == "${level}"]`;
  console.log('Generated query:', query); // Лог запроса
  return query;
}


export const questionsByCategoryAndLevel = (categorySlug: string, level: string) => {
  return `*[_type == "question" && category->slug.current == "${categorySlug}" && level._ref == "${level}"]{
      title,
      body,
      category->{
          title,
          slug
      },
      difficulty
  }`;
};
