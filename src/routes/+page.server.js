export async function load({
  request, locals, cookies, params,
}) {
  const some_cookie = cookies.get('operator_token');
  return {
    token: some_cookie,
  };
}