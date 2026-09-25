const logoApiUrl = import.meta.env.VITE_LOGO_API_URL;
const apiKey = import.meta.env.VITE_LOGO_PUBLISHABLE_API_KEY;

export class LogoDevApi {
    getUrlToLogo = source => {
        const domain = new URL(source.url.toString()).host;
        return `${logoApiUrl}/${domain}?token=${apiKey}&format=webp&retina=true`;
    }
}
