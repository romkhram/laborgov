import axios from 'axios';

export const api = axios.create({
  baseURL: '/rest-api'
});

export const file = axios.create({
  baseURL: '/rest-files'
});

export const utils = axios.create({
  baseURL: '/rest-utils'
});

export const reports = axios.create({
  baseURL: '/rest-reports'
});

export const epetitions = axios.create({
  baseURL: '/rest-epetitions-utils'
});

export const delivery = axios.create({
  baseURL: '/epetitions-delivery'
});

export const scheduler = axios.create({
  baseURL: '/epetitions-scheduler'
});

export const epetitionsFile = 'https://95.216.167.149:31100/rest-epetitions-utils' // Absolute !!! DANGER !!! ERROR !!! Change on build !!!
