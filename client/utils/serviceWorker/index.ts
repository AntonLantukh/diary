export const registerServiceWorker = (): void => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            void navigator.serviceWorker.register('/apiServiceWorker.js', {scope: '/'}).catch(() => null);
        });
    }
};
