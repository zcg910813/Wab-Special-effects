var pic_box = document.getElementById('pic_box'),
    scrollBall = document.getElementById('scrollBall'),
    points = document.getElementById('point_btns').getElementsByTagName('a'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');
//自动轮播函数
function autoMove() {
    pic_box.timer ? clearTimeout(pic_box.timer) : null;
    pic_box.timer = setTimeout(move, 1000);
}
autoMove();
//设置变化的量，轮播方向
pic_box.index = 0;
pic_box.direction = 1;
//滚动函数
function move() {
    pic_box.index += pic_box.direction;
    //判断向左轮播时的零界点
    if (pic_box.index == 7) {
        scrollBall.style.left = 0;
        pic_box.index = 1;
    } else if (pic_box.index == -1) {
        scrollBall.style.left = '-4740px';
        pic_box.index = 5;
    }
    //添加动画
    animate(scrollBall, {
        left: pic_box.index * -790
    }, 300, function () {
        //保证每张图停留的时间相等
        autoMove();
    })
    //底部小按钮跟随变化
    for (var i = 0; i < points.length; i++) {
        points[i].className = '';
    }
    points[pic_box.index % 6].className = 'high_light';
}
//切换轮播方向
pic_box.onmouseover = function () {
    prev.className = next.className = 'show';
    this.onmouseout = function () {
        prev.className = next.className = 'hide';
    }
}
prev.onclick = function () {
    clearTimeout(pic_box.timer);
    pic_box.direction = -1;
    move();
}
next.onclick = function () {
    clearTimeout(pic_box.timer);
    pic_box.direction = 1;
    move();
}
//小按钮切换
function clicks() {
    for (var i = 0; i < points.length; i++) {
        points[i].index = i;
        points[i].onclick = function () {
            //显示第7张图时，点击第一个按钮无效
            if (this.index == 0 && pic_box.index == 6) {
                return;
            }
            //修改下一次自动轮播的起始点
            pic_box.index = this.index;
            //添加动画
            animate(scrollBall, {
                left: pic_box.index * -790
            }, 300, function () {
                //保证每张图停留的时间相等
                autoMove();
            })
            for (var j = 0; j < points.length; j++) {
                points[j].className = '';
            }
            this.className = 'high_light';
        }
    }
}
clicks();
