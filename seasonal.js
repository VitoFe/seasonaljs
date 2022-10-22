// FontAwesome Icons
var iconsMap = new Map([
    ['winter', {
        icons: [
            'fa-regular fa-snowflake wparticle-s',
            'fa-solid fa-snowflake wparticle-xs',
            'fa-solid fa-arrows-to-dot wparticle-xxs'
        ],
        styles: [
            'color: #f5f8fc',
            'color: #f3f6fB',
            'color: #fffff0'
        ],
        rotations: [30, 60, 120, 240, 300],
        opacity: [0.75, 0.65, 0.6],
        fade: true
    }],
    ['autumn', {
        icons: [
            'fa-solid fa-leaf wparticle-xs',
            'fa-brands fa-canadian-maple-leaf wparticle-m'
        ],
        styles: [
            'color: #7A560E;',
            'color: #a88f36;',
            'color: #CDA449;',
            'color: #99451F;'
        ],
        rotations: [30, 60, 120, 240, 300],
        opacity: [0.9, 0.8, 0.7, 0.6],
        fade: true
    }],
    ['xmas', {
        icons: [
            'fa-solid fa-snowman wparticle-l',
            'fa-solid fa-sleigh wparticle-l',
            'fa-solid fa-bell wparticle-m',
            'fa-solid fa-candy-cane wparticle-m',
            'fa-solid fa-gift wparticle-m',
            'fa-solid fa-star wparticle-m',
            'fa-solid fa-tree wparticle-l',
            'fa-solid fa-snowflake wparticle-m',
        ],
        styles: [
            'color: #ECECEE',
            'color: #7A560E',
            'color: #C1A520',
            'color: #f3f6fB',
            'color: #C30F16',
            'color: #F1D900',
            'color: #1E792C',
            'color: #f3f6fB'
        ],
        rotations: [0, 30, 330],
        opacity: [0.9, 0.8, 0.7, 0.6],
        fade: false
    }],
    ['rain', {
        icons: [
            'fa-solid fa-droplet wparticle-xxs',
            'fa-solid fa-droplet wparticle-xs'
        ],
        styles: [
            'color: #C4D3DF;',
            'color: #79a1af;',
            'color: #a0b6c4;',
            'color: #E5E5E3;'
        ],
        rotations: [],
        opacity: [0.55, 0.5, 0.4],
        fade: false
    }],
    ['clouds', {
        icons: [
            'fa-solid fa-cloud wparticle-xl',
            'fa-solid fa-cloud wparticle-xxl'
        ],
        styles: [
            'color: #a8a8a8;',
            'color: #e0e6e4;'
        ],
        rotations: [],
        opacity: [0.35, 0.3, 0.2],
        fade: false
    }],
    ['storm', {
        icons: [
            'fa-solid fa-cloud wparticle-xxl',
            'fa-solid fa-bolt-lightning wparticle-l',
            'fa-solid fa-bolt-lightning wparticle-xl',
            'fa-solid fa-cloud wparticle-xl'
        ],
        styles: [
            'color: #a8a8a8;',
            'color: #FFDB67;',
            'color: #FCDC5C;',
            'color: #c0c6c4;'
        ],
        rotations: [],
        opacity: [0.35, 0.3, 0.2],
        fade: false
    }],
    ['sun', {
        icons: [
            'fa-solid fa-sun wparticle-xl',
            'fa-solid fa-sun wparticle-xxl'
        ],
        styles: [
            'color: #FCDC5C;',
            'color: #FFDB67;'
        ],
        rotations: [0, 30, 330],
        opacity: [0.4, 0.35],
        fade: false
    }]
]);

var weffect_div = [];
var weffect_ids = [];

function getRand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
};

function getDocWidth() {
    var D = document;
    return Math.max(
        D.body.offsetWidth, D.documentElement.offsetWidth,
        D.body.clientWidth, D.documentElement.clientWidth
    );
};

function placeRandomly(div) {
    div.style.top = String(Math.random() * getDocHeight()) + 'px';
    div.style.left = String(Math.random() * getDocWidth()) + 'px';
};

function placeOnTop(div) {
    div.style.top = '0px';
    div.style.left = String((Math.random() * getDocWidth()) - 50) + 'px';
};

function initWEffect(div, intervalID, xSpeed, ySpeed, fade) {
    var particle_radius = 0;
    var offset_vert = ySpeed;
    var offset_radius = -Math.PI + Math.random() * Math.PI;
    var pos_x = parseInt(div.style.left);
    var pos_y = parseInt(div.style.top);
    const particle_size = div.style.fontSize;
    var dead = false;
    // movement
    function _interval() {
        pos_x = parseInt(div.style.left);
        pos_y = parseInt(div.style.top);
        if (!dead) {
            particle_radius += (offset_radius / 180) * Math.PI;
            div.style.left = String(pos_x -= xSpeed * (Math.cos(particle_radius))) + 'px';
            div.style.top = String(pos_y += offset_vert) + 'px';
        }
        // x y bounds
        if (pos_x > getDocWidth() - 50) {
            placeOnTop(div);
        } else if (pos_y > getDocHeight() - 50) {
            // stay on bottom of the page for a while
            if (!fade || (dead && div.style.opacity < 0.05)) {
                dead = false;
                // restore opacity and font size
                div.style.opacity = 1;
                div.style.fontSize = particle_size
                placeOnTop(div);
            } else {
                div.style.opacity = Math.max(0, div.style.opacity - 0.05 * Math.random());
                div.style.fontSize = String(Math.max(3, parseInt(div.style.fontSize) - 3)) + 'px';
                dead = true;
            }
        }
    };
    window['id_weffect_' + String(intervalID)] = setInterval(_interval, 30);
    weffect_ids.push(window['id_weffect_' + String(intervalID)]);
};

function stopWEffect() {
    weffect_ids.forEach(function (id) {
        clearInterval(id);
    });
    weffect_div.forEach(function (div) {
        div.remove();
    });
    weffect_div = [];
    weffect_ids = [];
};

function startWEffect(amount, xSpeed = 8, ySpeed = 4, iconKey) {
    stopWEffect(); // stop previous effect if any
    const iconData = iconsMap.get(iconKey);
    var icon_index = 0;
    for (var i = 0; i < amount; ++i) {
        var particle = document.createElement("div");
        particle.id = '_weffect_' + String(i);
        particle.className = 'weffect';
        p_icon = document.createElement("i");
        p_icon.className = iconData.icons[icon_index];
        p_icon.style = iconData.styles.length == iconData.icons.length ? iconData.styles[icon_index] : getRand(iconData.styles);
        if (iconData.rotations.length > 0) {
            p_icon.style.transform = 'rotate(' + getRand(iconData.rotations) + 'deg)';
        }
        p_icon.style.opacity = getRand(iconData.opacity);
        p_icon.style.textShadow = '4px 4px 5px #000000';
        particle.appendChild(p_icon);
        particle.style.position = 'absolute';
        placeRandomly(particle);
        particle.style.pointerEvents = 'none';
        document.getElementsByTagName('body')[0].appendChild(particle);
        weffect_div.push(particle);
        initWEffect(particle, i, xSpeed, ySpeed, iconData.fade);
        icon_index = (icon_index + 1) % iconData.icons.length;
    };
};