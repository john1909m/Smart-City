import { HttpInterceptorFn } from '@angular/common/http';
import { API_BASE_URL } from '../constants/api-endpoints';

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('http')) {
    return next(req);
  }

  const normalized = req.url.startsWith('/') ? req.url : `/${req.url}`;
  return next(req.clone({ url: `${API_BASE_URL}${normalized}` }));
};
