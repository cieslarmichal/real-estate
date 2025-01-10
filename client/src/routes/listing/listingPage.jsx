import { useLoaderData } from 'react-router-dom';
import styles from './listingPage.module.css';
import CenteredContent from '../../components/centeredContent/centeredContent';
import ContentBox from '../../components/contentBox/contentBox';
import PhotoViewer from '../../components/photoViewer/photoViewer';

function ListingPage() {
  const listing = useLoaderData();

  return (
    <>
      <CenteredContent>
        <div className={styles.singlePage}>
          {listing.finished && <ContentBox>Listing zakończony</ContentBox>}

          <ContentBox title={listing.title}>
            <PhotoViewer images={listing.imageUrls} />
          </ContentBox>
        </div>
      </CenteredContent>
    </>
  );
}

export default ListingPage;
