export const allUsersQuery = () => {
    const query = `*[_type == "user"]`;
  
    return query;
  };
  

  export const allCategoriesQuery = () => {
    const query = `*[_type == "category"]`;
  
    return query;
  };