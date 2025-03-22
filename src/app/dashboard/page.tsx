'use client';

import { useState, useEffect } from 'react';
import { accountService } from '@/services';
import Image from 'next/image';
import { Account } from '@/types';
import { Loading } from '@/components';
import RowActions from '@/components/dashboard/row-actions';
import EditModal from '@/components/dashboard/edit-modal';
import Link from 'next/link';

export default function Dashboard() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await accountService.getAll();
      setAccounts(data);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleAddSave = () => {
    fetchAccounts();
    setShowAddModal(false);
  };

  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <header className="p-4">
          <Link href="/">
            <Image
              className="dark:invert"
              src="/eurosender.svg"
              alt="Eurosender logo"
              width={200}
              height={80}
            />
          </Link>
        </header>
        <main className="p-8 sm:p-20">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Accounts</h2>
              <button
                onClick={handleAddClick}
                className="px-4 py-2 border border-black rounded-4xl cursor-pointer transition-transform duration-200 dark:invert dark:text-black"
              >
                Add New Account
              </button>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <div className="overflow-hidden rounded-2xl border border-black dark:border-white shadow-lg">
                <table className="w-full border-collapse overflow-hidden rounded-2xl shadow-lg">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="px-4 py-2 text-left">Account Name</th>
                      <th className="px-4 py-2 text-left">Balance</th>
                      <th className="px-4 py-2 text-left">Currency</th>
                      <th className="px-4 py-2 text-right w-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((account) => (
                      <tr key={account.id}>
                        <td className="border-t px-4 py-2">{account.name}</td>
                        <td className="border-t px-4 py-2">
                          {account.balance}
                        </td>
                        <td className="border-t px-4 py-2">
                          {account.currency}
                        </td>
                        <td className="border-t px-2 py-2 text-right whitespace-nowrap">
                          <RowActions
                            accountData={account}
                            refrech={fetchAccounts}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      <EditModal
        mode="add"
        isOpen={showAddModal}
        accountData={{
          id: '',
          name: '',
          balance: 0,
          currency: '',
        }}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddSave}
      />
    </>
  );
}
