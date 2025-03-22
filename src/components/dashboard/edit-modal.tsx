import React, { useState } from 'react';
import { accountService } from '@/services';
import { Account } from '@/types';

type Mode = 'edit' | 'add';

interface EditModalProps {
  isOpen: boolean;
  accountData: Account;
  onClose: () => void;
  onSave: (updatedAccount: Account) => void;
  mode: Mode;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  accountData,
  onClose,
  onSave,
  mode,
}) => {
  const [editFormData, setEditFormData] = useState(accountData);
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setEditFormData(accountData);
    }
  }, [isOpen, accountData]);

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === 'balance' ? parseFloat(value) : value,
    }));
  };

  const handleConfirmEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsEditing(true);
      if (mode === 'edit')
        await accountService.update(accountData.id, editFormData);
      else await accountService.create(editFormData);
      onSave(editFormData); // Notify parent to refresh data
    } catch (error) {
      console.error('Failed to update account:', error);
    } finally {
      setIsEditing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full border border-gray-300 dark:border-gray-600">
        <h3 className="text-lg font-semibold mb-4">
          {`${mode === 'edit' ? 'Edit' : 'Create'} Account`}
        </h3>
        <form onSubmit={handleConfirmEdit}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={editFormData.name || ''}
                onChange={handleEditInputChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Balance
              </label>
              <input
                type="number"
                name="balance"
                value={editFormData.balance || 0}
                onChange={handleEditInputChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Currency
              </label>
              <select
                name="currency"
                value={editFormData.currency || ''}
                onChange={handleEditInputChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
                required
              >
                <option value="">Select a currency</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="CHF">CHF - Swiss Franc</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={isEditing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isEditing}
            >
              {isEditing ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
