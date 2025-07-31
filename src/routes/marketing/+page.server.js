import jwt from 'jsonwebtoken';
export async function load({
  request, locals, cookies, params,
}) {
  const some_cookie = cookies.get('operator_token');
  let marketingAccessSocialMediaPosts = false;
  let eventData = null;
  if (some_cookie) {
    try {
      const decoded = jwt.decode(some_cookie);
      marketingAccessSocialMediaPosts = decoded.marketing_access_social_media_posts || false;
      // Fetch event data from the API
      const eventResponse = await fetch('https://get-micdrop.com/api/public/getEvent/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${some_cookie}`
        }
      });
      if (eventResponse.ok) {
        eventData = await eventResponse.json();
      } else {
        console.error('Failed to fetch event data:', eventResponse.status);
      }
    } catch (error) {
      console.error('Failed to decode JWT or fetch event data:', error);
    }
  }
  return {
    token: some_cookie,
    eventID: 1,
    marketingAccessSocialMediaPosts,
    eventData
  };
}