// ===== PROJECTS DATA WITH LOCAL ASSETS =====
const projectsData = [
    {
        id: 1,
        year: "1st Year",
        title: "Library Management System",
        description: "A console-based library management system built with C++ for managing books, members, and transactions. Features include book search, member management, borrowing/returning system, and fine calculation.",
        image: "assets/android.jpg",
        technologies: ["C++", "Object-Oriented Programming", "File Handling", "Data Structures"],
        featured: true,
        features: [
            "Book inventory management with CRUD operations",
            "Member registration and tracking system",
            "Borrowing and return transaction management",
            "Overdue calculation and fine management",
            "Search functionality for books and members",
            "Data persistence through file handling"
        ]
    },
    {
        id: 2,
        year: "1st Year",
        title: "Student Grade Calculator",
        description: "A Java application to calculate and manage student grades with GPA computation. Includes subject management, grade input, and report generation.",
        image: "assets/grade-calculator.jpg",
        technologies: ["Java", "Swing GUI", "Object-Oriented Design"],
        featured: false,
        features: [
            "Student grade calculation and GPA computation",
            "Subject management system",
            "Grade input with validation",
            "Report generation in text format",
            "User-friendly GUI interface"
        ]
    },
    {
        id: 3,
        year: "2nd Year",
        title: "E-commerce Website",
        description: "A responsive e-commerce website with product catalog, shopping cart, and user authentication features. Built with PHP and MySQL backend.",
        image: "assets/flutter.jpg",
        technologies: ["HTML5/CSS3", "JavaScript", "PHP", "MySQL", "Responsive Design"],
        featured: true,
        features: [
            "User authentication and profile management",
            "Product catalog with search and filtering",
            "Shopping cart with real-time updates",
            "Secure checkout process",
            "Admin dashboard for product management",
            "Order history and tracking system"
        ]
    },
    {
        id: 4,
        year: "2nd Year",
        title: "Weather Dashboard",
        description: "A web application that displays current weather and forecast using weather API. Features include location-based weather, 5-day forecast, and temperature unit conversion.",
        image: "assets/weather-dashboard.jpg",
        technologies: ["JavaScript", "API Integration", "Bootstrap", "AJAX"],
        featured: false,
        features: [
            "Real-time weather data from API",
            "Location-based weather information",
            "5-day weather forecast",
            "Temperature unit conversion (Celsius/Fahrenheit)",
            "Responsive design for all devices"
        ]
    },
    {
        id: 5,
        year: "3rd Year",
        title: "Student Task Manager",
        description: "A React-based task management application with drag-drop functionality, deadlines, and priority settings. Built with MERN stack.",
        image: "assets/app.jpg",
        technologies: ["React", "Node.js", "MongoDB", "Express", "REST API"],
        featured: true,
        features: [
            "Drag-and-drop task organization",
            "Priority levels and deadline tracking",
            "Progress monitoring with visual indicators",
            "User authentication and authorization",
            "Real-time updates with notifications",
            "Mobile-responsive interface"
        ]
    },
    {
        id: 6,
        year: "3rd Year",
        title: "Inventory Management System",
        description: "A full-stack application for tracking inventory with real-time updates and reporting. Features include stock alerts, supplier management, and sales reporting.",
        image: "assets/inventory-system.jpg",
        technologies: ["Vue.js", "Python", "PostgreSQL", "Django", "REST API"],
        featured: false,
        features: [
            "Real-time inventory tracking",
            "Stock alerts and notifications",
            "Supplier management system",
            "Sales reporting and analytics",
            "Barcode scanning integration",
            "Multi-user access control"
        ]
    },
    // ===== VIDEO PROJECTS =====
    {
        id: 7,
        year: "3rd Year",
        title: "Flutter Application Demo",
        description: "A video walkthrough of my Flutter mobile application showing all features and functionality. Includes UI demonstrations and feature explanations.",
        image: "assets/flutter.jpg",
        videoFile: "https://drive.google.com/file/d/1-bD4niaiJRdRv9Gvyz0oy8Jzm_aWgPGO/view?usp=drive_link",
        technologies: ["Flutter", "Dart", "Mobile Development", "UI/UX Design"],
        featured: true,
        type: "video",
        features: [
            "Cross-platform mobile application",
            "User authentication system",
            "Product catalog and search",
            "Shopping cart functionality",
            "Checkout process demonstration",
            "Admin panel features"
        ]
    }
];

// ===== MODAL FUNCTIONALITY =====
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modalProjectTitle');
const modalImage = document.getElementById('modalImage');
const modalVideo = document.getElementById('modalVideo');
const modalVideoContainer = document.getElementById('modalVideoContainer');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');
const modalFeatures = document.getElementById('modalFeatures');
const modalYear = document.getElementById('modalYear');
const videoControlBtn = document.getElementById('videoControlBtn');
const mediaControlBtns = document.querySelectorAll('.media-control-btn');
const modalDownloadLink = document.getElementById('modalDownloadLink');
const modalCodeLink = document.getElementById('modalCodeLink');
const projectsGrid = document.getElementById('projectsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCount = document.getElementById('project-count');

let currentProject = null;

// Function to render projects
function renderProjects(filter = 'all') {
    projectsGrid.innerHTML = '';
    
    const filteredProjects = projectsData.filter(project => {
        if (filter === 'all') return true;
        if (filter === 'video') return project.type === 'video';
        return project.year === filter;
    });
    
    projectCount.textContent = `Showing ${filteredProjects.length} projects`;
    
    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-year', project.year);
        projectCard.setAttribute('data-type', project.type || 'code');
        
        const isVideo = project.type === 'video';
        const isFeatured = project.featured;
        
        projectCard.innerHTML = `
            ${isFeatured ? '<span class="featured-badge">Featured</span>' : ''}
            ${isVideo ? '<span class="video-badge"><i class="fas fa-video"></i> Video</span>' : ''}
            
            <div class="project-header">
                <span class="project-year">${project.year}</span>
                <h3>${project.title}</h3>
            </div>
            
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            
            <div class="project-info">
                <p>${project.description}</p>
                
                <div class="project-tags">
                    ${project.technologies.map(tech => 
                        `<span class="project-tag">${tech}</span>`
                    ).join('')}
                </div>
                
                <div class="project-links">
                    <a href="#" class="project-link view-project-btn" data-id="${project.id}">
                        <i class="fas fa-expand"></i> View Details
                    </a>
                    ${isVideo ? `
                        <a href="#" class="project-link view-video-btn" data-id="${project.id}">
                            <i class="fas fa-play-circle"></i> Play Video
                        </a>
                    ` : `
                        <span class="project-info-text">
                            <i class="fas fa-info-circle"></i> Code available upon request
                        </span>
                    `}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
    
    // Add event listeners to new project cards
    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = parseInt(this.dataset.id);
            const project = projectsData.find(p => p.id === projectId);
            if (project) {
                openProjectModal(project, project.type === 'video' ? 'video' : 'image');
            }
        });
    });
    
    document.querySelectorAll('.view-video-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = parseInt(this.dataset.id);
            const project = projectsData.find(p => p.id === projectId);
            if (project && project.type === 'video') {
                openProjectModal(project, 'video');
            }
        });
    });
    
    // Add click event to project images
    document.querySelectorAll('.project-image img').forEach(img => {
        img.addEventListener('click', function() {
            const card = this.closest('.project-card');
            const projectId = parseInt(card.querySelector('.view-project-btn').dataset.id);
            const project = projectsData.find(p => p.id === projectId);
            if (project) {
                openProjectModal(project, 'image');
            }
        });
        img.style.cursor = 'pointer';
        img.title = 'Click to view project details';
    });
}

// Function to open project modal
function openProjectModal(project, mediaType = 'image') {
    currentProject = project;
    
    // Set modal content
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalYear.textContent = project.year;
    
    // Clear previous content
    modalTags.innerHTML = '';
    modalFeatures.innerHTML = '';
    
    // Add technologies
    project.technologies.forEach(tech => {
        const tagElement = document.createElement('span');
        tagElement.className = 'modal-tag';
        tagElement.textContent = tech;
        modalTags.appendChild(tagElement);
    });
    
    // Add features
    if (project.features && project.features.length > 0) {
        project.features.forEach(feature => {
            const featureElement = document.createElement('li');
            featureElement.textContent = feature;
            modalFeatures.appendChild(featureElement);
        });
    } else {
        const noFeatures = document.createElement('li');
        noFeatures.textContent = 'Detailed features coming soon...';
        modalFeatures.appendChild(noFeatures);
    }
    
    // Show/hide video control button
    const isVideo = project.type === 'video';
    videoControlBtn.style.display = isVideo ? 'flex' : 'none';
    
    // Set initial media
    showMedia(mediaType, project);
    
    // Update media control buttons
    mediaControlBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.media === mediaType) {
            btn.classList.add('active');
        }
        if (btn.dataset.media === 'video') {
            btn.style.display = isVideo ? 'flex' : 'none';
        }
    });
    
    // Show/hide download link for videos
    if (isVideo && project.videoFile) {
        modalDownloadLink.style.display = 'flex';
        modalDownloadLink.href = project.videoFile;
        modalDownloadLink.download = project.title.toLowerCase().replace(/\s+/g, '-') + '.mp4';
    } else {
        modalDownloadLink.style.display = 'none';
    }
    
    // Show/hide code link
    modalCodeLink.style.display = 'none';
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Function to show specific media type
function showMedia(mediaType, project) {
    // Hide all media
    modalImage.style.display = 'none';
    modalVideoContainer.style.display = 'none';
    
    // Pause video if playing
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
    
    // Show selected media
    if (mediaType === 'image' && project.image) {
        modalImage.src = project.image;
        modalImage.style.display = 'block';
        modalImage.alt = project.title;
    } else if (mediaType === 'video' && project.videoFile) {
        modalVideo.src = project.videoFile;
        modalVideoContainer.style.display = 'block';
    }
}

// Close modal function
function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Pause video if playing
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Render initial projects
    renderProjects();
    
    // Filter button functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter projects
            renderProjects(this.dataset.filter);
        });
    });
    
    // Modal event listeners
    closeModal.addEventListener('click', closeProjectModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeProjectModal();
        }
    });
    
    // Media control buttons
    mediaControlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mediaType = this.dataset.media;
            if (currentProject) {
                showMedia(mediaType, currentProject);
                // Update active button
                mediaControlBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Your existing JavaScript for other functionality
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                subject: this.querySelectorAll('input[type="text"]')[1].value,
                message: this.querySelector('textarea').value
            };
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'white';
        }
    });
});