const data = [...Array(200)].map((_, index) => ({
    userId: index + 101,
    id: index + 1,
    title: `Item ${index + 1}`,
    body: `This is the body of item ${index + 1}.`
}));

const itemsPerPage = 10;
let currentPage = 1;

function renderItems(items) {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <p><strong>User ID:</strong> ${item.userId}</p>
            <h3><b>Body:</b> ${item.body}</h3>
        `;
        itemsContainer.appendChild(itemElement);
    });
}

function getTotalPages() {
    return Math.ceil(data.length / itemsPerPage);
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';

    const totalPages = getTotalPages();

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePage();
        }
    });
    paginationContainer.appendChild(prevButton);

    const maxVisibleButtons = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (startPage > 1) {
        const firstPageButton = createPageButton(1);
        paginationContainer.appendChild(firstPageButton);

        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.classList.add('ellipsis');
            ellipsis.textContent = '...';
            paginationContainer.appendChild(ellipsis);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = createPageButton(i);
        paginationContainer.appendChild(pageButton);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.classList.add('ellipsis');
            ellipsis.textContent = '...';
            paginationContainer.appendChild(ellipsis);
        }
        const lastPageButton = createPageButton(totalPages);
        paginationContainer.appendChild(lastPageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePage();
        }
    });
    paginationContainer.appendChild(nextButton);
}

function createPageButton(page) {
    const button = document.createElement('button');
    button.textContent = page;
    button.classList.add('page-button');
    if (page === currentPage) {
        button.classList.add('active');
    }
    button.addEventListener('click', () => {
        currentPage = page;
        updatePage();
    });
    return button;
}

function updatePage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = data.slice(start, end);

    renderItems(currentItems);
    renderPagination();
}

updatePage();
