const data = [...Array(100)].map((_, index) => ({
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
    prevButton.textContent = 'Prev';
    if(currentPage === 1){
        prevButton.disabled = true;
    }
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePage();
        }
    });
    paginationContainer.appendChild(prevButton);

    // Render all page buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-button');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            updatePage();
        });
        paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    if(currentPage === totalPages){
        nextButton.disabled = true;
    }
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePage();
        }
    });
    paginationContainer.appendChild(nextButton);
}

function updatePage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = data.slice(start, end);
    
    renderItems(currentItems);
    renderPagination();
}

updatePage();
