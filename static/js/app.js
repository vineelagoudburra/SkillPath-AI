// DOM Elements
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const categoryPills = document.querySelectorAll('.filter-pill');
const timelineItems = document.querySelectorAll('.timeline-item');
const specialItems = document.querySelectorAll('.special-item');
const noResultsMsg = document.getElementById('no-results-msg');
const talkModal = document.getElementById('talk-modal');
const modalContentArea = document.getElementById('modal-content-area');
const viewApiLink = document.getElementById('view-api-link');

// State variables
let activeCategory = 'all';
let searchQuery = '';

// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Search input handlers
    searchInput.addEventListener('input', handleSearchInput);
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Category filter handlers
    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const category = pill.getAttribute('data-category');
            setCategoryFilter(category);
        });
    });

    // Modal click-outside handler
    talkModal.addEventListener('click', (e) => {
        if (e.target === talkModal) {
            closeTalkModal();
        }
    });

    // ESC key handler for modal close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && talkModal.classList.contains('active')) {
            closeTalkModal();
        }
    });

    // Developer API link helper (sets dynamic base URL)
    if (viewApiLink) {
        viewApiLink.setAttribute('href', `${window.location.origin}/api/talks`);
    }

    // Set initial animations
    animateTimelineItems();
});

// Animate items on load
function animateTimelineItems() {
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(15px)';
        item.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s`;
        
        setTimeout(() => {
            if (!item.classList.contains('filtered-out')) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        }, 50);
    });
}

// Handle search input typing
function handleSearchInput(e) {
    searchQuery = e.target.value.toLowerCase().trim();
    
    // Toggle clear search button visibility
    if (searchQuery.length > 0) {
        clearSearchBtn.style.display = 'block';
    } else {
        clearSearchBtn.style.display = 'none';
    }

    filterSchedule();
}

// Clear search input
function clearSearch() {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    searchInput.focus();
    filterSchedule();
}

// Set category filter state
function setCategoryFilter(category) {
    activeCategory = category;
    
    // Update active UI classes
    categoryPills.forEach(pill => {
        if (pill.getAttribute('data-category') === category) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });

    filterSchedule();
}

// Main logic to filter talks and handle breaks/special items
function filterSchedule() {
    let visibleTalkCount = 0;
    const isFilteringActive = (activeCategory !== 'all' || searchQuery.length > 0);

    timelineItems.forEach(item => {
        const type = item.getAttribute('data-type');
        
        if (type === 'talk') {
            const id = parseInt(item.getAttribute('data-id'), 10);
            const title = item.getAttribute('data-title') || '';
            const categoriesStr = item.getAttribute('data-categories') || '';
            const speakers = item.getAttribute('data-speakers') || '';
            
            // Get full talk details to search in description as well
            const talkDetails = TALKS_DATA.find(t => t.id === id);
            const description = talkDetails ? talkDetails.description.toLowerCase() : '';

            // Match Category
            const matchesCategory = (activeCategory === 'all' || categoriesStr.includes(activeCategory.toLowerCase()));
            
            // Match Search Query
            const matchesSearch = (searchQuery === '' || 
                                   title.includes(searchQuery) || 
                                   speakers.includes(searchQuery) || 
                                   categoriesStr.includes(searchQuery) ||
                                   description.includes(searchQuery));

            if (matchesCategory && matchesSearch) {
                item.classList.remove('filtered-out');
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                visibleTalkCount++;
            } else {
                item.classList.add('filtered-out');
            }
        } else {
            // Hide special items (breaks, lunches) when filters or search queries are active
            if (isFilteringActive) {
                item.classList.add('filtered-out');
            } else {
                item.classList.remove('filtered-out');
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        }
    });

    // Toggle No Results display
    if (visibleTalkCount === 0 && isFilteringActive) {
        noResultsMsg.style.display = 'block';
    } else {
        noResultsMsg.style.display = 'none';
    }
}

// Open modal and populate with talk details
function openTalkModal(talkId) {
    const talk = TALKS_DATA.find(t => t.id === talkId);
    if (!talk) return;

    // Generate categories HTML tags
    const tagsHtml = talk.categories.map(cat => 
        `<span class="category-tag tag-${cat.replace(/\s+/g, '-').replace(/&/g, 'and').toLowerCase()}">${cat}</span>`
    ).join(' ');

    // Generate speakers grid HTML
    const speakersHtml = talk.speakers.map(sp => `
        <div class="speaker-profile-card">
            <div class="speaker-avatar-large">
                <img src="${sp.avatar}" alt="${sp.first_name} ${sp.last_name}">
            </div>
            <div class="speaker-details">
                <span class="speaker-name">${sp.first_name} ${sp.last_name}</span>
                <span class="speaker-role">${sp.role}</span>
                <a href="${sp.linkedin}" target="_blank" rel="noopener noreferrer" class="speaker-linkedin-btn">
                    <i class="fab fa-linkedin"></i> LinkedIn Profile
                </a>
            </div>
        </div>
    `).join('');

    // Inject content into modal
    modalContentArea.innerHTML = `
        <div class="modal-header">
            <div class="tag-list">${tagsHtml}</div>
            <h2 class="modal-title">${talk.title}</h2>
            <div class="modal-meta">
                <div class="modal-meta-item">
                    <i class="fa-regular fa-clock"></i>
                    <span>${talk.time}</span>
                </div>
                <div class="modal-meta-item">
                    <i class="fa-solid fa-cloud"></i>
                    <span>ID: #Talk-0${talk.id}</span>
                </div>
            </div>
        </div>
        <div class="modal-body">
            <h3 class="modal-section-title">Session Abstract</h3>
            <p class="modal-description">${talk.description}</p>
        </div>
        <div class="modal-speakers-section">
            <h3 class="modal-section-title">Session Speaker${talk.speakers.length > 1 ? 's' : ''}</h3>
            <div class="speakers-grid">
                ${speakersHtml}
            </div>
        </div>
    `;

    // Show modal and handle accessibility
    talkModal.classList.add('active');
    talkModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scroll
    
    // Focus close button for accessibility
    document.getElementById('modal-close').focus();
}

// Close Modal
function closeTalkModal() {
    talkModal.classList.remove('active');
    talkModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Unlock background scroll
    
    // Return focus to active talk card trigger
    const activeCard = document.querySelector(`.talk-item[data-id="${talkModal.getAttribute('data-active-talk-id')}"] .talk-card`);
    if (activeCard) {
        activeCard.focus();
    }
}
