import '@testing-library/react';
import { getRegisteredLocales } from 'num-beauty';

// Ensure locales are loaded
console.log('Available locales:', getRegisteredLocales());
