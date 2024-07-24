import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'src/shared/input/Input';
import Pagination from 'src/shared/pagination/Pagination';
import { IReduxState, IResponse } from 'src/shared/shared.interface';
import { searchData, showSuccessToast } from 'src/shared/utils/utility-functions';
import { v4 as uuid } from 'uuid';

import { addList, checkAll, checkList, deleteListItem, editList, filterList } from '../reducers/landing-page.reducer';
import { useGetListQuery } from '../services/auth.service';

const LandingPage: FC = (): ReactElement => {
  const { data: originalList } = useGetListQuery();
  const dispatch = useDispatch();
  const filteredList = useSelector((state: IReduxState) => state.landing);
  const checkAllRef = useRef(false);
  const [currentPage, setCurrentPage] = useState(0);
  const userRef: React.MutableRefObject<{
    name: string | null;
    email: string | null;
    role: string | null;
  }> = useRef({ name: null, email: null, role: null });
  const [search, setSearch] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (originalList) {
          const updatedData: IResponse[] = originalList.map((user) => ({
            ...user,
            checked: false,
            edit: false
          }));
          dispatch(addList(updatedData));
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkUser();
  }, [originalList, dispatch]);

  return (
    <div className="relative box-border min-h-[100vh] w-full overflow-x-auto bg-red-50">
      <div className="relative box-border w-full shadow-md sm:rounded-lg">
        <div className="flex w-full justify-center pb-4 dark:bg-gray-900">
          <Input placeholder={'search items'} setSearch={setSearch} setCurrentPage={setCurrentPage} />
        </div>
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    onChange={() => {
                      dispatch(checkAll({ currentPage }));
                      checkAllRef.current = !checkAllRef.current;
                    }}
                    checked={checkAllRef.current}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                <button
                  onClick={() => {
                    dispatch(filterList(''));
                    checkAllRef.current = false;
                    showSuccessToast('deleted selected items successfully');
                  }}
                  className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-700"
                >
                  Delete Selected
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {(search ? searchData(filteredList, search) : filteredList)
              ?.slice(currentPage * 10, (currentPage + 1) * 10)
              .map((item: IResponse) => (
                <tr
                  key={uuid()}
                  className={`border-b bg-white hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 ${item.checked ? 'bg-gray-400' : ''} ${item.edit ? 'bg-gray-400' : ''}`}
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                        onChange={() => {
                          dispatch(checkList([item]));
                        }}
                        checked={item.checked}
                      />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {item.id}
                  </th>
                  <td className="px-6 py-4">
                    {item.edit ? (
                      <form className="form">
                        <input
                          className="w-full min-w-0 flex-grow"
                          type="text"
                          placeholder={item.name}
                          onChange={(e) => {
                            userRef.current.name = e.target.value;
                          }}
                          required
                        />
                      </form>
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.edit ? (
                      <form className="form">
                        <input
                          type="email"
                          className="w-full min-w-0 flex-grow"
                          placeholder={item.email}
                          onChange={(e) => {
                            userRef.current.email = e.target.value;
                          }}
                          required
                        />
                      </form>
                    ) : (
                      item.email
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.edit ? (
                      <form className="form">
                        <input
                          className="w-full min-w-0 flex-grow"
                          type="text"
                          placeholder={'press enter after role change'}
                          onChange={(e) => {
                            userRef.current.role = e.target.value;
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              dispatch(
                                editList([
                                  {
                                    ...item,
                                    name: userRef.current.name ?? item.name,
                                    email: userRef.current.email ?? item.email,
                                    role: userRef.current.role ?? item.role
                                  }
                                ])
                              );
                              showSuccessToast('item edited successfully');
                            }
                          }}
                          required
                        />
                      </form>
                    ) : (
                      item.role
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          dispatch(deleteListItem([item]));
                          showSuccessToast('deleted item successfully');
                        }}
                        className="delete"
                      >
                        <FaTrash className="icon icon-tabler icon-tabler-info-circle" />
                      </button>
                      <button onClick={() => dispatch(editList([{ ...item }]))} className="edit">
                        <FaPenToSquare className="icon icon-tabler icon-tabler-info-circle" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="fixed bottom-0 left-0 flex w-full justify-center bg-white p-4 shadow-md dark:bg-gray-900">
        <Pagination count={Math.ceil(filteredList.length / 10)} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default LandingPage;
