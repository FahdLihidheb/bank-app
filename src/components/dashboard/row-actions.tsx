import React, { useState } from 'react';
import { Account } from '@/types';
import EditModal from './edit-modal';
import DeleteModal from './delete-modal';

interface RowActionsProps {
  accountData: Account;
  refrech: () => void;
}

const RowActions: React.FC<RowActionsProps> = ({ accountData, refrech }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    refrech();
    setShowDeleteModal(false);
  };

  const handleEditSave = () => {
    refrech();
    setShowEditModal(false);
  };

  return (
    <>
      <div className="flex space-x-2">
        <button
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
          aria-label="Edit"
          onClick={handleEditClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4.5 1.125 1.125-4.5L16.862 3.487z"
            />
          </svg>
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
          aria-label="Delete"
          onClick={handleDeleteClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        accountData={accountData}
        onClose={handleCancelDelete}
        onDelete={handleDelete}
      />

      {/* Edit Modal */}
      <EditModal
        mode="edit"
        isOpen={showEditModal}
        accountData={accountData}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditSave}
      />
    </>
  );
};

export default RowActions;
