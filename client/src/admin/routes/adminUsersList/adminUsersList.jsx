import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from '../../../styles/form.module.css';
import { useContext, useEffect, useState } from 'react';
import { backendUrl } from '../../../constants/api';
import { AuthContext } from '../../../context/authContext';
import CenteredContent from '../../../components/centeredContent/centeredContent';
import DataTable from '../../../components/dataTable/dataTable';
import Pagination from '../../../components/pagination/pagination';
import ContentBox from '../../../components/contentBox/contentBox';

function AdminUsersList() {
  const { userData } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    username: searchParams.get('username') || '',
    email: searchParams.get('email') || '',
    page: parseInt(searchParams.get('page')) || 1,
  });

  const fetchUsers = async () => {
    try {
      let url = `${backendUrl}/api/v1/users?pageSize=20`;

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
        throw new Error('Error while fetching users');
      }

      const jsonResponse = await response.json();

      setUsers(jsonResponse.data);

      setPagination({
        currentPage: jsonResponse.metadata.page,
        totalPages: Math.ceil(jsonResponse.metadata.total / jsonResponse.metadata.pageSize),
      });
    } catch (error) {
      console.error('Error while fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
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
      `/admin/users?${new URLSearchParams({
        ...filters,
        page,
      }).toString()}`,
    );
  };

  const columns = [
    { header: 'ID', field: 'id', isLink: true },
    { header: 'Nazwa użytkownika', field: 'username' },
    { header: 'Email', field: 'email' },
    { header: 'Rola', field: 'role' },
  ];

  const data = users.map((user) => ({
    id: { text: user._id, link: `/profiles/${user._id}` },
    username: user.username,
    email: user.email,
    role: user.role,
  }));

  return (
    <CenteredContent>
      <ContentBox title="Lista użytkowników">
        <div className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Nazwa użytkownika</label>
            <div>
              <input
                type="text"
                id="username"
                name="username"
                value={filters.username}
                onChange={handleFilterChange}
                className={styles.inputField}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <div>
              <input
                type="text"
                id="email"
                name="email"
                value={filters.email}
                onChange={handleFilterChange}
                className={styles.inputField}
              />
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

export default AdminUsersList;
