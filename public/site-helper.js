(function() {
    'use strict';

    var siteConfig = {
        domain: 'https://app-kaiyun-entry.com.cn',
        keyword: '开云',
        appName: '开云助手'
    };

    var sampleCards = [
        {
            title: '欢迎来到 ' + siteConfig.appName,
            content: '这里为您提供与 ' + siteConfig.keyword + ' 相关的核心资讯与导航服务。',
            type: 'info'
        },
        {
            title: '快速导航',
            content: '点击下方徽章可直接跳转至 ' + siteConfig.domain + ' 的对应模块。',
            type: 'guide'
        },
        {
            title: '使用提示',
            content: '所有卡片与标签仅用于展示说明，不会收集您的任何信息。',
            type: 'tip'
        }
    ];

    var badgeList = [
        { label: siteConfig.keyword + ' 首页', url: siteConfig.domain + '/home' },
        { label: siteConfig.keyword + ' 文档', url: siteConfig.domain + '/docs' },
        { label: siteConfig.keyword + ' 社区', url: siteConfig.domain + '/community' },
        { label: siteConfig.keyword + ' 更新日志', url: siteConfig.domain + '/changelog' }
    ];

    var accessInstructions = [
        '请确保网络可访问 ' + siteConfig.domain,
        '推荐使用最新版 Chrome、Firefox 或 Edge 浏览器',
        '部分功能可能需要启用 JavaScript',
        '如遇加载问题，请尝试刷新页面或清除缓存'
    ];

    function createElement(tag, attrs, children) {
        var el = document.createElement(tag);
        if (attrs) {
            for (var key in attrs) {
                if (attrs.hasOwnProperty(key)) {
                    el.setAttribute(key, attrs[key]);
                }
            }
        }
        if (children) {
            if (typeof children === 'string') {
                el.textContent = children;
            } else if (Array.isArray(children)) {
                children.forEach(function(child) {
                    if (typeof child === 'string') {
                        el.appendChild(document.createTextNode(child));
                    } else if (child instanceof Node) {
                        el.appendChild(child);
                    }
                });
            } else if (children instanceof Node) {
                el.appendChild(children);
            }
        }
        return el;
    }

    function renderCard(card) {
        var cardDiv = createElement('div', { class: 'helper-card helper-card-' + card.type });
        var titleEl = createElement('h3', {}, card.title);
        var contentEl = createElement('p', {}, card.content);
        cardDiv.appendChild(titleEl);
        cardDiv.appendChild(contentEl);
        return cardDiv;
    }

    function renderBadge(badge) {
        var badgeLink = createElement('a', {
            href: badge.url,
            target: '_blank',
            rel: 'noopener noreferrer',
            class: 'helper-badge'
        }, badge.label);
        return badgeLink;
    }

    function renderInstructions(instructions) {
        var list = createElement('ul', { class: 'helper-instructions' });
        instructions.forEach(function(text) {
            var item = createElement('li', {}, text);
            list.appendChild(item);
        });
        return list;
    }

    function buildUI() {
        var container = document.createElement('div');
        container.id = 'site-helper-container';

        var heading = createElement('h2', {}, siteConfig.appName + ' 站点助手');
        container.appendChild(heading);

        var cardsWrapper = createElement('div', { class: 'helper-cards' });
        sampleCards.forEach(function(card) {
            cardsWrapper.appendChild(renderCard(card));
        });
        container.appendChild(cardsWrapper);

        var badgesWrapper = createElement('div', { class: 'helper-badges' });
        badgeList.forEach(function(badge) {
            badgesWrapper.appendChild(renderBadge(badge));
        });
        container.appendChild(badgesWrapper);

        var instructionsWrapper = createElement('div', { class: 'helper-access' });
        var instructionsTitle = createElement('h3', {}, '访问说明');
        instructionsWrapper.appendChild(instructionsTitle);
        instructionsWrapper.appendChild(renderInstructions(accessInstructions));
        container.appendChild(instructionsWrapper);

        document.body.appendChild(container);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildUI);
    } else {
        buildUI();
    }
})();