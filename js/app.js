// App Configuration
const CONFIG = {
    itemsPerPage: 12,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
    categories: {
        nature: { name: 'Nature', icon: '🌿', color: '#10b981' },
        abstract: { name: 'Abstract', icon: '🎨', color: '#8b5cf6' },
        minimal: { name: 'Minimal', icon: '⚪', color: '#6b7280' },
        space: { name: 'Space', icon: '🚀', color: '#1e40af' },
        animals: { name: 'Animals', icon: '🐾', color: '#f59e0b' },
        architecture: { name: 'Architecture', icon: '🏛️', color: '#dc2626' },
        cars: { name: 'Cars', icon: '🚗', color: '#059669' },
        anime: { name: 'Anime', icon: '🌸', color: '#ec4899' }
    },
    languages: {
        vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
        en: { name: 'English', flag: '🇺🇸' }
    }
};

// Translations
const TRANSLATIONS = {
    vi: {
        title: 'ShareAnh - Chia sẻ ảnh đẹp',
        hero_title: 'Chia sẻ và khám phá những bức ảnh đẹp',
        hero_subtitle: 'Cộng đồng chia sẻ ảnh nền chất lượng cao cho máy tính và điện thoại',
        submit_wallpaper: 'Đăng ảnh',
        search_placeholder: 'Tìm kiếm ảnh...',
        sort_newest: 'Mới nhất',
        sort_oldest: 'Cũ nhất',
        sort_popular: 'Phổ biến',
        all_categories: 'Tất cả',
        upload_title: 'Đăng ảnh mới',
        upload_hint: 'Kéo thả hoặc click để chọn ảnh',
        upload_supported: 'Định dạng: JPG, PNG, WebP (Tối đa: 10MB)',
        title_label: 'Tiêu đề',
        title_placeholder: 'Nhập tiêu đề ảnh',
        category_label: 'Danh mục',
        category_placeholder: 'Chọn danh mục',
        description_label: 'Mô tả',
        description_placeholder: 'Mô tả về ảnh (tùy chọn)',
        submit: 'Đăng ảnh',
        submitting: 'Đang đăng...',
        download: 'Tải xuống',
        share: 'Chia sẻ',
        delete: 'Xóa',
        delete_confirm: 'Bạn có chắc muốn xóa ảnh này?',
        admin_mode: 'Chế độ Admin',
        admin_info: 'Chế độ admin đã bật. Bạn có thể xóa ảnh không phù hợp.',
        welcome_message: 'Chào mừng đến với ShareAnh! Nhấp đúp vào logo để bật chế độ admin.',
        upload_success: 'Đăng ảnh thành công!',
        upload_error: 'Có lỗi xảy ra khi đăng ảnh',
        file_too_large: 'File quá lớn (tối đa 10MB)',
        invalid_format: 'Định dạng file không được hỗ trợ',
        resolution_too_low: 'Độ phân giải quá thấp',
        download_started: 'Bắt đầu tải xuống!',
        image_deleted: 'Đã xóa ảnh thành công',
        no_images: 'Không có ảnh nào',
        loading: 'Đang tải...',
        theme_light: 'Sáng',
        theme_dark: 'Tối'
    },
    en: {
        title: 'ShareAnh - Beautiful Image Sharing',
        hero_title: 'Share and discover beautiful images',
        hero_subtitle: 'Community for sharing high-quality wallpapers for desktop and mobile',
        submit_wallpaper: 'Submit Image',
        search_placeholder: 'Search images...',
        sort_newest: 'Newest',
        sort_oldest: 'Oldest',
        sort_popular: 'Popular',
        all_categories: 'All',
        upload_title: 'Submit New Image',
        upload_hint: 'Drag and drop or click to select image',
        upload_supported: 'Formats: JPG, PNG, WebP (Max: 10MB)',
        title_label: 'Title',
        title_placeholder: 'Enter image title',
        category_label: 'Category',
        category_placeholder: 'Select category',
        description_label: 'Description',
        description_placeholder: 'Image description (optional)',
        submit: 'Submit Image',
        submitting: 'Submitting...',
        download: 'Download',
        share: 'Share',
        delete: 'Delete',
        delete_confirm: 'Are you sure you want to delete this image?',
        admin_mode: 'Admin Mode',
        admin_info: 'Admin mode enabled. You can now delete inappropriate images.',
        welcome_message: 'Welcome to ShareAnh! Double-click the logo to enable admin mode.',
        upload_success: 'Image submitted successfully!',
        upload_error: 'Error occurred while submitting image',
        file_too_large: 'File too large (max 10MB)',
        invalid_format: 'Unsupported file format',
        resolution_too_low: 'Resolution too low',
        download_started: 'Download started!',
        image_deleted: 'Image deleted successfully',
        no_images: 'No images found',
        loading: 'Loading...',
        theme_light: 'Light',
        theme_dark: 'Dark'
    }
};

// App State
let currentState = {
    language: 'vi',
    theme: 'light',
    currentCategory: 'all',
    currentPage: 1,
    searchQuery: '',
    sortBy: 'newest',
    isAdminMode: false,
    images: [],
    filteredImages: []
};

// DOM Elements
const elements = {
    // Header
    header: null,
    logo: null,
    themeToggle: null,
    themeIcon: null,
    languageSelector: null,
    languageBtn: null,
    languageDropdown: null,
    submitBtn: null,
    
    // Main content
    hero: null,
    categoryTabs: null,
    searchBox: null,
    searchInput: null,
    sortSelect: null,
    wallpaperGrid: null,
    pagination: null,
    
    // Modals
    submitModal: null,
    imageViewer: null,
    viewerImage: null,
    closeViewer: null,
    downloadBtn: null,
    
    // Forms
    submitForm: null,
    fileUpload: null,
    fileInput: null,
    imagePreview: null,
    previewImg: null,
    imageInfo: null,
    titleInput: null,
    categorySelect: null,
    descriptionInput: null,
    
    // Admin
    adminPanel: null,
    adminToggle: null,
    
    // Notification
    notification: null,
    notificationText: null
};

// Initialize app
async function initApp() {
    loadState();
    initializeElements();
    setupEventListeners();
    await loadImagesFromSheet();
    renderApp();
    showWelcomeMessage();
}

// Load saved state from localStorage
function loadState() {
    const savedState = localStorage.getItem('shareanh_state');
    if (savedState) {
        const parsed = JSON.parse(savedState);
        currentState = { ...currentState, ...parsed };
    }
    
    // Apply theme and language
    document.documentElement.setAttribute('data-theme', currentState.theme);
    document.documentElement.setAttribute('lang', currentState.language);
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('shareanh_state', JSON.stringify(currentState));
}

// Initialize DOM elements
function initializeElements() {
    elements.header = document.querySelector('.header');
    elements.logo = document.querySelector('.logo');
    elements.themeToggle = document.getElementById('themeToggle');
    elements.themeIcon = document.getElementById('themeIcon');
    elements.languageSelector = document.querySelector('.language-selector');
    elements.languageBtn = document.querySelector('.language-btn');
    elements.languageDropdown = document.querySelector('.language-dropdown');
    elements.submitBtn = document.getElementById('submitBtn');
    
    elements.hero = document.querySelector('.hero');
    elements.categoryTabs = document.querySelector('.category-tabs');
    elements.searchBox = document.querySelector('.search-box');
    elements.searchInput = document.getElementById('searchInput');
    elements.sortSelect = document.getElementById('sortSelect');
    elements.wallpaperGrid = document.getElementById('wallpaperGrid');
    elements.pagination = document.getElementById('pagination');
    
    elements.submitModal = document.getElementById('submitModal');
    elements.imageViewer = document.getElementById('imageViewer');
    elements.viewerImage = document.getElementById('viewerImage');
    elements.closeViewer = document.getElementById('closeViewer');
    elements.downloadBtn = document.getElementById('downloadBtn');
    
    elements.submitForm = document.getElementById('submitForm');
    elements.fileUpload = document.getElementById('fileUpload');
    elements.fileInput = document.getElementById('fileInput');
    elements.imagePreview = document.getElementById('imagePreview');
    elements.previewImg = document.getElementById('previewImg');
    elements.imageInfo = document.getElementById('imageInfo');
    elements.titleInput = document.getElementById('titleInput');
    elements.categorySelect = document.getElementById('categorySelect');
    elements.descriptionInput = document.getElementById('descriptionInput');
    
    elements.adminPanel = document.getElementById('adminPanel');
    elements.adminToggle = document.getElementById('adminToggle');
    
    elements.notification = document.getElementById('notification');
    elements.notificationText = document.getElementById('notificationText');
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    elements.themeToggle?.addEventListener('click', toggleTheme);
    
    // Language selector
    elements.languageBtn?.addEventListener('click', toggleLanguageDropdown);
    document.addEventListener('click', (e) => {
        if (!elements.languageSelector?.contains(e.target)) {
            elements.languageDropdown?.classList.remove('show');
        }
    });
    
    // Submit modal
    elements.submitBtn?.addEventListener('click', () => {
        elements.submitModal?.classList.add('active');
    });
    
    document.getElementById('closeSubmitModal')?.addEventListener('click', () => {
        elements.submitModal?.classList.remove('active');
    });
    
    // Image viewer
    elements.closeViewer?.addEventListener('click', () => {
        elements.imageViewer?.classList.remove('active');
    });
    
    elements.downloadBtn?.addEventListener('click', () => {
        downloadImage(elements.downloadBtn.getAttribute('data-url'), elements.downloadBtn.getAttribute('data-title'), elements.downloadBtn.getAttribute('data-ext'));
    });
    
    // Modal close on outside click
    [elements.submitModal, elements.imageViewer].forEach(modal => {
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // File upload
    elements.fileUpload?.addEventListener('click', () => {
        elements.fileInput?.click();
    });
    
    elements.fileInput?.addEventListener('change', (e) => {
        handleFileUpload(e.target.files[0]);
    });
    
    // Drag and drop
    elements.fileUpload?.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.fileUpload.classList.add('dragover');
    });
    
    elements.fileUpload?.addEventListener('dragleave', () => {
        elements.fileUpload.classList.remove('dragover');
    });
    
    elements.fileUpload?.addEventListener('drop', (e) => {
        e.preventDefault();
        elements.fileUpload.classList.remove('dragover');
        handleFileUpload(e.dataTransfer.files[0]);
    });
    
    // Form submission
    elements.submitForm?.addEventListener('submit', handleFormSubmission);
    
    // Search and sort
    elements.searchInput?.addEventListener('input', debounce(handleSearch, 300));
    elements.sortSelect?.addEventListener('change', handleSort);
    
    // Admin toggle
    let logoClickCount = 0;
    elements.logo?.addEventListener('click', () => {
        logoClickCount++;
        setTimeout(() => {
            if (logoClickCount === 2) {
                toggleAdminMode();
            }
            logoClickCount = 0;
        }, 300);
    });
    
    elements.adminToggle?.addEventListener('click', toggleAdminMode);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            elements.submitModal?.classList.remove('active');
            elements.imageViewer?.classList.remove('active');
        }
    });
}

// Load sample images
function loadImages() {
    // Load from localStorage or use sample data
    const savedImages = localStorage.getItem('shareanh_images');
    if (savedImages) {
        currentState.images = JSON.parse(savedImages);
    } else {
        currentState.images = generateSampleImages();
        localStorage.setItem('shareanh_images', JSON.stringify(currentState.images));
    }
    
    filterImages();
}

// Generate sample images
function generateSampleImages() {
    const categories = Object.keys(CONFIG.categories);
    const sampleImages = [];
    
    categories.forEach((category, index) => {
        for (let i = 1; i <= 6; i++) {
            sampleImages.push({
                id: sampleImages.length + 1,
                title: `${CONFIG.categories[category].name} ${i}`,
                description: `Beautiful ${category} image`,
                category: category,
                url: `https://picsum.photos/800/600?random=${sampleImages.length + 1}`,
                thumbnail: `https://picsum.photos/400/300?random=${sampleImages.length + 1}`,
                resolution: '1920x1080',
                size: Math.floor(Math.random() * 5000) + 1000,
                uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                downloads: Math.floor(Math.random() * 1000),
                likes: Math.floor(Math.random() * 500)
            });
        }
    });
    
    return sampleImages;
}

// Filter images based on current state
function filterImages() {
    let filtered = [...currentState.images];
    // Lọc theo tab PC/Mobile
    if (currentState.currentCategory === 'pc') {
        filtered = filtered.filter(img => img.category === 'pc');
    } else if (currentState.currentCategory === 'mobile') {
        filtered = filtered.filter(img => img.category === 'mobile');
    }
    // Lọc theo search
    if (currentState.searchQuery) {
        const query = currentState.searchQuery.toLowerCase();
        filtered = filtered.filter(img =>
            img.title.toLowerCase().includes(query) ||
            (img.description && img.description.toLowerCase().includes(query))
        );
    }
    // Sắp xếp
    filtered.sort((a, b) => {
        switch (currentState.sortBy) {
            case 'newest':
                return new Date(b.uploadDate) - new Date(a.uploadDate);
            case 'oldest':
                return new Date(a.uploadDate) - new Date(b.uploadDate);
            case 'popular':
                return b.downloads - a.downloads;
            default:
                return 0;
        }
    });
    currentState.filteredImages = filtered;
}

// Render the entire app
function renderApp() {
    updatePageTitle();
    renderHero();
    renderCategoryTabs();
    renderSearchAndSort();
    renderImages();
    renderPagination();
    renderAdminPanel();
    updateLanguageUI();
}

// Update page title
function updatePageTitle() {
    document.title = TRANSLATIONS[currentState.language].title;
}

// Render hero section
function renderHero() {
    if (!elements.hero) return;
    
    elements.hero.innerHTML = `
        <h1>${TRANSLATIONS[currentState.language].hero_title}</h1>
        <p>${TRANSLATIONS[currentState.language].hero_subtitle}</p>
    `;
}

// Render category tabs
function renderCategoryTabs() {
    if (!elements.categoryTabs) return;
    const tabs = [
        { id: 'pc', name: 'PC Wallpapers', icon: '<i class="fas fa-desktop"></i>' },
        { id: 'mobile', name: 'Mobile Wallpapers', icon: '<i class="fas fa-mobile-alt"></i>' }
    ];
    elements.categoryTabs.innerHTML = tabs.map(tab => `
        <button class="tab-btn ${tab.id === currentState.currentCategory ? 'active' : ''}" data-category="${tab.id}">
            ${tab.icon} ${tab.name}
        </button>
    `).join('');
    // Add event listeners
    elements.categoryTabs.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentState.currentCategory = btn.getAttribute('data-category');
            currentState.currentPage = 1;
            filterImages();
            renderImages();
            renderPagination();
            saveState();
        });
    });
}

// Render search and sort controls
function renderSearchAndSort() {
    if (!elements.searchInput) return;
    
    elements.searchInput.placeholder = TRANSLATIONS[currentState.language].search_placeholder;
    elements.searchInput.value = currentState.searchQuery;
    
    if (elements.sortSelect) {
        elements.sortSelect.innerHTML = `
            <option value="newest">${TRANSLATIONS[currentState.language].sort_newest}</option>
            <option value="oldest">${TRANSLATIONS[currentState.language].sort_oldest}</option>
            <option value="popular">${TRANSLATIONS[currentState.language].sort_popular}</option>
        `;
        elements.sortSelect.value = currentState.sortBy;
    }
}

// Render images grid
function renderImages() {
    if (!elements.wallpaperGrid) return;
    const startIndex = (currentState.currentPage - 1) * CONFIG.itemsPerPage;
    const endIndex = startIndex + CONFIG.itemsPerPage;
    let pageImages = currentState.filteredImages;
    if (!currentState.isAdminMode) {
        pageImages = pageImages.filter(img => img.status === 'approved');
    }
    pageImages = pageImages.slice(startIndex, endIndex);
    if (pageImages.length === 0) {
        elements.wallpaperGrid.innerHTML = `<div class="text-center" style="grid-column: 1 / -1; padding: 3rem;"><i class="fas fa-images" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i><h3 style="color: var(--text-muted); margin-bottom: 0.5rem;">Không có ảnh nào</h3></div>`;
        return;
    }
    elements.wallpaperGrid.innerHTML = pageImages.map(image => `
        <div class="wallpaper-card fade-in" data-id="${image.id}">
            <img src="${image.thumbnail}" alt="${image.title}" class="wallpaper-img" loading="lazy">
            <div class="wallpaper-overlay">
                <div class="overlay-actions">
                    <button class="overlay-btn download" title="Tải xuống" data-url="${image.url}" data-title="${image.title}" data-ext="${getFileExtension(image.url)}">
                        <i class="fas fa-download"></i> Tải xuống
                    </button>
                    ${currentState.isAdminMode && image.status === 'pending' ? `<button class="overlay-btn approve" title="Duyệt" data-id="${image.id}"><i class="fas fa-check"></i> Duyệt</button>` : ''}
                    ${currentState.isAdminMode ? `<button class="overlay-btn delete" title="Xóa" data-id="${image.id}"><i class="fas fa-trash"></i> Xóa</button>` : ''}
                </div>
            </div>
            <div class="wallpaper-info">
                <div class="wallpaper-title">${image.title}</div>
            </div>
        </div>
    `).join('');
    attachImageEvents();
}

// Attach events to image elements
function attachImageEvents() {
    // Xem to
    elements.wallpaperGrid.querySelectorAll('.wallpaper-img').forEach(img => {
        img.addEventListener('click', (e) => {
            const card = e.target.closest('.wallpaper-card');
            const imageId = card.getAttribute('data-id');
            const image = currentState.images.find(img => img.id == imageId);
            if (image) {
                elements.viewerImage.src = image.url;
                elements.viewerImage.alt = image.title;
                elements.downloadBtn.setAttribute('data-url', image.url);
                elements.downloadBtn.setAttribute('data-title', image.title);
                elements.downloadBtn.setAttribute('data-ext', getFileExtension(image.url));
                elements.imageViewer.classList.add('active');
            }
        });
    });
    // Tải đúng định dạng
    elements.wallpaperGrid.querySelectorAll('.overlay-btn.download').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            downloadImage(btn.getAttribute('data-url'), btn.getAttribute('data-title'), btn.getAttribute('data-ext'));
        });
    });
    // Duyệt ảnh (admin)
    if (currentState.isAdminMode) {
        elements.wallpaperGrid.querySelectorAll('.overlay-btn.approve').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                approveImage(parseInt(btn.getAttribute('data-id')));
            });
        });
        elements.wallpaperGrid.querySelectorAll('.overlay-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteImage(parseInt(btn.getAttribute('data-id')));
            });
        });
    }
}

// Render pagination
function renderPagination() {
    if (!elements.pagination) return;
    
    const totalPages = Math.ceil(currentState.filteredImages.length / CONFIG.itemsPerPage);
    
    if (totalPages <= 1) {
        elements.pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentState.currentPage > 1) {
        paginationHTML += `
            <button class="page-btn" data-page="${currentState.currentPage - 1}">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentState.currentPage || i === 1 || i === totalPages || 
            (i >= currentState.currentPage - 1 && i <= currentState.currentPage + 1)) {
            paginationHTML += `
                <button class="page-btn ${i === currentState.currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        } else if (i === currentState.currentPage - 2 || i === currentState.currentPage + 2) {
            paginationHTML += `<span class="page-btn" style="cursor: default;">...</span>`;
        }
    }
    
    // Next button
    if (currentState.currentPage < totalPages) {
        paginationHTML += `
            <button class="page-btn" data-page="${currentState.currentPage + 1}">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
    }
    
    elements.pagination.innerHTML = paginationHTML;
    
    // Add event listeners
    elements.pagination.querySelectorAll('.page-btn[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
            currentState.currentPage = parseInt(btn.getAttribute('data-page'));
            renderImages();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            saveState();
        });
    });
}

// Render admin panel
function renderAdminPanel() {
    if (!elements.adminPanel) return;
    
    elements.adminPanel.style.display = currentState.isAdminMode ? 'block' : 'none';
    
    if (elements.adminToggle) {
        elements.adminToggle.classList.toggle('active', currentState.isAdminMode);
    }
}

// Update language UI
function updateLanguageUI() {
    if (!elements.languageBtn) return;

    // Sử dụng ảnh local
    let flagSrc = currentState.language === 'vi' ? 'images/vn64.png' : 'images/en64.png';
    let langLabel = currentState.language === 'vi' ? 'Tiếng Việt' : 'English';
    elements.languageBtn.innerHTML = `
        <img src="${flagSrc}" alt="${langLabel}" class="flag-icon">
        <span>${langLabel}</span>
        <i class="fas fa-chevron-down"></i>
    `;

    if (elements.languageDropdown) {
        elements.languageDropdown.innerHTML = `
            <div class="language-option ${currentState.language === 'vi' ? 'active' : ''}" data-lang="vi">
                <img src="images/vn64.png" alt="Tiếng Việt" class="flag-icon">
                <span>Tiếng Việt</span>
            </div>
            <div class="language-option ${currentState.language === 'en' ? 'active' : ''}" data-lang="en">
                <img src="images/en64.png" alt="English" class="flag-icon">
                <span>English</span>
            </div>
        `;
        // Add event listeners
        elements.languageDropdown.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', () => {
                changeLanguage(option.getAttribute('data-lang'));
            });
        });
    }
}

// Get flag SVG
function getFlagSVG(lang) {
    const flags = {
        vi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
            <rect width="900" height="600" fill="#da251d"/>
            <polygon points="0,0 450,300 0,600" fill="#ff0"/>
        </svg>`,
        en: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
            <rect width="1200" height="600" fill="#012169"/>
            <rect width="1200" height="46.15" y="46.15" fill="#fff"/>
            <rect width="1200" height="46.15" y="138.45" fill="#fff"/>
            <rect width="1200" height="46.15" y="230.75" fill="#fff"/>
            <rect width="1200" height="46.15" y="323.05" fill="#fff"/>
            <rect width="1200" height="46.15" y="415.35" fill="#fff"/>
            <rect width="1200" height="46.15" y="507.65" fill="#fff"/>
            <rect width="240" height="600" fill="#c8102e"/>
            <rect width="240" height="46.15" y="46.15" fill="#fff"/>
            <rect width="240" height="46.15" y="138.45" fill="#fff"/>
            <rect width="240" height="46.15" y="230.75" fill="#fff"/>
            <rect width="240" height="46.15" y="323.05" fill="#fff"/>
            <rect width="240" height="46.15" y="415.35" fill="#fff"/>
            <rect width="240" height="46.15" y="507.65" fill="#fff"/>
        </svg>`
    };
    return flags[lang] || flags.en;
}

// Theme functions
function toggleTheme() {
    currentState.theme = currentState.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentState.theme);
    updateThemeIcon();
    saveState();
}

function updateThemeIcon() {
    if (elements.themeIcon) {
        elements.themeIcon.className = currentState.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Language functions
function toggleLanguageDropdown() {
    elements.languageDropdown?.classList.toggle('show');
}

function changeLanguage(lang) {
    currentState.language = lang;
    document.documentElement.setAttribute('lang', lang);
    renderApp();
    saveState();
    elements.languageDropdown?.classList.remove('show');
    // Đổi cờ
    if (lang === 'vi') {
        document.getElementById('flag-vi').style.display = '';
        document.getElementById('flag-en').style.display = 'none';
        document.getElementById('lang-label').textContent = 'Tiếng Việt';
    } else {
        document.getElementById('flag-vi').style.display = 'none';
        document.getElementById('flag-en').style.display = '';
        document.getElementById('lang-label').textContent = 'English';
    }
}

// Search and sort functions
function handleSearch() {
    currentState.searchQuery = elements.searchInput?.value || '';
    currentState.currentPage = 1;
    filterImages();
    renderImages();
    renderPagination();
    saveState();
}

function handleSort() {
    currentState.sortBy = elements.sortSelect?.value || 'newest';
    currentState.currentPage = 1;
    filterImages();
    renderImages();
    renderPagination();
    saveState();
}

// File upload functions
function handleFileUpload(file) {
    if (!file) return;
    
    // Validate file type
    if (!CONFIG.supportedFormats.includes(file.type)) {
        showNotification(TRANSLATIONS[currentState.language].invalid_format, 'error');
        return;
    }
    
    // Validate file size
    if (file.size > CONFIG.maxFileSize) {
        showNotification(TRANSLATIONS[currentState.language].file_too_large, 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        elements.previewImg.src = e.target.result;
        
        // Get image dimensions
        const img = new Image();
        img.onload = () => {
            const category = elements.categorySelect?.value;
            const minWidth = category === 'mobile' ? 1080 : 1920;
            const minHeight = category === 'mobile' ? 1920 : 1080;
            
            elements.imageInfo.innerHTML = `
                <div class="preview-stats">
                    <div class="stat-card">
                        <div class="stat-value">${img.width}x${img.height}</div>
                        <div class="stat-label">Resolution</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${(file.size / 1024 / 1024).toFixed(2)} MB</div>
                        <div class="stat-label">Size</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${file.type.split('/')[1].toUpperCase()}</div>
                        <div class="stat-label">Format</div>
                    </div>
                </div>
                ${img.width < minWidth || img.height < minHeight ? `
                    <div style="color: #ef4444; margin-top: 1rem; padding: 0.75rem; background: rgba(239, 68, 68, 0.1); border-radius: 0.5rem;">
                        <i class="fas fa-exclamation-triangle"></i>
                        ${TRANSLATIONS[currentState.language].resolution_too_low}
                    </div>
                ` : ''}
            `;
        };
        img.src = e.target.result;
        
        elements.imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Hàm upload đa nguồn
async function uploadImageMultiSource(file) {
    // 1. Catbox (có userhash)
    try {
        const catboxForm = new FormData();
        catboxForm.append('reqtype', 'fileupload');
        catboxForm.append('userhash', 'c39452df258ebbf67037c1f0e'); // Thay bằng userhash của bạn
        catboxForm.append('fileToUpload', file);
        const res = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: catboxForm });
        const url = await res.text();
        if (url.startsWith('https://')) return url.trim();
    } catch (e) {}
    // 2. Imgur
    try {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: { Authorization: 'Client-ID 2a4f6e69b84ba0b' },
            body: formData
        });
        const data = await res.json();
        if (data.success && data.data && data.data.link) return data.data.link;
    } catch (e) {}
    // 3. ImgBB
    try {
        const apiKey = '505e8ef3b0f85c1716178c29e2bb4996'; // Thay bằng API key của bạn
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success && data.data && data.data.url) return data.data.url;
    } catch (e) {}
    throw new Error('Tất cả nguồn upload đều lỗi!');
}

// Hàm lưu ảnh lên Google Sheets/OpenSheet
async function saveImageToSheet({ url, title, category, description }) {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbwaTVkxPL7BAOx7sczHx9udc1_hRr3msd-w86NX-ByGOXFKuFgp-yUVcLeChv8AqDak/exec'; // Thay bằng link Google Apps Script hoặc OpenSheet
    await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ url, title, category, description }),
        headers: { 'Content-Type': 'application/json' }
    });
}

// Hàm lấy danh sách ảnh từ Google Sheets/OpenSheet
async function loadImagesFromSheet() {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbwaTVkxPL7BAOx7sczHx9udc1_hRr3msd-w86NX-ByGOXFKuFgp-yUVcLeChv8AqDak/exec'; // Thay bằng link Google Apps Script hoặc OpenSheet
    const res = await fetch(apiUrl);
    const data = await res.json();
    currentState.images = data.map((item, idx) => ({
        id: idx + 1,
        title: item.title,
        description: item.description,
        category: item.category,
        url: item.url,
        thumbnail: item.url,
        uploadDate: item.date || new Date().toISOString(),
        status: 'approved'
    }));
    filterImages();
}

// Sửa lại hàm handleFormSubmission
async function handleFormSubmission(e) {
    e.preventDefault();
    const file = elements.fileInput?.files[0];
    const title = elements.titleInput?.value;
    const category = elements.categorySelect?.value;
    const description = elements.descriptionInput?.value;
    if (!file || !title || !category) {
        showNotification('Vui lòng điền đầy đủ thông tin', 'error');
        return;
    }
    // Show loading
    const submitBtn = elements.submitForm?.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent;
    if (submitBtn) {
        submitBtn.innerHTML = `<div class="loading"></div> Đang đăng...`;
        submitBtn.disabled = true;
    }
    try {
        const url = await uploadImageMultiSource(file);
        await saveImageToSheet({ url, title, category, description });
        elements.submitForm?.reset();
        elements.imagePreview.style.display = 'none';
        elements.submitModal?.classList.remove('active');
        if (submitBtn) {
            submitBtn.innerHTML = originalText || 'Đăng ảnh';
            submitBtn.disabled = false;
        }
        showNotification('Đăng ảnh thành công!', 'success');
        await loadImagesFromSheet();
        renderImages();
        renderPagination();
    } catch (err) {
        showNotification('Upload thất bại ở tất cả nguồn!', 'error');
        if (submitBtn) {
            submitBtn.innerHTML = originalText || 'Đăng ảnh';
            submitBtn.disabled = false;
        }
    }
}

// Download image
function downloadImage(url, title, ext) {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${ext || 'jpg'}`;
    link.click();
    showNotification('Bắt đầu tải xuống!', 'success');
}

// Share image
function shareImage(url, title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        });
    }
}

// Delete image (admin only)
function deleteImage(id) {
    if (!currentState.isAdminMode) return;
    
    if (confirm(TRANSLATIONS[currentState.language].delete_confirm)) {
        currentState.images = currentState.images.filter(img => img.id !== id);
        localStorage.setItem('shareanh_images', JSON.stringify(currentState.images));
        
        // Adjust current page if necessary
        filterImages();
        const totalPages = Math.ceil(currentState.filteredImages.length / CONFIG.itemsPerPage);
        if (currentState.currentPage > totalPages && totalPages > 0) {
            currentState.currentPage = totalPages;
        }
        
        renderImages();
        renderPagination();
        showNotification(TRANSLATIONS[currentState.language].image_deleted, 'success');
    }
}

// Admin mode toggle
function toggleAdminMode() {
    currentState.isAdminMode = !currentState.isAdminMode;
    renderAdminPanel();
    renderImages();
    saveState();
}

// Notification system
function showNotification(message, type = 'success') {
    if (!elements.notification || !elements.notificationText) return;
    
    elements.notificationText.textContent = message;
    elements.notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        elements.notification.classList.remove('show');
    }, 3000);
}

// Show welcome message
function showWelcomeMessage() {
    setTimeout(() => {
        showNotification(TRANSLATIONS[currentState.language].welcome_message, 'success');
    }, 1000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lấy đuôi file từ url
function getFileExtension(url) {
    const match = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
    return match ? match[1] : 'jpg';
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp); 