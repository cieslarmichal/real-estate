import { useLoaderData } from 'react-router-dom';
import styles from './listingPage.module.css';
import CenteredContent from '../../components/centeredContent/centeredContent';
import ContentBox from '../../components/contentBox/contentBox';
import PhotoViewer from '../../components/photoViewer/photoViewer';
import { formatPricePln } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';
import DataTable from '../../components/dataTable/dataTable';

function ListingPage() {
  const listing = useLoaderData();

  const detailsData = [
    { label: 'Typ transakcji:', value: listing.type },
    { label: 'Lokalizacja:', value: listing.locality },
    { label: 'Rodzaj nieruchomości:', value: listing.propertyType },
    { label: 'Cena:', value: formatPricePln(listing.price) },
    { label: 'Powierzchnia:', value: `${listing.size} m2` },
    { label: 'Liczba pokoi:', value: listing.rooms },
    { label: 'Liczba łazienek:', value: listing.bathrooms },
    { label: 'Szerokość geograficzna:', value: listing.latitude },
    { label: 'Długość geograficzna:', value: listing.longitude },
    { label: 'Województwo:', value: listing.voivodeship },
    { label: 'Oferta zakończona', value: listing.finished ? 'Tak' : 'Nie' },
    { label: 'Utworzono:', value: formatDate(listing.createdAt) },
    { label: 'Zaktualizowano:', value: formatDate(listing.updatedAt) },
  ];

  return (
    <>
      <CenteredContent>
        <div className={styles.singlePage}>
          {listing.finished && <ContentBox>Listing zakończony</ContentBox>}

          <ContentBox title={listing.title}>
            <PhotoViewer images={listing.imageUrls} />
          </ContentBox>

          <ContentBox title={'Opis:'}>
            <div dangerouslySetInnerHTML={{ __html: listing.description }} />
          </ContentBox>

          <ContentBox title={'Szczegóły:'}>
            <DataTable
              data={detailsData}
              labelValueMode
            />
          </ContentBox>
        </div>
      </CenteredContent>
    </>
  );
}

export default ListingPage;
