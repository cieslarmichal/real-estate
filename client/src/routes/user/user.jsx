import { useLoaderData } from 'react-router-dom';
import CenteredContent from '../../components/centeredContent/centeredContent';
import ContentBox from '../../components/contentBox/contentBox';
import UserInfo from '../../components/userInfo/userInfo';
import ListingItem from '../../components/listingItem/listingItem';
import styles from './user.module.css';

function User() {
  const user = useLoaderData();

  return (
    <>
      <CenteredContent>
        <ContentBox title={`Dane użytkownika: ${user.username}`}>
          <UserInfo user={user} />
        </ContentBox>
        <div className={styles.userListings}>
          <h3>Oferty użytkownika:</h3>
          {user.listings && user.listings.length > 0 ? (
            user.listings.map((listing) => (
              <ListingItem
                key={listing._id}
                listing={listing}
                user={user}
              ></ListingItem>
            ))
          ) : (
            <p>Brak ofert użytkownika</p>
          )}
        </div>
      </CenteredContent>
    </>
  );
}

export default User;
