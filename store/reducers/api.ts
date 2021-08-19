import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NGIzMDRiLTgwODAtNGYwYi1iYWQ1LWUwNzBhNmIwOWM0NiIsImxvZ2luIjoiUmVhWnp5RkFLRTEiLCJpYXQiOjE2MjkzOTc5NzAsImV4cCI6MTYyOTQ4NDM3MH0.KLx010whpFryQS8GINy3Sfw2-XUx03XFIZKMLm6pdS0';

export const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
