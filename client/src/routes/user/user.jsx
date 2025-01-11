import { useLoaderData } from 'react-router-dom';
import CenteredContent from '../../components/centeredContent/centeredContent';
import ContentBox from '../../components/contentBox/contentBox';
import UserInfo from '../../components/userInfo/userInfo';

function User() {
  const user = useLoaderData();

  return (
    <>
      <CenteredContent>
        <ContentBox title={`Dane użytkownika: ${user.name}`}>
          <UserInfo user={user} />
        </ContentBox>
      </CenteredContent>
    </>
  );
}

export default User;
