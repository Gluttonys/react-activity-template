function getQueryObj() {
  const [, query] = window.location.search.split('?');
  let queryObj: Record<string, any> = {};
  if (!query?.trim()) return queryObj;
  query.split('&').forEach((item) => {
    if (item.startsWith('token')) {
      queryObj['token'] = decodeURIComponent(item.slice(6)).replace(/\s/g, '+');
    } else {
      let [key, value] = item.split('=');
      queryObj[key] = decodeURIComponent(value).replace(/\s/g, '+');
    }
  });
  return queryObj;
}

/*
 * 拼接 class
 * */
const cc = (...classes: string[]): string => classes.join(' ');

export { getQueryObj, cc };
