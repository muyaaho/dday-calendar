// 기능2: 공유하기
document.getElementById('shareButton').addEventListener('click', async () => {
    try {
        if (!navigator.share) {
            alert('Web Share API is not available on your brower.');
            return;
        }

        // Your share data
        const shareData = {
            title: 'Web share Example',
            text: 'Check out this web share example!',
            url: window.location.href
        };

        // Invoke the share dialog
        await navigator.share(shareData);
        console.log('Data was shared successfully');
    }
    catch (err) {
        console.error('Share failed:', err.message);
    }
});