import { Account, AccountSchema } from '@/types';
import apiClient from './api';
import { z } from 'zod';

const accountArraySchema = z.array(AccountSchema);

export const accountService = {
    getAll: async () => {
        const response = await apiClient.get('/accounts');
        return accountArraySchema.parse(response.data);
    },
    getById: async (id: string) => {
        const response = await apiClient.get(`/accounts/${id}`);
        return AccountSchema.parse(response.data);
    },
    create: async (data: Account) => {
        const response = await apiClient.post('/accounts', data);
        return AccountSchema.parse(response.data);
    },
    update: async (id: string, data: Account) => {
        const response = await apiClient.put(`/accounts/${id}`, data);
        return AccountSchema.parse(response.data);
    },
    delete: async (id: string) => {
        const response = await apiClient.delete(`/accounts/${id}`);
        return AccountSchema.parse(response.data);
    },
};
