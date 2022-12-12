let apiUrl
const apiUrls = {
  // YOU MUST CHANGE PRODUCTION URL WHEN DEPLOYING
  production: "https://maydayproxy.up.railway.app/https://musicreviews.fly.dev",
  development: "http://localhost:8080",
};

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export default apiUrl
