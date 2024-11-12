export const allUsersQuery = () => {
    const query = `*[_type == "user"]{
      userName, email, image, quizzes, questions, role, _id
    }`;
  
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

export const singleQuiz = (slug: string) => {
  const query = `*[_type == "quiz" && slug.current == "${slug}"]{
    title,
    slug,
    questions[]->{title, _id, answers[], questionText},
    category->{title, slug},
    level->{title, _id},
    author
  }`;

  return query
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

export const userQuery = (userId: string) => {
  return `*[_type == "user" && _id == "${userId}"][0]{
    userName,
    email,
    image,
    "quizzes": *[_type == "quiz" && author._ref == ^._id],
    "questions": *[_type == "question" && author._ref == ^._id],
    role,
    _id
  }`
} ;

export const allQuestions = () => {
  return `*[_type == "question"]`
}