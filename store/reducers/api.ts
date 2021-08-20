import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NGIzMDRiLTgwODAtNGYwYi1iYWQ1LWUwNzBhNmIwOWM0NiIsImxvZ2luIjoiUmVhWnp5RkFLRTEiLCJpYXQiOjE2Mjk0ODYwMTEsImV4cCI6MTYyOTU3MjQxMX0.sZfiJ6j8pu5iYNwUXAKh6toDUC9mPn1SWAuyj2X-sQM';

export const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
