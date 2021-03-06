1.RegExp 构造函数
    在 ES5 中，RegExp构造函数的参数有两种情况。

    1.第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。

    var regex = new RegExp('xyz', 'i');
    // 等价于
    var regex = /xyz/i;
    2.第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。

    var regex = new RegExp(/xyz/i);
    // 等价于
    var regex = /xyz/i;
    //ES6新增
    3.如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。
    而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

    new RegExp(/abc/ig, 'i').flags

2.字符串的正则方法
    字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和split()。

    ES6 将这 4 个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。

    String.prototype.match 调用 RegExp.prototype[Symbol.match]
    String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
    String.prototype.search 调用 RegExp.prototype[Symbol.search]
    String.prototype.split 调用 RegExp.prototype[Symbol.split]

3.y 修饰符
    除了u修饰符，ES6 还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。
    y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。
    不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。

    var s = 'aaa_aa_a';
    var r1 = /a+/g;
    var r2 = /a+/y;

    r1.exec(s) // ["aaa"]
    r2.exec(s) // ["aaa"]

    r1.exec(s) // ["aa"]
    r2.exec(s) // null

    实际上，y修饰符号隐含了头部匹配的标志^。

    /b/y.exec('aba')
    // null
    上面代码由于不能保证头部匹配，所以返回null。y修饰符的设计本意，就是让头部匹配的标志^在全局匹配中都有效。

4.sticky 属性
    与y修饰符相匹配，ES6 的正则对象多了sticky属性，表示是否设置了y修饰符。

    var r = /hello\d/y;
    r.sticky // true

5.flags 属性
    ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符。

    // ES5 的 source 属性
    // 返回正则表达式的正文
    /abc/ig.source
    // "abc"

    // ES6 的 flags 属性
    // 返回正则表达式的修饰符
    /abc/ig.flags
    // 'gi'