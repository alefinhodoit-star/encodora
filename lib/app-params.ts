export const appParams = {
  appId: process.env.NEXT_PUBLIC_APP_ID || '',
  token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') || '' : '',
  functionsVersion: process.env.NEXT_PUBLIC_FUNCTIONS_VERSION || '',
  appBaseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL || '',
}