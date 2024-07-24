import { createSlice, Slice } from '@reduxjs/toolkit';
import { IResponse } from 'src/shared/shared.interface';

import { IReduxList } from '../interfaces/auth.interface';

const initialValue: IResponse[] = [] as unknown as IResponse[];

const listSlice: Slice = createSlice({
  name: 'landing',
  initialState: initialValue,
  reducers: {
    addList: (_state, action: IReduxList): IResponse[] => {
      return action.payload as IResponse[];
    },
    filterList: (state: IResponse[]): IResponse[] => {
      return state.filter((user) => !user.checked);
    },
    deleteListItem: (state: IResponse[], action: IReduxList): IResponse[] => {
      const removeUser = (data: IResponse[], userToRemove: IResponse[]): IResponse[] => {
        const userToRemoveId = new Set(userToRemove.map((user) => user.id));
        return data.filter((user) => !userToRemoveId.has(user.id));
      };
      const result = removeUser(state, action.payload);
      return result as IResponse[];
    },
    editList: (state: IResponse[], action: IReduxList): IResponse[] => {
      const editUsers = (data: IResponse[], userToEdit: IResponse[]): IResponse[] => {
        const userToEditId = new Set(userToEdit.map((user) => user.id));
        return data.map((user) => {
          if (userToEditId.has(user.id)) {
            return { ...user, edit: !user.edit, name: userToEdit[0].name, email: userToEdit[0].email, role: userToEdit[0].role };
          }
          return user;
        });
      };

      const result = editUsers(state, action.payload);
      return result;
    },
    checkList: (state: IResponse[], action: IReduxList): IResponse[] => {
      const editUsers = (data: IResponse[], userToEdit: IResponse[]): IResponse[] => {
        const userToEditId = new Set(userToEdit.map((user) => user.id));
        return data.map((user) => {
          if (userToEditId.has(user.id)) {
            return { ...user, checked: !user.checked };
          }
          return user;
        });
      };

      const result = editUsers(state, action.payload);
      return result;
    },
    checkAll: (state: IResponse[], action: { type: string; payload: { currentPage: number } }): IResponse[] => {
      const { currentPage } = action.payload;
      return state.map((user, index) => {
        if (index >= currentPage * 10 && index < (currentPage + 1) * 10) {
          return { ...user, checked: true };
        }
        return user;
      });
    },
    clearList: (): IResponse[] => {
      return [] as unknown as IResponse[];
    }
  }
});

export const { addList, filterList, deleteListItem, editList, checkList, checkAll, clearList } = listSlice.actions;
export default listSlice.reducer;
