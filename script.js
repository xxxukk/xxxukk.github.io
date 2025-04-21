// 导航栏响应式切换
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // 图片画廊点击放大
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 新闻和活动日期格式化
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('zh-CN', options);
    };

    // 视频播放优化
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('mouseenter', function() {
            this.play();
        });
        video.addEventListener('mouseleave', function() {
            this.pause();
        });
    });

    // 响应式表格处理
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });

    // 图片懒加载
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // 返回顶部按钮
    const scrollToTop = document.createElement('button');
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTop.classList.add('show');
        } else {
            scrollToTop.classList.remove('show');
        }
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 论文筛选功能
    const yearFilter = document.getElementById('year-filter');
    const categoryFilter = document.getElementById('category-filter');
    const publicationsList = document.querySelector('.publications-list');

    // 示例论文数据
    const publications = [
        {
            title: '示例论文1',
            authors: '作者1, 作者2',
            year: 2024,
            category: '期刊论文',
            journal: '示例期刊'
        },
        // 添加更多论文数据
    ];

    function filterPublications() {
        const selectedYear = yearFilter.value;
        const selectedCategory = categoryFilter.value;

        const filteredPublications = publications.filter(pub => {
            const yearMatch = !selectedYear || pub.year.toString() === selectedYear;
            const categoryMatch = !selectedCategory || pub.category === selectedCategory;
            return yearMatch && categoryMatch;
        });

        displayPublications(filteredPublications);
    }

    function displayPublications(pubs) {
        publicationsList.innerHTML = pubs.map(pub => `
            <div class="publication-item">
                <h3>${pub.title}</h3>
                <p>作者：${pub.authors}</p>
                <p>年份：${pub.year}</p>
                <p>类别：${pub.category}</p>
                <p>期刊：${pub.journal}</p>
            </div>
        `).join('');
    }

    yearFilter.addEventListener('change', filterPublications);
    categoryFilter.addEventListener('change', filterPublications);

    // 成员搜索功能
    const memberSearch = document.querySelector('.members-search input');
    const membersGrid = document.querySelector('.members-grid');

    // 示例成员数据
    const members = [
        {
            name: '成员1',
            position: '教授',
            description: '成员简介...',
            image: 'images/member1.jpg'
        },
        // 添加更多成员数据
    ];

    function searchMembers(query) {
        const filteredMembers = members.filter(member => 
            member.name.toLowerCase().includes(query.toLowerCase()) ||
            member.position.toLowerCase().includes(query.toLowerCase())
        );

        displayMembers(filteredMembers);
    }

    function displayMembers(members) {
        membersGrid.innerHTML = members.map(member => `
            <div class="member-card">
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p class="position">${member.position}</p>
                <p class="description">${member.description}</p>
            </div>
        `).join('');
    }

    memberSearch.addEventListener('input', function(e) {
        searchMembers(e.target.value);
    });

    // 新闻分页功能
    const newsPerPage = 5;
    let currentPage = 1;

    // 示例新闻数据
    const news = [
        {
            title: '示例新闻1',
            date: '2024-03-20',
            summary: '新闻摘要...'
        },
        // 添加更多新闻数据
    ];

    function displayNews(page) {
        const start = (page - 1) * newsPerPage;
        const end = start + newsPerPage;
        const pageNews = news.slice(start, end);

        const newsList = document.querySelector('.news-list');
        newsList.innerHTML = pageNews.map(item => `
            <div class="news-item">
                <h3>${item.title}</h3>
                <p class="date">${item.date}</p>
                <p class="summary">${item.summary}</p>
            </div>
        `).join('');

        updatePagination();
    }

    function updatePagination() {
        const totalPages = Math.ceil(news.length / newsPerPage);
        const pagination = document.querySelector('.pagination');
        
        pagination.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.toggle('active', i === currentPage);
            button.addEventListener('click', () => {
                currentPage = i;
                displayNews(currentPage);
            });
            pagination.appendChild(button);
        }
    }

    // 活动筛选功能
    const activityTypeFilter = document.getElementById('activity-type-filter');
    const activitiesGrid = document.querySelector('.activities-grid');

    // 示例活动数据
    const activities = [
        {
            title: '示例活动1',
            date: '2024-03-25',
            type: '学术讲座',
            location: '会议室1',
            description: '活动描述...'
        },
        // 添加更多活动数据
    ];

    function filterActivities() {
        const selectedType = activityTypeFilter.value;
        const filteredActivities = activities.filter(activity => 
            !selectedType || activity.type === selectedType
        );

        displayActivities(filteredActivities);
    }

    function displayActivities(activities) {
        activitiesGrid.innerHTML = activities.map(activity => `
            <div class="activity-card">
                <h3>${activity.title}</h3>
                <p class="date">${activity.date}</p>
                <p class="type">${activity.type}</p>
                <p class="location">${activity.location}</p>
                <p class="description">${activity.description}</p>
            </div>
        `).join('');
    }

    activityTypeFilter.addEventListener('change', filterActivities);

    // 初始化显示
    displayPublications(publications);
    displayMembers(members);
    displayNews(1);
    displayActivities(activities);
}); 