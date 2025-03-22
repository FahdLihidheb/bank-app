'use client';

import { useState, useEffect } from 'react';
import { accountService } from '@/services';
import Image from 'next/image';
import { Account } from '@/types';
import { Loading } from '@/components';
import Link from 'next/link';

export default function Transfer() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [senderAccount, setsenderAccount] = useState<Account | null>(null);
  const [receiverAccount, setreceiverAccount] = useState<Account | null>(null);
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [error, setError] = useState<string>('');

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

  // Handle the transfer logic
  const handleTransfer = async () => {
    if (!senderAccount || !receiverAccount) {
      setError('Please select two accounts.');
      return;
    }

    if (senderAccount.id === receiverAccount.id) {
      setError(`Cannot transfer funds between the same account`);
      return;
    }

    if (transferAmount <= 0) {
      setError('Please enter a valid transfer amount.');
      return;
    }

    if (senderAccount.balance < transferAmount) {
      setError('Insufficient balance in the source account.');
      return;
    }

    if (senderAccount.currency !== receiverAccount.currency) {
      setError(
        `Currency mismatch: Cannot transfer between ${senderAccount.currency} and ${receiverAccount.currency} accounts.`
      );
      return;
    }

    try {
      await accountService.update(senderAccount.id, {
        ...senderAccount,
        balance: senderAccount.balance - transferAmount,
      });

      await accountService.update(receiverAccount.id, {
        ...receiverAccount,
        balance: receiverAccount.balance + transferAmount,
      });

      fetchAccounts();
      setTransferAmount(0)
      setError('');
    } catch (error) {
      console.error('Failed to transfer funds:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        <Link href="/">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="next logo"
            width={240}
            height={80}
          />
        </Link>
        <h1 className="text-2xl font-bold text-center">
          Transfer Funds Between Two Accounts
        </h1>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-md">
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-black rounded-4xl dark:invert dark:text-black w-full"
                onChange={(e) => {
                  const selected = accounts.find(
                    (acc) => acc.id === e.target.value
                  );
                  setsenderAccount(selected || null);
                }}
                value={senderAccount?.id || ''}
              >
                <option value="" disabled>
                  Sender Account
                </option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} - {account.currency} {account.balance}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-2 border border-black rounded-4xl dark:invert dark:text-black w-full"
                onChange={(e) => {
                  const selected = accounts.find(
                    (acc) => acc.id === e.target.value
                  );
                  setreceiverAccount(selected || null);
                }}
                value={receiverAccount?.id || ''}
              >
                <option value="" disabled>
                  Receiver Account
                </option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} - {account.currency} {account.balance}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Amount to Transfer
              </label>
              <input
                type="number"
                className="px-4 py-2 border border-black rounded-4xl dark:invert dark:text-black"
                value={transferAmount}
                onChange={(e) => setTransferAmount(parseFloat(e.target.value))}
                placeholder="Enter amount"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              className="px-4 py-2 bg-black text-white rounded-4xl cursor-pointer transition-transform duration-200 hover:scale-105 dark:invert"
              onClick={handleTransfer}
            >
              Transfer Funds
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
