import { useState, useEffect } from 'react';

const useFetch = (url, method, body = null) => {
  const [data, setData] = useState({ data: [], pagination: {}});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(url, { method: method, body: body ? JSON.stringify(body) : null })
				.then(res => res.json())
				.catch(error => {
          setError(error);
        })
        .then(data => {
          setIsLoaded(true);
          setData(data);
        })
        .catch(error => {
          setError(error);
        });
    };
    fetchData();
  }, [url]);

  return { error, isLoaded, data };
};

const buildPaginator = (slug, recordCount, total, page, count, orderBy, direction) => {
	return {
		prev_url: recordCount > 0 ? page > 1 ? `${process.env.NEXT_PUBLIC_URL}/dashboard/${slug}?page=${Number(page) - 1}&count=${Number(count)}&orderBy=${orderBy}&direction=${direction}` : null : null,
		next_url: recordCount > 0 ? page < (total / count) ? `${process.env.NEXT_PUBLIC_URL}/dashboard/${slug}?page=${Number(page) + 1}&count=${Number(count)}&orderBy=${orderBy}&direction=${direction}` : null : null,
		from: recordCount > 0 ? page === 1 ? 1 : ((page - 1) * count) + 1 : null,
		to: recordCount > 0 ? recordCount === count ? ((page - 1) * count) + count : ((page - 1) * count) + recordCount : null,
		total: total
	}
}

export {
	useFetch,
	buildPaginator
}