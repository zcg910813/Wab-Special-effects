/*获取名称栏*/
var person_1 = document.getElementById("name1");
var person_2 = document.getElementById("name2");
/*获取血条*/
var bload_1 = document.getElementById("bload1").getElementsByTagName("div")[0];
var bload_2 = document.getElementById("bload2").getElementsByTagName("div")[0];
var bArr = [bload_1, bload_2];
/*获取伤害显示区*/
var content = document.getElementById("content");
/*开始按钮*/
var btn = document.getElementById("btn");

/*初始化数据*/
var nameArr = ['秦雪薇', '燕妮', '孙立发', '宁静', '赵宇鹏', '赵映云', '廖轩', '刘燕龙', '赵晓飞', '崔笑笑', '李妍荣', '唐凯', '刘彦斌', '刘佳鑫', '徐阳', '王启栋', '吕新林', '付苗苗', '王璇', '米腾', '傅玲佳', '王强', '刘继龙', '杜超', '杜乐', '赵惠明', '范羽丰', '曹辉', '郝家栋', '高宏宇', '王浩举', '王慧霞', '王虎', '马兵', '常菊红', '王文玉', '李广友', '张增金', '刘垚', '铁鸿基', '冯磊', '杨帆', '王震', '左胤辰', '石银军', '毛慧霞', '周轶楠', '张波', '刘瑞娜', '韩继江', '田祥文', '王海祥', '卫亚斌', '付远东', '高驰原', '陈鑫浩'];
var hurt = [
        '抛去一枚板砖',
        '发动终极必杀技：“你的代码有BUG”',
        '扔了一块臭豆腐',
        '使用制服诱惑，俘获了TA',
        '唱了一首《忐忑》',
        '撒娇',
        '施展《夺命剪刀脚》',
        '抛洒三鹿奶粉'
]

/*随机抽取两人*/
function dragPerson() {
    var i = 0;
    var p1, p2;
    while (i < nameArr.length) {
        p1 = nameArr[Math.floor(Math.random() * nameArr.length)];
        p2 = nameArr[Math.floor(Math.random() * nameArr.length)];
        if (p1 !== p2) {
            break;
        }
    }
    return [
        {
            name: p1,
            bload: 400,
            cName: 'p0'
        },
        {
            name: p2,
            bload: 400,
            cName: 'p1'
        }
    ]
}
var pNames = dragPerson();
/*名称栏填入人名*/
function writeIn() {
    person_1.innerHTML = pNames[0].name;
    person_2.innerHTML = pNames[1].name;
}
btn.onclick = function () {
    writeIn();
    content.innerHTML = '';
    /*开始攻击*/
    var timer = setInterval(function () {
        var n = Math.floor(Math.random() * 2);
        var h = hurt[Math.floor(Math.random() * hurt.length)];
        var hn = Math.floor(Math.random() * 50 + 6);
        /*伤害显示*/
        content.innerHTML += '<p><b class="p' + n + '">' + pNames[n].name + '</b>对<b class="p' + Number(!n) + '">' + pNames[Number(!n)].name + '</b>' + h + '，对其造成了<b>' + hn + '</b>点伤害</p>';
        pNames[Number(!n)].bload -= hn;
        /*获胜判定*/
        if (pNames[Number(!n)].bload <= 0) {
            pNames[Number(!n)].bload = 0;
            content.innerHTML += '<p><b class="p' + n + '">' + pNames[n].name + '</b>&nbsp;<i>K.O</i>&nbsp;<b class="p' + Number(!n) + '">' + pNames[Number(!n)].name + '</b>'
            gameOver(pNames[n].name, n);
        }
        bArr[Number(!n)].style.width = pNames[Number(!n)].bload + 'px';
        /*滚动条置底*/
        content.scrollTop = content.scrollHeight;
    }, 400);
    /*游戏结束*/
    function gameOver(str, x) {

        clearInterval(timer);
        var dialog = document.getElementById("dialog");
        console.log(dialog)
        dialog.innerHTML = '<b><i>Winner!!!</i>&nbsp;&nbsp;&nbsp;' + str + '</b>';
        dialog.className = 'winner';

    }

}

