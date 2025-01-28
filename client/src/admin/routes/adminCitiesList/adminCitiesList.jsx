import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from '../../../styles/form.module.css';
import { useContext, useEffect, useState } from 'react';
import { backendUrl, voivodeships } from '../../../constants/api';
import { AuthContext } from '../../../context/authContext';
import CenteredContent from '../../../components/centeredContent/centeredContent';
import DataTable from '../../../components/dataTable/dataTable';
import Pagination from '../../../components/pagination/pagination';
import ContentBox from '../../../components/contentBox/contentBox';

function AdminCitiesList() {
  const { userData } = useContext(AuthContext);
  const [cities, setCities] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    name: searchParams.get('name') || '',
    voivodeship: searchParams.get('voivodeship') || '',
    page: parseInt(searchParams.get('page')) || 1,
  });

  const fetchCities = async () => {
    try {
      let url = `${backendUrl}/api/v1/cities?pageSize=20`;

      for (const key in filters) {
        if (filters[key]) {
          url += `&${key}=${filters[key]}`;
        }
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error while fetching cities');
      }

      const jsonResponse = await response.json();

      setCities(jsonResponse.data);

      setPagination({
        currentPage: jsonResponse.metadata.page,
        totalPages: Math.ceil(jsonResponse.metadata.total / jsonResponse.metadata.pageSize),
      });
    } catch (error) {
      console.error('Error while fetching cities:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [filters]);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handlePageChange = (page) => {
    setFilters({
      ...filters,
      page,
    });

    setSearchParams({ ...filters, page });

    navigate(
      `/admin/cities?${new URLSearchParams({
        ...filters,
        page,
      }).toString()}`,
    );
  };

  const columns = [
    { header: 'Nazwa miasta', field: 'name', isLink: true },
    { header: 'Województwo', field: 'voivodeship' },
    { header: 'Typ', field: 'type' },
    { header: 'Powiat', field: 'district' },
    { header: 'Gmina', field: 'commune' },
  ];

  const data = cities.map((city) => ({
    name: { text: city.name, link: `/cities/${city.name}` },
    voivodeship: city.voivodeship,
    type: city.type,
    district: city.district,
    commune: city.commune,
  }));

  return (
    <CenteredContent>
      <ContentBox title="Lista miast">
        <div className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nazwa miasta</label>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                className={styles.inputField}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="voivodeship">Województwo</label>
            <div>
              <select
                name="voivodeship"
                id="voivodeship"
                value={filters.voivodeship}
                onChange={handleFilterChange}
                className={styles.inputField}
              >
                <option value="">Wybierz województwo</option>
                {voivodeships.map((voivodeship) => (
                  <option
                    key={voivodeship}
                    value={voivodeship}
                  >
                    {voivodeship}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={data}
        />

        <Pagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </ContentBox>
    </CenteredContent>
  );
}

export default AdminCitiesList;
