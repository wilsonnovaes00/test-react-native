import { create } from 'apisauce';

const api = create({
  baseURL: 'https://gorest.co.in/'
});

api.addAsyncRequestTransform(request => async () => {
  const token = 'qr9NU7oZA5VHfG2DuRCoQyFqj4Ii0q_4zLNV';
  if (token)
    request.headers['Authorization'] = `Bearer ${token}`;
});

api.addResponseTransform(response => {
  if (!response.data._meta.success) throw response;
});

export default api;