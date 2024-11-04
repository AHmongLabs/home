document.addEventListener('DOMContentLoaded', () => {
    const notebookPage = document.querySelector('.notebook-page');
    let isDragging = false;
    let startX, startY, initialX, initialY;

    function startDragging(e) {
        isDragging = true;
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX - initialX;
            startY = e.touches[0].clientY - initialY;
        } else {
            startX = e.clientX - initialX;
            startY = e.clientY - initialY;
        }
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        const newX = clientX - startX;  
        const newY = clientY - startY;
        notebookPage.style.left = `${newX}px`;
        notebookPage.style.top = `${newY}px`;
    }

    function stopDragging() {
        isDragging = false;
    }

    // Mouse events
    notebookPage.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    // Touch events
    notebookPage.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDragging);

    // Set initial position
    const rect = notebookPage.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;
    notebookPage.style.left = `${initialX}px`;
    notebookPage.style.top = `${initialY}px`;
});
