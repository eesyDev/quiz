import React from 'react';
import { Layout } from '@/components';
import { useSession, getSession } from 'next-auth/react';
import { client } from '@/utils/client';
import { userQuery } from '@/utils/queries';
import { useRouter } from 'next/router';

const Profile = ({ userData } : { userData : IUserExt }) => {
  const { locale } = useRouter();
  const currentLocale = locale as 'ru' | 'en';
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (!session) {
    return <div>Пожалуйста, войдите в систему, чтобы просмотреть профиль.</div>;
  }

  // Данные пользователя из Sanity
  const { userName, email, image, quizzes, questions } = userData;
console.log(userData)
  return (
    <Layout>
      <div className="container">
        <h1>Профиль</h1>
        <div className="profile-details">
          <img src={image} alt={userName} style={{ borderRadius: '50%', width: '150px' }} />
          <p>Имя: {userName}</p>
          <p>Email: {email}</p>
        </div>

        <div className="profile-section">
          <h2>Мои Квизы</h2>
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div key={quiz._id}>
                <h3>{quiz.title[currentLocale]}</h3>
                <p>{quiz.description}</p>
              </div>
            ))
          ) : (
            <p>У вас пока нет квизов.</p>
          )}
        </div>

        <div className="profile-section">
          <h2>Мои Вопросы</h2>
          {questions.length > 0 ? (
            questions.map((question) => (
              <div key={question._id}>
                <p>{question.questionText?.[currentLocale]?.[0]?.children?.[0]?.text}</p>
              </div>
            ))
          ) : (
            <p>У вас пока нет вопросов.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  // Получаем сессию пользователя
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  // Получаем ID пользователя из сессии
  const userId = session.user.email.replace(/[^a-zA-Z0-9_-]/g, ''); // Генерация userId

  // Запрашиваем все данные пользователя из Sanity, включая квизы и вопросы
  
  const userQ = userQuery(userId)
  const userData = await client.fetch(userQ);

  // Передаем данные в компонент через props
  return {
    props: {
      userData,
    },
  };
}
