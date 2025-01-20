import { createClient } from '@vercel/kv';

let kv;

if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  try {
    console.log('Attempting to create KV client with URL:', process.env.KV_REST_API_URL);
    kv = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
    console.log('KV client created successfully');
  } catch (error) {
    console.error('Error creating KV client:', error);
    throw error;
  }
} else {
  console.warn('KV_REST_API_URL or KV_REST_API_TOKEN not found. KV functionality will be limited.');
  kv = {
    get: async (key: string) => {
      console.warn(`Attempted to use KV.get(${key}) without proper configuration`);
      return null;
    },
    set: async (key: string, value: any) => {
      console.warn(`Attempted to use KV.set(${key}, ${JSON.stringify(value)}) without proper configuration`);
    },
    del: async (key: string) => {
      console.warn(`Attempted to use KV.del(${key}) without proper configuration`);
    },
  };
}

export { kv };

