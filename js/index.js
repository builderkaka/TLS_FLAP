$(function() {
    const player = new Plyr('#player', {
        clickToPlay: true,
        fullscreen: {
            enabled: true,
            fallback: true,
            iosNative: true
        }
    });
    const popupMask = $('.video_popup_mask');
    const popupVideo = document.getElementById('popup_player');
    const coverImg = document.querySelector('.video_cover');
    const popupPlayer = new Plyr('#popup_player', {
        fullscreen: {
            enabled: true,
            fallback: true,
            iosNative: true
        }
    });

    const captureFirstFrame = () => {
        if (!popupVideo) return;
        popupVideo.preload = 'auto';
        popupVideo.load();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const doCapture = () => {
            try {
                canvas.width = popupVideo.videoWidth || 1280;
                canvas.height = popupVideo.videoHeight || 720;
                ctx.drawImage(popupVideo, 0, 0, canvas.width, canvas.height);
                const posterDataUrl = canvas.toDataURL('image/png');
                // if (coverImg) coverImg.src = posterDataUrl;
                popupVideo.setAttribute('poster', posterDataUrl);
            } catch (err) {
                console.log('captureFirstFrame failed', err);
            }
        };

        popupVideo.addEventListener('loadeddata', doCapture, { once: true });
        popupVideo.addEventListener('seeked', doCapture, { once: true });

        popupVideo.addEventListener('loadedmetadata', () => {
            try {
                popupVideo.currentTime = 0.05;
            } catch (e) {}
        }, { once: true });
    };

    captureFirstFrame();

    $('.open_video_popup').on('click', function() {
        popupMask.fadeIn(180, function() {
            try {
                popupPlayer.currentTime = 0;
            } catch (e) {}
            popupPlayer.play();
        });
    });

    $('.video_popup_close, .video_popup_mask').on('click', function(e) {
        if (e.target !== this && !$(this).hasClass('video_popup_mask')) return;
        popupPlayer.pause();
        popupMask.fadeOut(180);
    });

    $('.video_popup_box').on('click', function(e) {
        e.stopPropagation();
    });

    const memesRows = [
        $('.memes_row_1'),
        $('.memes_row_2'),
        $('.memes_row_3'),
        $('.memes_row_4')
    ];
    const memeImages = Array.from({ length: 64 }, (_, index) => {
        const num = String(index + 1).padStart(2, '0');
        return `./assets/meme/meme_${num}.png`;
    });

    memesRows.forEach((row, rowIndex) => {
        if (!row.length) return;
        const start = rowIndex * 16;
        const rowImages = memeImages.slice(start, start + 16);
        const loopImages = rowImages.concat(rowImages);
        row.html(loopImages.map(src => `<img src="${src}" alt="meme">`).join(''));
    });
    const showToast = (toastText = "Copy Success") => {
        // $("#m-toast-inner-text").text(toastText);
        // $('#m-toast-pop').fadeIn();
        // setTimeout(function () {
        //     $('#m-toast-pop').fadeOut();
        // }, 1000);
        window.alert(toastText)
    }
    const navMore = $('.nav_logo_link_icon .nav_more');
    const navClose = $('.nav_logo_link_icon .nav_close');
    const navMoreList = $('.more_list');
    const moreListMask = $('.more_list_mask');

    if (navMore.length && navClose.length && navMoreList.length && moreListMask.length) {
        moreListMask.on('click', function() {
            navClose.click();
            moreListMask.hide();
        });
        navMore.on('click', function() {
            navMore.hide();
            navClose.show();
            moreListMask.show();
            navMoreList.css('display', 'flex');
        });
        navClose.on('click', function() {
            navClose.hide();
            moreListMask.hide();
            navMore.show();
            navMoreList.css('display', 'none');
        });
    }
    $('.nav_logo_link_about').on('click', function() {
        $('.be_about_to_mask').fadeIn(200);
    });
    $('.be_about_to_mask').on('click', '.close', function() {
        $('.be_about_to_mask').fadeOut(200);

    });
    $('.content_video .content_video_tip').on('click', function() {
        // let url = "https://x.com/Cliffordonbsc";
        let url = "https://www.youtube.com/@CliffordCTO";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank"; // 新标签页打开可防止来源被追踪
        a.rel = "noopener noreferrer"; // 防止传递 referrer
        document.body.appendChild(a);
        a.click();
    });
    $('.twitter').on('click', function() {
        let url = "https://x.com/TLS_FLAP";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
    });
    $('.join_us').on('click', function() {
        let url = "https://t.me/TLS_FLAP";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
    });
    $('.buy_now').on('click', function() {
        let url = "https://pancakeswap.finance/swap?outputCurrency=0x0598075dc4d1c9484daa80c62313aad39fc77777";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
    });
    $('.tokenomics_tip').on('click', function() {
        let url = "https://flap.sh/bnb/0x0598075dc4d1c9484daa80c62313aad39fc77777/taxinfo";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
    });
    $('.memes_more').on('click', function() {
        let url = "https://t.me/TLS_FLAP";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
    });
    $('.ave_link').on('click', function() {
        let url = "https://pro.ave.ai/token/0x0598075dc4d1c9484daa80c62313aad39fc77777-bsc";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
    });
    $('.binance_link').on('click', function() {
        let url = "https://www.gate.com/alpha/bsc-0x0598075dc4d1c9484daa80c62313aad39fc77777";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
    });
    $('.tp_link').on('click', function() {
        let url = "https://www.tokenpocket.pro/en/download/app";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
    });
    $('.buy_now').on('click', function() {
        let url = "https://pancakeswap.finance/swap?outputCurrency=0x0598075dc4d1c9484daa80c62313aad39fc77777";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
    });
    $('.four_link').on('click', function() {
        let url = "https://four.meme/zh-TW/token/0x9cb3ab4fb21cf910da2ce6800753dbd866784444";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank"; // 新标签页打开可防止来源被追踪
        a.rel = "noopener noreferrer"; // 防止传递 referrer
        document.body.appendChild(a);
        a.click();
    });
    $('.dextools_link').on('click', function() {
        let url = "https://www.dextools.io/app/cn/bnb/pair-explorer/0xe45f482b86cc979a6a28f6725e8fe2e5150dc985";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank"; // 新标签页打开可防止来源被追踪
        a.rel = "noopener noreferrer"; // 防止传递 referrer
        document.body.appendChild(a);
        a.click();
    });
    $('.bnb_link').on('click', function() {
        let url = "https://bscscan.com/token/0x9cb3ab4fb21cf910da2ce6800753dbd866784444";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank"; // 新标签页打开可防止来源被追踪
        a.rel = "noopener noreferrer"; // 防止传递 referrer
        document.body.appendChild(a);
        a.click();
    });
    $('.wellet_link').on('click', function() {
        let url = "https://web3.okx.com/";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank"; // 新标签页打开可防止来源被追踪
        a.rel = "noopener noreferrer"; // 防止传递 referrer
        document.body.appendChild(a);
        a.click();
    });
    $('.binance_link').on('click', function() {
        let url = "https://www.binance.com/en/binancewallet";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank"; // 新标签页打开可防止来源被追踪
        a.rel = "noopener noreferrer"; // 防止传递 referrer
        document.body.appendChild(a);
        a.click();
    });
    $('.tp_link').on('click', function() {
        let url = "https://www.tokenpocket.pro/";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank"; // 新标签页打开可防止来源被追踪
        a.rel = "noopener noreferrer"; // 防止传递 referrer
        document.body.appendChild(a);
        a.click();
    });
    $('.dex_link').on('click', function() {
        let url = "https://dexscreener.com/bsc/0xe45f482b86cc979a6a28f6725e8fe2e5150dc985";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank"; // 新标签页打开可防止来源被追踪
        a.rel = "noopener noreferrer"; // 防止传递 referrer
        document.body.appendChild(a);
        a.click();
    });
    $('.ave_link').on('click', function() {
        let url = "https://ave.ai/token/0x9cb3ab4fb21cf910da2ce6800753dbd866784444-bsc";
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank"; // 新标签页打开可防止来源被追踪
        a.rel = "noopener noreferrer"; // 防止传递 referrer
        document.body.appendChild(a);
        a.click();
    });
    $('.grid_box img').hover(
        function() { // 鼠标移入
            $(this).addClass('hover-zoom');
        },
        function() { // 鼠标移出
            $(this).removeClass('hover-zoom');
        }
    );
    $('.info_content_copy').on('click', function() {
        // let content = $(".info_content_link_copy").find('span').text();
        let content = "0x0598075dc4d1c9484daa80c62313aad39fc77777";
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(content)
                .then(function() {
                    showToast("Copy Success");
                })
                .catch(function() {
                    copyOld(content);
                });
        } else {
            copyOld(content);
        }

        function copyOld(text) {
            var tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = text;
            tempInput.select();
            tempInput.setSelectionRange(0, tempInput.value.length);
            try {
                var successful = document.execCommand('copy');
                if (successful) {
                    showToast("Copy Success");
                } else {
                    showToast("Copy Error");
                }

            } catch (err) {
                showToast("Copy Error");
            }
            document.body.removeChild(tempInput);
        }
    });
    $("#copy").on("click", function() {


        var qq = document.getElementById("qq_num").innerText;
        var oInput = document.createElement('input');
        oInput.value = qq;
        document.body.appendChild(oInput);
        oInput.select();
        document.execCommand("Copy");
        oInput.className = 'oInput';
        oInput.style.display = 'none';
    })
});