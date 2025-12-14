// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Video Loading Function
function loadVideo(container) {
    const videoType = container.getAttribute('data-video-type');
    const videoId = container.getAttribute('data-video-id');
    const placeholder = container.querySelector('.video-placeholder');

    if (!videoType || !videoId) {
        if (placeholder) {
            placeholder.innerHTML = '<p>Video configuration missing</p>';
        }
        return;
    }

    let videoElement;
    
    if (videoType === 'youtube') {
        // YouTube embed
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        iframe.title = 'Gameplay video';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        
        iframe.onload = () => {
            if (placeholder) {
                placeholder.style.opacity = '0';
                setTimeout(() => {
                    placeholder.remove();
                }, 300);
            }
        };

        iframe.onerror = () => {
            if (placeholder) {
                placeholder.innerHTML = '<p>Failed to load video. Please check the video ID.</p>';
            }
        };

        container.appendChild(iframe);
        return;
        
    } else if (videoType === 'gdrive') {
        // Use Google Drive preview iframe (shows thumbnail and allows playback)
        const iframe = document.createElement('iframe');
        iframe.src = `https://drive.google.com/file/d/${videoId}/preview`;
        iframe.allow = 'autoplay; fullscreen';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        iframe.title = 'Gameplay video';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px 8px 0 0';
        
        // Add iframe to container
        container.appendChild(iframe);
        
        // Hide placeholder after iframe loads (or after timeout)
        let placeholderHidden = false;
        
        const hidePlaceholder = () => {
            if (!placeholderHidden && placeholder && placeholder.parentElement) {
                placeholderHidden = true;
                placeholder.style.opacity = '0';
                setTimeout(() => {
                    if (placeholder.parentElement) {
                        placeholder.remove();
                    }
                }, 300);
            }
        };
        
        // Hide placeholder when iframe loads
        iframe.onload = () => {
            hidePlaceholder();
        };
        
        // Also hide after a timeout (iframe might load but not trigger onload)
        setTimeout(() => {
            hidePlaceholder();
        }, 1500);
        
        // Fallback: if iframe completely fails, show link
        iframe.onerror = () => {
            if (placeholder && placeholder.parentElement) {
                placeholder.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <p style="color: #9333ea; margin-bottom: 15px; font-weight: 600;">Click to view video</p>
                        <a href="https://drive.google.com/file/d/${videoId}/view" target="_blank" 
                           style="display: inline-block; padding: 12px 24px; background: #9333ea; color: white; 
                                  text-decoration: none; border-radius: 8px; font-size: 0.95rem; font-weight: 600;
                                  transition: all 0.3s; box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);">
                           Open Video in Google Drive
                        </a>
                    </div>
                `;
            }
        };
        
        return;
        
    } else {
        if (placeholder) {
            placeholder.innerHTML = '<p>Unsupported video type</p>';
        }
        return;
    }
}

// Direct video playback function for Google Drive
function loadDirectVideo(container, videoId, placeholder) {
    // Remove existing elements if any
    const existingElements = container.querySelectorAll('iframe, video');
    existingElements.forEach(el => el.remove());

    // Create video element with direct Google Drive URL
    const video = document.createElement('video');
    video.controls = true;
    video.loop = true;
    video.muted = false;
    video.playsInline = true;
    video.preload = 'auto';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'contain';
    video.style.backgroundColor = 'transparent';
    
    // Use the most reliable Google Drive URL format
    // IMPORTANT: File must be shared with "Anyone with the link" in Google Drive
    const videoUrl = `https://drive.google.com/uc?export=download&id=${videoId}`;
    
    const source = document.createElement('source');
    source.src = videoUrl;
    source.type = 'video/mp4';
    
    video.appendChild(source);
    
    let hasLoaded = false;
    
    video.onloadeddata = () => {
        hasLoaded = true;
        if (placeholder) {
            placeholder.style.opacity = '0';
            setTimeout(() => {
                if (placeholder.parentElement) {
                    placeholder.remove();
                }
            }, 300);
        }
    };

    video.oncanplay = () => {
        if (!hasLoaded && placeholder) {
            placeholder.style.opacity = '0';
            setTimeout(() => {
                if (placeholder.parentElement) {
                    placeholder.remove();
                }
            }, 300);
        }
    };

    video.onerror = (e) => {
        console.error('Video load error:', e);
        // Show helpful error message
        if (placeholder) {
            placeholder.innerHTML = `
                <div style="text-align: center; padding: 20px; max-width: 300px;">
                    <p style="color: #9333ea; margin-bottom: 10px; font-weight: 600; font-size: 1rem;">⚠️ Video cannot be loaded</p>
                    <p style="color: #5a5462; margin-bottom: 15px; font-size: 0.85rem; line-height: 1.5;">
                        Make sure the Google Drive file is:<br>
                        • Shared with "Anyone with the link"<br>
                        • Not restricted by organization policies
                    </p>
                    <a href="https://drive.google.com/file/d/${videoId}/view" target="_blank" 
                       style="display: inline-block; padding: 10px 20px; background: #9333ea; color: white; 
                              text-decoration: none; border-radius: 6px; font-size: 0.9rem; font-weight: 600;
                              transition: all 0.3s; box-shadow: 0 2px 8px rgba(147, 51, 234, 0.3);"
                       onmouseover="this.style.background='#7c2d9a'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(147, 51, 234, 0.4)'"
                       onmouseout="this.style.background='#9333ea'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(147, 51, 234, 0.3)'">
                       Open in Google Drive
                    </a>
                </div>
            `;
        }
    };
    
    // Try to load the video
    video.load();
    
    container.appendChild(video);
}

// Initialize videos when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load all videos - use intersection observer for better performance
    const videoContainers = document.querySelectorAll('.project-video[data-video-type]');
    videoContainers.forEach(container => {
        // Load videos when they come into view (but with immediate trigger for first few)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadVideo(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '100px' // Load earlier
        });
        
        // Also load immediately if already in view
        const rect = container.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight + 100;
        
        if (isInView) {
            loadVideo(container);
        } else {
            observer.observe(container);
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards and skill cards
    const cards = document.querySelectorAll('.project-card, .skill-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(card);
    });
});
