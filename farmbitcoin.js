const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
var randomItem = require('random-item');
const Markup = require('telegraf/markup');
const bot = new Telegraf("1055553933:AAGuRXEbCN-QDPw5UFY0-M32AzuV8VVKEM0");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { enter,leave } = Stage
var rest = require('restler');
var btc='a98c44c6-eb70-5a48-80a5-3cbed4df07e0'
var rates = require("bitcoin-exchange-rates");
var cron = require('node-cron');
var mysql = require('mysql');
var bchaddr = require('bchaddrjs');
var isLegacyAddress = bchaddr.isLegacyAddress;
var isBitpayAddress = bchaddr.isBitpayAddress;
var isCashAddress = bchaddr.isCashAddress;
var WAValidator = require('wallet-address-validator');
var coinbase = require('coinbase');
var Coinbase = require('coinbase');
var Client = require('coinbase').Client;
var mysecret = 'YmPmAsNeuwvEiufNue4erKBktoCaShhF'
var mykey = 'jawBVbmyN9GPhQvs'

var sb = require('satoshi-bitcoin');
var client = new Client({'apiKey': mykey, 'apiSecret': mysecret});
var con = mysql.createConnection({
    host: "remotemysql.com",
    user: "83YT2628Hs",
    password: "u98cDnHpOW",
    database:"83YT2628Hs"
});
var rn = require('random-number');
var options = {
    min:  1
    , max:  100
    , integer: true
}
//server

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(process.env.PORT || 3000)
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//catch error
bot.catch((err) => {
    console.log('Ooops', err)
})



//menu refferal start

bot.use(Telegraf.log());





//start
bot.command('start',ctx => {
    var message = ctx.message;
    var id = ctx.from.id;
    var start = '/start';
    con.query("SELECT id FROM account WHERE id=" + id, function (err, result, fields) {
        console.log(result.length)
        if (message.text == start&&result.length===0) {
            var chatid = ctx.from.id;
            var firstname = ctx.from.first_name;
            var bal = 0;
            var tim = new Date();
            var address = 'none';
            var refa = 411002680;
            var images='on'
            var user = {id: chatid, balance: bal, firstname: firstname, time: tim, withdrawadd: address, ref: refa,images:images};
            con.query("insert into `account` SET ?", user, function (error, results) {

                console.log(error)
                ctx.reply('welcome ' + ctx.from.first_name + ' to ltc shop.\n\n🔹Own shops\n🔹Collect income\n🔹Exchange income for 💰\n🔹Earn real Money in ltc', Markup
                    .keyboard([
                        ['🏦Shops', '💵Income'], // Row1 with 2 buttons
                        ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                        ['⚖️Exchange', '📈Stastistics'],
                        ['⚙️Settings', '🎁Bonus'],
                        ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
                    ])

                    .resize()
                    .extra())
            })

        } else if (message.text.split(start)[1] == id) {
            ctx.reply('🚫You cannot refer yourself', Markup
                .keyboard([
                    ['🏦Shops', '💵Income'], // Row1 with 2 buttons
                    ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['⚖️Exchange', '📈Stastistics'],
                    ['⚙️Settings', '🎁Bonus'],
                    ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
                ])

                .resize()
                .extra())
        } else if (message.text.split(start)[1] !== id) {

            var chatd = ctx.from.id
            con.query("SELECT id FROM account WHERE id=" + chatd, function (err, result, fields) {
                console.log(result.length)
                if (result.length === 0) {

                    var chatidi = ctx.from.id;
                    var firstnamee = ctx.from.first_name;
                    var bala = 0;
                    var time = new Date();
                    var addresse = 'none';
                    var images='on'
                    var refidi = message.text.split(start)[1]
                    var useri = {
                        id: chatidi,
                        balance: bala,
                        firstname: firstnamee,
                        time: time,
                        withdrawadd: addresse,
                        ref: refidi,
                        images:images
                    };
                    con.query("insert into `account` SET ?", useri)

                    var chatd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + chatd, function (err, result, fields) {

                        if (result[0].ref !== refidi) {
                            var refbonus =100;
                            var ref = 1;
                            var energy=1;
                            var refid = message.text.split(start)[1];
                            var sql = "update `account` set `balance` =`balance`+ '" + refbonus + "', friends =`friends`+ " + ref + ", payoutpoints = `payoutpoints`+" + energy + " where `id` = '" + refid + "'";



                            con.query(sql)

                            ctx.reply('welcome ' + ctx.from.first_name + ' to ltc shop.\n\n🔹Own shops\n🔹Collect income\n🔹Exchange income for 💰\n🔹Earn real Money in ltc', Markup
                                .keyboard([
                                    ['🏦Shops', '💵Income'], // Row1 with 2 buttons
                                    ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                    ['⚖️Exchange', '📈Stastistics'],
                                    ['⚙️Settings', '🎁Bonus'],
                                    ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
                                ])


                                .resize()
                                .extra())
                            con.query("SELECT id FROM account WHERE id=" + refid, function (err, result, fields) {
                                ctx.telegram.sendMessage(result[0].id, 'you have a new refferal\nyou receive:\n+100 💵\n1⚡️')


                            })
                        }
                    })

                } else if (result.length > 0) {
                    var rd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + rd, function (err, result, fields) {
                        if (result[0].ref == ctx.message.text.split(start)[1]) {
                            ctx.reply('🚫you have already used this link', Markup
                                .keyboard([
                                    ['🏦Shops', '💵Income'], // Row1 with 2 buttons
                                    ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                    ['⚖️Exchange', '📈Stastistics'],
                                    ['⚙️Settings', '🎁Bonus'],
                                    ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
                                ])

                                .resize()
                                .extra())
                        } else if (result[0].ref !== ctx.message.text.split(start)[1]) {
                            ctx.reply('???', Markup
                                .keyboard([
                                    ['🏦Shops', '💵Income'], // Row1 with 2 buttons
                                    ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                    ['⚖️Exchange', '📈Stastistics'],
                                    ['⚙️Settings', '🎁Bonus'],
                                    ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
                                ])

                                .resize()
                                .extra())
                        }
                    })
                }
            })
        }
    })
})
//refferal
bot.hears('👨‍👧‍👦Refferals',ctx => {

    var id=ctx.from.id
    var sql = "SELECT friends,energy from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        var earn=results[0].friends*100
        ctx.replyWithHTML('invite friends and get 100💰 and 1⚡️ for each friend and 30% of your friends deposit\n\n🔅Refferals: <b>'+results[0].friends+' 👥</b> \n\n 🔅earned: <b>'+earn+' 💰</b>',Extra
            .HTML()
            .markup((m) => m.inlineKeyboard([
                m.callbackButton('👤Refferal link', '👤Refferal link')

            ], { columns: 1 })))
            .then(()=>{
                ctx.reply('click 🏠menu for Mainmenu',Markup
                    .keyboard([
                        ['🏠Menu']



                    ])
                    .resize()
                    .extra())
            })

    })


})



bot.action('👤Refferal link',ctx=>{
    ctx.editMessageText('https://t.me/ltcshopbot?start='+ctx.from.id,Extra
        .HTML()
        .markup((m) => m.inlineKeyboard([
            m.callbackButton('👥Refferals', '👥Refferals')
        ], { columns: 1 })))


})

bot.action('👥Refferals',ctx=>{
    var id=ctx.from.id
    var sql = "SELECT friends from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        var earn = results[0].friends * 100
        ctx.editMessageText('invite friends and get 100💰 and 1⚡️ for each friend and 25% of your friends deposit\n\n🔅Refferals: <b>' + results[0].friends + '</b> \n\n 🔅earned: <b>' + earn + '</b>',Extra
            .HTML()
            .markup((m) => m.inlineKeyboard([
                m.callbackButton('👤Refferal link', '👤Refferal link')
            ], { columns: 1 })))

    })
})
//main menu
bot.hears('🏠Menu',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏦Shops', '💵Income'], // Row1 with 2 buttons
            ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['⚖️Exchange', '📈Stastistics'],
            ['⚙️Settings', '🎁Bonus'],
            ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
        ])

        .resize()
        .extra())

})
//shops
bot.hears('🏦Shops',ctx => {
    var id=ctx.from.id
    var sql = "SELECT images from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {

        if (results[0].images === 'on') {
            ctx.replyWithHTML('<b>Buy shop</b>\n\n Here you can buy different type of shops.\nEach shop produces different amounts of income 💵 based on its price 💰.\nYou can collect income earned by your shops at the 💵Income section of the menu.\n⚡️Vip shops produce ⚡️points which are needed for withdrawal', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🏦Buy shops', '🏦Buy shops'),
                    m.callbackButton('⚡️Vip shops', '⚡️Vip shops'),
                    m.callbackButton('🌄Images', '🌄Images'),
                    m.callbackButton('🏫My shops', '🏫My shops')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())

                })
        } else {
            ctx.replyWithHTML('<b>Buy shop</b>\n\n Here you can buy different type of shops.\nEach shop produces different amounts of income 💵 based on its price 💰.\nYou can collect income earned by your shops at the 💵Income section of the menu.\n⚡️Vip shops produce ⚡️points which are needed for withdrawal', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('🏦Buy shops', '🏦Buy shops'),
                    m.callbackButton('⚡️Vip shops', '⚡️Vip shops'),
                    m.callbackButton('❌Images', '❌Images'),
                    m.callbackButton('🏫My shops', '🏫My shops')

                ], {columns: 2})))
                .then(() => {
                    ctx.reply('click 🏠menu for Mainmenu', Markup
                        .keyboard([
                            ['🏠Menu']


                        ])
                        .resize()
                        .extra())


                })
        }
    })
})




//images
bot.action('🌄Images',ctx=> {
    var id = ctx.from.id
    var sql = "SELECT images from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        if (results[0].images === 'on') {
            con.query("UPDATE `account` set `images`='off' where `id` = '" + id + "'")
            ctx.editMessageReplyMarkup(
                {
                    inline_keyboard: [
                        [{text: '🏦Buy shops', callback_data: '🏦Buy shops'}, {
                            text: '⚡️Vip shops',
                            callback_data: '⚡️Vip shops'
                        }],
                        [{text: '❌Images', callback_data: '❌Images'}, {
                            text: '🏫My shops',
                            callback_data: '🏫My shops'
                        }]

                    ]
                },
            )
        }
    })
})
//off images
bot.action('❌Images',ctx=>{
    var id=ctx.from.id
    con.query("UPDATE `account` set `images`='on' where `id` = '" + id + "'")
    ctx.editMessageReplyMarkup(
        {inline_keyboard: [
                [{text: '🏦Buy shops', callback_data: '🏦Buy shops'},{text: '⚡️Vip shops', callback_data: '⚡️Vip shops'}],
                [{text: '🌄Images', callback_data: '🌄Images'},{text: '🏫My shops', callback_data: '🏫My shops'}]

            ]},
    )


})

//buyhouses
bot.action('🏦Buy shops',ctx=> {
    var id = ctx.from.id
    var sql = "SELECT images from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        if (results[0].images === 'on') {
            ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fstore-icon-grocery-shop-market-building-cartoon-vector-11807757.jpg?1542615929456'})
                .then(() => {
                    ctx.replyWithHTML('<b>Grocery</b>\n\n<i>price: 30 💰</i>\n<i>income: 30 💵 per hour</i>', Extra
                        .HTML()
                        .markup((m) => m.inlineKeyboard([
                            m.callbackButton('➕Buy Grocery', '➕Buy Grocery')

                        ], {columns: 2})))
                }).then(() => {
                //bookshop
                ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2F9781447264262.jpg?1542615922560'})
                    .then(() => {
                        ctx.replyWithHTML('<b>Bookshop</b>\n\n<i>price:  200 💰 </i>\n<i>income:   220 💵 per hour</i>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('➕Buy Bookshop', '➕Buy Bookshop')

                            ], {columns: 2})))


                    }).then(() => {
                    //bakery
                    ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fthumb_COLOURBOX30021103.jpg?1542615923416'})
                        .then(() => {
                            ctx.replyWithHTML('<b>Bakery</b>\n\n<i>price: 1500 💰 </i>\n<i>income:  1800 💵 per hour</i>', Extra
                                .HTML()
                                .markup((m) => m.inlineKeyboard([
                                    m.callbackButton('➕Buy Bakery', '➕Buy Bakery')

                                ], {columns: 2})))


                        }).then(() => {
                        //butcher
                        ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fbutcher-shop-meat-seller-meat-eps-vectors_csp37087433.jpg?1542615921736'})
                            .then(() => {
                                ctx.replyWithHTML('<b>Butcher</b>\n\n<i>price: 5000 💰  </i>\n<i>income:  7000 💵 per hour</i>', Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('➕Buy Butcher', '➕Buy Butcher')

                                    ], {columns: 2})))


                            }).then(() => {
                            //supermarket
                            ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fvector-illustration-supermarket-grocery-store-260nw-518613133.jpg?1542615927616'})
                                .then(() => {
                                    ctx.replyWithHTML('<b>supermarket</b>\n\n<i>price: 25000 💰 </i>\n<i>income:  37000 💵 per hour</i>', Extra
                                        .HTML()
                                        .markup((m) => m.inlineKeyboard([
                                            m.callbackButton('➕Buy Supermarket', '➕Buy Supermarket')

                                        ], {columns: 2})))


                                }).then(() => {
                                //jewellary
                                ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fa-jewelry-shop-illustration_csp12164228.jpg?1542615919394'})
                                    .then(() => {
                                        ctx.replyWithHTML('<b>Jewellery</b>\n\n<i>price: 100000 💰 </i>\n<i>income:  150000 💵 per hour</i>', Extra
                                            .HTML()
                                            .markup((m) => m.inlineKeyboard([
                                                m.callbackButton('➕Buy Jewellery', '➕Buy Jewellery')

                                            ], {columns: 2})))
                                    })
                            })
                        })
                    })
                })
            })
        } else {

            ctx.replyWithHTML('<b>Grocery</b>\n\n<i>price: 30 💰</i>\n<i>income: 30 💵 per hour</i>', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('➕Buy Grocery', '➕Buy Grocery')

                ], {columns: 2})))
                .then(() => {
                    ctx.replyWithHTML('<b>Bookshop</b>\n\n<i>price:  200 💰 </i>\n<i>income:   220 💵 per hour</i>', Extra
                        .HTML()
                        .markup((m) => m.inlineKeyboard([
                            m.callbackButton('➕Buy Bookshop', '➕Buy Bookshop')

                        ], {columns: 2})))


                        .then(() => {
                            ctx.replyWithHTML('<b>Bakery</b>\n\n<i>price: 1500 💰 </i>\n<i>income:  1800 💵 per hour</i>', Extra
                                .HTML()
                                .markup((m) => m.inlineKeyboard([
                                    m.callbackButton('➕Buy Bakery', '➕Buy Bakery')

                                ], {columns: 2})))


                                .then(() => {
                                    ctx.replyWithHTML('<b>Butcher</b>\n\n<i>price: 5000 💰  </i>\n<i>income:  7000 💵 per hour</i>', Extra
                                        .HTML()
                                        .markup((m) => m.inlineKeyboard([
                                            m.callbackButton('➕Buy Butcher', '➕Buy Butcher')

                                        ], {columns: 2})))


                                        .then(() => {
                                            ctx.replyWithHTML('<b>supermarket</b>\n\n<i>price: 25000 💰 </i>\n<i>income:  37000 💵 per hour</i>', Extra
                                                .HTML()
                                                .markup((m) => m.inlineKeyboard([
                                                    m.callbackButton('➕Buy Supermarket', '➕Buy Supermarket')

                                                ], {columns: 2})))


                                                .then(() => {
                                                    ctx.replyWithHTML('<b>Jewellery</b>\n\n<i>price: 100000 💰 </i>\n<i>income:  150000 💵 per hour</i>', Extra
                                                        .HTML()
                                                        .markup((m) => m.inlineKeyboard([
                                                            m.callbackButton('➕Buy Jewellery', '➕Buy Jewellery')

                                                        ], {columns: 2})))
                                                })
                                        })
                                })
                        })
                })
        }
    })
})
//vip
bot.action('⚡️Vip shops',ctx=>{
    ctx.replyWithHTML('<b>vip shops</b>\nVIP shops can mine  ⚡️ points!\n' + 'However, to buy such shops you will  need points and 💵, and unlike ordinary shops after some days of work such shops retire.\n')
        .then(()=> {
            ctx.replyWithHTML('<b>Grocery vip: </b>(works 95 days)\n\n<i>price:  💰 1000 + ⚡️ 550  </i>\n<i>income:  + ⚡️ 7 per day</i>', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('➕Buy Grocery vip', '➕Buy Grocery vip')

                ], {columns: 2})))


                .then(() => {
                    ctx.replyWithHTML('<b>Bookshop vip: </b>(works 150 days)\n\n<i>price:  💰 1200 + ⚡️ 1200  </i>\n<i>income:   + ⚡️ 10 per day</i>', Extra
                        .HTML()
                        .markup((m) => m.inlineKeyboard([
                            m.callbackButton('➕Buy Bookshop vip', '➕Buy Bookshop vip')

                        ], {columns: 2})))


                        .then(() => {
                            ctx.replyWithHTML('<b>Bakery vip: </b>(works 150 days)\n\n<i>price:  💰 2800 + ⚡️ 2800  </i>\n<i>income:    + ⚡️ 25 per day</i>', Extra
                                .HTML()
                                .markup((m) => m.inlineKeyboard([
                                    m.callbackButton('➕Buy Bakery vip', '➕Buy Bakery vip')

                                ], {columns: 2})))


                                .then(() => {
                                    ctx.replyWithHTML('<b>supermarket vip: </b> (works 95 days)\n\n<i>price:  💰 5000 + ⚡️ 10000  </i>\n<i>income:    + ⚡️ 128 per day</i>', Extra
                                        .HTML()
                                        .markup((m) => m.inlineKeyboard([
                                            m.callbackButton('➕Buy supermarket vip', '➕Buy supermarket vip')

                                        ], {columns: 2})))


                                })
                        })
                })
        })
})
//my shops&&shops
bot.hears('💵Income',ctx => {
    var ide = ctx.from.id
    var sql = "SELECT SUM(grocerymine+bookshopmine+bakerymine+butchermine+supermarketmine+jewellarymine)  from `account` where `id` = '" + ide + "'";
    con.query(sql, function (error, response, fields) {
        var sm=JSON.parse(JSON.stringify(response[0]).replace('SUM(grocerymine+bookshopmine+bakerymine+butchermine+supermarketmine+jewellarymine)', 'sum'))
        var ide = ctx.from.id
        var sql = "SELECT grocery,bookshop,bakery,butcher,supermarket,jewellary,grocerymine,bookshopmine,bakerymine,butchermine,supermarketmine,jewellarymine from `account` where `id` = '" + ide + "'";
        con.query(sql, function (error, results, fields) {

            ctx.replyWithHTML('<b>💵Income</b>\n\n<i>The shops you have purchased reside here.They produce 💵 income,which you need to collect and exchange for 💰 at the exchange section .\nBelow you can see the income that your shops have produced and collect them for exchange</i>' + '\n\n🏡<b>grocery</b>\n🔸Number: ' + results[0].grocery + '\n🔸income: ' + results[0].grocerymine + '💵' + '\n\n🏘<b>Bookshop</b>\n🔸Number: ' + results[0].bookshop + '\n🔸Produced: ' + results[0].bookshopmine + '💵' + '\n\n🏚<b>Bakery</b>\n🔸Number: ' + results[0].bakery + '\n🔸Produced: ' + results[0].bakerymine + '💵' + '\n\n🏫<b>Butcher</b>\n🔸Number: ' + results[0].butcher + '\n🔸Produced: ' + results[0].butchermine + '💵' + '\n\n🏢<b>supermarket</b>\n🔸Number: ' + results[0].supermarket + '\n🔸Produced: ' + results[0].supermarketmine + '💵' + '\n\n🏬<b>jewellary</b>\n🔸Number: ' + results[0].jewellary + '\n🔸Produced: ' + results[0].jewellarymine + '💵' + '\n\n<b>Total:</b> '+sm.sum+' 💵',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('💵Collect income', '💵Collect income'),
                    m.callbackButton('⚡️Vip', '⚡️Vip'),
                ], { columns: 1 }))).then(()=> {
                ctx.reply('click 🏠Menu to go back to main menu', Markup
                    .keyboard([
                        ['🏠Menu'], // Row1 with 2 buttons
                    ])

                    .resize()
                    .extra())

            })
        })
    })
})
//Balance
bot.hears('💸Balance',ctx => {
    var id = ctx.from.id
    var sql = "SELECT balance,payout,income,time,firstname,payoutpoints from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        var payout=results[0].payout
        var btc = payout/1000000/160
        var btcAmount, currency, rates;

        rates = require('bitcoin-exchange-rates');

        btcAmount = btc.toFixed(8);

        currency = 'USD';
        rates.fromBTC(btcAmount, currency, function (err, rate) {
            ctx.replyWithHTML('<b>user: </b>' + results[0].firstname + '\n<b>Purchase balance: </b>' + results[0].balance + ' 💰\n<b>Withdraw balance: </b>' + results[0].payout + ' 💰(' + btcAmount + ' LTC)' + '<i>\n📊 ' + btcAmount + ' LTC =$ ' + rate + '</i>\n\n<b>income in Bank:</b> ' + results[0].income + '💵\n<b>Payout points: </b>'+results[0].payoutpoints+' ⚡️\n\n<b>Account creation:</b> ' + results[0].time, Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('💳Add LTC', '💳Add LTC'),
                    m.callbackButton('🔰Withdraw', '🔰Withdraw')
                ], {columns: 1})))

        })
    })

//transactions
    var user = ctx.from.id
    var sql = "SELECT depoaddre,txid,ref,id,adid from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, res, fields) {
        if (res[0].depoaddre!==null) {
            client.getAccount(btc, function (err, account) {
                account.getAddress(res[0].adid, function (err, address) {
                    address.getTransactions({}, function (err, txs) {
                        if (txs.length === 0) {
                            console.log('no transactions today')
                        } else if (txs[0].id == res[0].txid) {
                            console.log('transaction already confirmed')
                        } else if (txs[0].id !== res[0].txid) {
                            var txid = txs[0].id
                            var balance = Math.round(txs[0].amount.amount * 1000000)
                            var transactions = txs[0].amount.amount
                            var chatid = ctx.from.id
                            var sqli = "update `account` set `txid` = '" + txid + "', balance = `balance`+" + balance + ", transactions = `transactions`+" + transactions + ", payoutpoints = `payoutpoints`+" + balance + " where `id` = '" + chatid + "'";
                            con.query(sqli, function (err, response) {
                                console.log(err)
                                var ref = res[0].ref
                                var refbonus = Math.round(balance * 0.30)
                                var sqla = "update `account` set `payout` = `payout`+" + refbonus + ", `payoutpoints` = `payoutpoints`+'" + refbonus + "' where `id` = '" + ref + "'";
                                con.query(sqla)
                                ctx.telegram.sendMessage(res[0].id, 'we have received your deposit of ' + transactions + ' you gain ' + balance + '💰 added to your balance and '+balance+' ⚡️ ')
                                ctx.telegram.sendMessage(ref, 'you refferal just deposited. ' + refbonus + '💰 has been added to your payout balance '+refbonus+' ⚡️ payout points')
                                ctx.telegram.sendMessage('@bitcoinshoppays', 'new deposit of ' + transactions + ' LTC by ' + ctx.from.first_name + '\n\nhttps://live.blockcypher.com/ltc/address/' + res[0].depoaddre)
                            })
                        }
                    })
                })
            })
        }
    })
})

//add btc
bot.action('💳Add LTC',ctx=>{
    var user=ctx.from.id
    var sql = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].depoaddre== null) {
            client.getAccount(btc, function (err, account) {
                account.createAddress(null, function (err, address) {
                    var adress = address.address
                    ctx.replyWithHTML('<b>⚡Top up balance</b>\n\nYou can buy game currency for purchasing shops and (💰) using LTC. To top up your balance, simply send<b> any amount</b> of LTC to this address\n\n<code>' + adress + '</code>\n\nThe LTC will be automatically credited to the balance at the rate of\n' + '<b>0.1 LTC = 100,000 💰</b>\n' + '<b>0.01 LTC = 10,000 💰</b>\n' + '<b>0.001 LTC = 1,000 💰</b>\n' + '<b>0.0001 LTC = 100 💰 </b>etc.')
                    var ide =ctx.from.id
                    var sqli = "update `account` set `depoaddre` = '" + adress +"',adid='" +address.id+"' where `id` = '" + ide + "'";
                    con.query(sqli, function (err, results) {
                        console.log(err)
                        ctx.replyWithHTML('<code>' + adress + '</code>')
                    })
                });
            });

        } else {
            var user = ctx.from.id
            var sqla = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
            con.query(sqla, function (error, results, fields) {
                ctx.replyWithHTML('<b>⚡Top up balance</b>\n\nYou can buy game currency for purchasing shops and (💰) using LTC. To top up your balance, simply send<b> any amount</b> of LTC to this address\n\n<code>' + results[0].depoaddre + '</code>\n\nThe LTC will be automatically credited to the balance at the rate of\n' + '<b>0.1 LTC = 100,000 💰</b>\n' + '<b>0.01 LTC = 10,000 💰</b>\n' + '<b>0.001 LTC = 1,000 💰</b>\n' + '<b>0.0001 LTC = 100 💰 etc.</b>')
                    .then(() => {
                        ctx.replyWithHTML('<code>' + results[0].depoaddre + '</code>')

                    })
            })
        }
    })


})

//myshops
bot.action('🏫My shops',ctx=> {
    var ide = ctx.from.id
    var sql = "SELECT SUM(grocerymine+bookshopmine+bakerymine+butchermine+supermarketmine+jewellarymine)  from `account` where `id` = '" + ide + "'";
    con.query(sql, function (error, response, fields) {
        var sm = JSON.parse(JSON.stringify(response[0]).replace('SUM(grocerymine+bookshopmine+bakerymine+butchermine+supermarketmine+jewellarymine)', 'sum'))
        var ide = ctx.from.id
        var sql = "SELECT grocery,bookshop,bakery,butcher,supermarket,jewellary,grocerymine,bookshopmine,bakerymine,butchermine,supermarketmine,jewellarymine from `account` where `id` = '" + ide + "'";
        con.query(sql, function (error, results, fields) {

            ctx.replyWithHTML('<b>💵Income</b>\n\n<i>The shops you have purchased reside here.They produce 💵 income,which you need to collect and exchange for 💰 at the exchange section .\nBelow you can see the income that your shops have produced and collect them for exchange</i>' + '\n\n🏡<b>grocery</b>\n🔸Number: ' + results[0].grocery + '\n🔸income: ' + results[0].grocerymine + '💵' + '\n\n🏘<b>Bookshop</b>\n🔸Number: ' + results[0].bookshop + '\n🔸Produced: ' + results[0].bookshopmine + '💵' + '\n\n🏚<b>Bakery</b>\n🔸Number: ' + results[0].bakery + '\n🔸Produced: ' + results[0].bakerymine + '💵' + '\n\n🏫<b>Butcher</b>\n🔸Number: ' + results[0].butcher + '\n🔸Produced: ' + results[0].butchermine + '💵' + '\n\n🏢<b>supermarket</b>\n🔸Number: ' + results[0].supermarket + '\n🔸Produced: ' + results[0].supermarketmine + '💵' + '\n\n🏬<b>jewellary</b>\n🔸Number: ' + results[0].jewellary + '\n🔸Produced: ' + results[0].jewellarymine + '💵' + '\n\n<b>Total:</b> ' + sm.sum + ' 💵', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('💵Collect income', '💵Collect income'),
                    m.callbackButton('⚡️Vip', '⚡️Vip'),
                ], {columns: 1}))).then(() => {
                ctx.reply('click 🏠Menu to go back to main menu', Markup
                    .keyboard([
                        ['🏠Menu'], // Row1 with 2 buttons
                    ])

                    .resize()
                    .extra())
            })
        })
    })
})







//vip
bot.action('⚡️Vip',ctx=>{
    var ide = ctx.from.id
    var sql = "SELECT SUM(groceryvipmine+bookshopvipmine+bakeryvipmine+supermarketvipmine)  from `account` where `id` = '" + ide + "'";
    con.query(sql, function (error, response, fields) {
        var sm = JSON.parse(JSON.stringify(response[0]).replace('SUM(groceryvipmine+bookshopvipmine+bakeryvipmine+supermarketvipmine)', 'sum'))
        var ide = ctx.from.id
        var sql = "SELECT groceryvip,bookshopvip,bakeryvip,supermarketvip,groceryvipmine,bookshopvipmine,bakeryvipmine,supermarketvipmine from `account` where `id` = '" + ide + "'";
        con.query(sql, function (error, results, fields) {

            ctx.replyWithHTML('<b>⚡️Vip shops</b>\n\n<i>The ⚡️Vip shops you have purchased reside here.They produce ⚡️ points,which you need to collect  .\nBelow you can see the ⚡️ that your shops have produced and collect them </i>' + '\n\n🏡<b>groceryvip</b>\n🔸Number: ' + results[0].groceryvip + '\n🔸income: ' + results[0].groceryvipmine + '⚡️' + '\n\n🏘<b>Bookshopvip</b>\n🔸Number: ' + results[0].bookshopvip + '\n🔸Produced: ' + results[0].bookshopvipmine + '⚡️' + '\n\n🏚<b>Bakeryvip</b>\n🔸Number: ' + results[0].bakeryvip + '\n🔸Produced: ' + results[0].bakeryvipmine + '⚡️'   + '\n\n🏢<b>supermarketvip</b>\n🔸Number: ' + results[0].supermarketvip + '\n🔸Produced: ' + results[0].supermarketvipmine + '⚡️' + '\n\n<b>Total:</b> ' + sm.sum + ' ⚡️', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('⚡Collect points', '⚡Collect points')
                ], {columns: 1})))


        })
    })
})

//buy shops
bot.action('➕Buy Grocery',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=30){
            var amount=30 ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `grocery` = `grocery`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>grocery</b> has been purchased,now you need to collect income produced by your shop.You can buy as many different or identical shops as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })


})

//bookshop
bot.action('➕Buy Bookshop',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=200){
            var amount=200;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `bookshop` = `bookshop`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>bookshop</b> has been purchased,now you need to collect income produced by the shop.You can buy as many different or identical shops as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//bakery
bot.action('➕Buy Bakery',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=1500){
            var amount=1500;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `bakery` = `bakery`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>bakery</b> has been purchased,now you need to collect income produced by the shop.You can buy as many different or identical shops as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//butcher
bot.action('➕Buy Butcher',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=5000 ){
            var amount=5000 ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `butcher` = `butcher`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>butcher</b> has been purchased,now you need to collect income produced by the shop.You can buy as many different or identical shops as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//supermarket
bot.action('➕Buy Supermarket',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=25000 ){
            var amount=25000 ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `supermarket` = `supermarket`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>supermarket</b> has been purchased,now you need to collect income produced by the shop.You can buy as many different or identical shops as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//jewellary
bot.action('➕Buy Jewellery',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=100000){
            var amount=100000;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `jewellary` = `jewellary`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>jewellary</b> has been purchased,now you need to collect income produced by the shop.You can buy as many different or identical shops as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
//buyvip
//grocery vip
bot.action('➕Buy Grocery vip',ctx => {
    var user = ctx.from.id
    var sql = "SELECT `balance`,`payoutpoints` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {
        if (results[0].balance>=1000&&results[0].payoutpoints>=550){
            var amount=1000;
            var chick=1;
            var points=550;
            var started=1;
            var chatid=ctx.from.id
            var sqli = "update `account` set `balance` =`balance`- '" + amount + "', payoutpoints = `payoutpoints`-" + points + ", groceryvip = `groceryvip`+" + chick + ", grocerystart =" + started + " where `id` = '" + chatid + "'";
con.query(sqli,function (err,result) {
    ctx.replyWithHTML('<b>✅Success</b>\n\n<b>grocery vip </b> <i>has been purchased,now all you need is to collect points made by the vip shop</i>\n<b>note:</b><i>grocery vip works only for 95 days</i>')

})


        }else if (results[0].balance<1000){
            ctx.answerCbQuery('Your balance is not enough')
        } else if (results[0].payoutpoints<550){
            ctx.answerCbQuery('your points are not enough')
        } else {
            ctx.replyWithHTML('<i>your points and balance are not enough</i>')
        }

    })
})
//bookshopvip
bot.action('➕Buy Bookshop vip',ctx => {
    var user = ctx.from.id
    var sql = "SELECT `balance`,`payoutpoints` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {
        if (results[0].balance>=1200&&results[0].payoutpoints>=1200){
            var amount=1200;
            var chick=1;
            var points=1200;
            var started=1;
            var chatid=ctx.from.id
            var sqli = "update `account` set `balance` =`balance`- '" + amount + "', payoutpoints = `payoutpoints`-" + points + ", bookshopvip = `bookshopvip`+" + chick + ", bookshopstart =" + started + " where `id` = '" + chatid + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>✅Success</b>\n\n<b>bookshop vip </b> <i>has been purchased,now all you need is to collect points made by the vip shop</i>\n<b>note:</b><i>bookshop vip works only for 150 days</i>')

            })


        }else if (results[0].balance<1200){
            ctx.answerCbQuery('Your balance is not enough')
        } else if (results[0].payoutpoints<1200){
            ctx.answerCbQuery('your points are not enough')
        } else {
            ctx.replyWithHTML('<i>your points and balance are not enough</i>')
        }

    })
})

//bakeryvip
bot.action('➕Buy Bakery vip',ctx => {
    var user = ctx.from.id
    var sql = "SELECT `balance`,`payoutpoints` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {
        if (results[0].balance>=2800&&results[0].payoutpoints>=2800){
            var amount=2800;
            var chick=1;
            var points=2800;
            var started=1;
            var chatid=ctx.from.id
            var sqli = "update `account` set `balance` =`balance`- '" + amount + "', payoutpoints = `payoutpoints`-" + points + ", bakeryvip = `bakeryvip`+" + chick + ", bakerystart =" + started + " where `id` = '" + chatid + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>✅Success</b>\n\n<b>bakery vip </b> <i>has been purchased,now all you need is to collect points made by the vip shop</i>\n<b>note:</b><i>bakery vip works only for 150 days</i>')

            })


        }else if (results[0].balance<2800){
            ctx.answerCbQuery('Your balance is not enough')
        } else if (results[0].payoutpoints<2800){
            ctx.answerCbQuery('your points are not enough')
        } else {
            ctx.replyWithHTML('<i>your points and balance are not enough</i>')
        }

    })
})
//supermarketvip
bot.action('➕Buy supermarket vip',ctx => {
    var user = ctx.from.id
    var sql = "SELECT `balance`,`payoutpoints` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {
        if (results[0].balance>=5000&&results[0].payoutpoints>=10000){
            var amount=5000;
            var chick=1;
            var points=10000;
            var started=1;
            var chatid=ctx.from.id
            var sqli = "update `account` set `balance` =`balance`- '" + amount + "', payoutpoints = `payoutpoints`-" + points + ", supermarketvip = `supermarketvip`+" + chick + ", supermarketstart =" + started + " where `id` = '" + chatid + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>✅Success</b>\n\n<b>supermarket vip </b> <i>has been purchased,now all you need is to collect points made by the vip shop</i>\n<b>note:</b><i>supermarket vip works only for 95 days</i>')

            })


        }else if (results[0].balance<5000){
            ctx.answerCbQuery('Your balance is not enough')
        } else if (results[0].payoutpoints<10000){
            ctx.answerCbQuery('your points are not enough')
        } else {
            ctx.replyWithHTML('<i>your points and balance are not enough</i>')
        }

    })
})
//collect income
bot.action('💵Collect income',ctx=>{
    var ide = ctx.from.id
    var sql = "SELECT SUM(grocerymine+bookshopmine+bakerymine+butchermine+supermarketmine+jewellarymine)  from `account` where `id` = '" + ide + "'";
    con.query(sql, function (error, response, fields) {

        var sm = JSON.parse(JSON.stringify(response[0]).replace('SUM(grocerymine+bookshopmine+bakerymine+butchermine+supermarketmine+jewellarymine)', 'suma'))
        var eggs = sm.suma
        con.query("update `account` set `income` = `income`+'" + eggs + "' where `id` = '" + ide + "'",
            function (err, results) {
                var b=0;
                var sqli = "update `account` set `grocerymine` = '" + b + "', bookshopmine = " + b + ", bakerymine = " + b + ", butchermine = " + b + ", supermarketmine = " + b + ", jewellarymine = " + b + " where `id` = '" + ide + "'";
                con.query(sqli,function(err,response) {
                    ctx.reply('you collected: '+eggs+' 💵')
                })
            })
    })
})
//collect points
bot.action('⚡Collect points',ctx=>{
    var ide = ctx.from.id
    var sql = "SELECT SUM(groceryvipmine+bookshopvipmine+bakeryvipmine+supermarketvipmine)  from `account` where `id` = '" + ide + "'";
    con.query(sql, function (error, response, fields) {

        var sm = JSON.parse(JSON.stringify(response[0]).replace('SUM(groceryvipmine+bookshopvipmine+bakeryvipmine+supermarketvipmine)', 'suma'))
        var eggs = sm.suma
        con.query("update `account` set `payoutpoints` = `payoutpoints`+'" + eggs + "' where `id` = '" + ide + "'",
            function (err, results) {
                var b=0;
                var sqli = "update `account` set `groceryvipmine` = '" + b + "', bookshopvipmine = " + b + ", bakeryvipmine = " + b + ", supermarketvipmine = " + b  + " where `id` = '" + ide + "'";
                con.query(sqli,function(err,response) {
                    ctx.reply('you collected: '+eggs+' ⚡️')
                })
            })
    })
})
///exchange
bot.hears('⚖️Exchange',ctx => {
    var id = ctx.from.id
    var sql = "SELECT income from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        ctx.replyWithHTML('<b>⚖️Exchange</b>\n\n' + 'Here you can exchange income produced by your shops and for 💰 which you can use to buy new shops or withdraw to your BTC wallet\n\nexchange rate\n<b>100💵=1💰</b> ' + '\n\nincome in storehouse: ' + results[0].income + '💵' + '\n\n<i>After conversion,70% of obtained 💰 will be added to purchase balance and the remaining 30% to withdraw balance.\n The minimum required for conversion is 300💵</i>', Extra
            .HTML()
            .markup((m) => m.inlineKeyboard([
                m.callbackButton('Exchange 💵 and get 💰', 'Exchange 💵 and get 💰')
            ], {columns: 1}))).then(() => {
            ctx.reply('click 🏠Menu to go back to main menu', Markup
                .keyboard([
                    ['🏠Menu'], // Row1 with 2 buttons
                ])

                .resize()
                .extra())

        })
    })
})
//exchange for cash
bot.action('Exchange 💵 and get 💰',ctx=>{
    var id = ctx.from.id
    var sql = "SELECT income from `account` where `id` = '" + id + "'";
    con.query(sql,function (err,result) {
        if (result[0].income>=300) {
            var id = ctx.from.id
            var balanc =result[0].income  * 0.7
            var payou = result[0].income - balanc
            var balancee=balanc/100
            var payoute=payou/100
            var payout=Math.round(payoute)
            var balance=Math.round(balancee)

            var eggs = 0;
            var sqli = "update `account` set `balance` = `balance`+'" + balance+"', payout = `payout`+" +
                payout + ", income = " + eggs + " where `id` = '" + id + "'";
            con.query(sqli, function (err, response) {
                console.log(err)
                ctx.replyWithHTML('<b>💫Success</b>\n\nyou have sold: <b>' + result[0].income + '</b>💵\n\nReceived:\n <b>' + balance + '</b>💰 towards purchase balance\n<b>' + payout + '</b>💰 towards payout balance')
            })


        }else {
            ctx.replyWithHTML('<b>The minimum required for conversion is 300💵 and you have '+result[0].income+'</b>')

        }
    })
})

//chat
bot.hears('💬Chat',ctx => {
   ctx.replyWithHTML('join our chat group and get a bonus of 100💰 and 10⚡',Extra
       .HTML()
       .markup((m) => m.inlineKeyboard([
           m.urlButton('💭join chat','https://t.me/Bitcoinshopchat')
       ], {columns: 1})))




})
//group bonus
bot.on('new_chat_members',ctx => {

    var id=ctx.message.new_chat_members[0].id
    var sql = "SELECT tele,id from `account` where `id` = '" + id + "'";
    con.query(sql,function (err,result) {

        if (result[0].tele == "none") {
            var id=ctx.message.new_chat_members[0].id
            ctx.telegram.sendMessage(id, 'you already received your award')

        } else {


            var id = ctx.message.new_chat_members[0].id
            var balance = 100;
            var points = 10;
            var tele = 'none'
            var sql = "update `account` set `balance` = `balance`+'" + balance + "', payoutpoints = `payoutpoints`+" + points + ", `tele` = '" + tele + "' where `id` = '" + id + "'";
            con.query(sql, function (error, results) {
                console.log(error)
                var sqli = "SELECT id from `account` where `id` = '" + id + "'";
                con.query(sqli, function (err, re) {
                    ctx.telegram.sendMessage(re[0].id, 'you receive 100💰 and 10⚡ for joining our chat.')

                })
            })
        }
    })

})
//






//statstistics
bot.hears('📈Stastistics',ctx => {
    con.query('SELECT `id` FROM `account`', function (error, result) {
        con.query('SELECT SUM(transactions)FROM account;', function (err, response) {
            const re = JSON.parse(JSON.stringify(response[0]).replace('SUM(transactions)', 'suma'))
            con.query('SELECT `started` FROM `account` WHERE `id`=411002680', function (err, respa) {
                ctx.replyWithHTML('<b>📈Stastistics</b>\n\n📈Days online: ' + respa[0].started + '\n👨🏻‍️Members: ' + result.length + '\n💰Total transacted: ' + re.suma + ' LTC',Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.urlButton('💸payouts','https://t.me/bitcoinshoppays'),
                        m.urlButton('🗞news','https://t.me/bitcoinshopnews')
                    ], {columns: 1})))
            })
        })
    })
})
//bonus
bot.hears('🎁Bonus',ctx => {
    var id=ctx.from.id
    var bonus= rn(options)
    var dat=new Date().getDate()
    var sql = "SELECT bonus from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].bonus==dat) {
            ctx.reply('⛔️ You already collected your daily bonus.\nNext bonus will be available in 24hours')
        }else {
            var points=1;
            var sqli = "update `account` set `balance` = `balance`+'" + bonus + "', payoutpoints =`payoutpoints` +" + points + ", bonus = " + dat + " where `id` = '" + id + "'";
            con.query(sqli)
            ctx.replyWithHTML('Your account has been credited with:\n\n<b>Daily bonus: +</b>'+bonus+'💰\n<b>points: </b>'+points+' ⚡️\n\n<i>next bonus will be available after 24hrs</i>')
        }
    })


})













//cron work
//grocery
cron.schedule('*/59 * * * *', () => {
    var production=30;
    var bal=1;
    con.query("update `account` set `grocerymine` =`grocerymine`+`grocery`* '" + production + "' where `grocery` >= '" + bal + "'")

})
//bokshop
cron.schedule('*/59 * * * *', () => {
    var production=220;
    var bal=1;
    con.query("update `account` set `bookshopmine` =`bookshopmine`+`bookshop`* '" + production + "' where `bookshop` >= '" + bal + "'")

})
//butcher
cron.schedule('*/59 * * * *', () => {
    var production=7000;
    var bal=1;
    con.query("update `account` set `butchermine` =`butchermine`+`butcher`* '" + production + "' where `butcher` >= '" + bal + "'")

})

//supermarket
cron.schedule('*/59 * * * *', () => {
    var production=37000;
    var bal=1;
    con.query("update `account` set `supermarketmine` =`supermarketmine`+`supermarket`* '" + production + "' where `supermarket` >= '" + bal + "'")

})
//bakery
cron.schedule('*/59 * * * *', () => {
    var production=1800;
    var bal=1;
    con.query("update `account` set `bakerymine` =`bakerymine`+`bakery`* '" + production + "' where `bakery` >= '" + bal + "'")

})
//jewellary
cron.schedule('*/59 * * * *', () => {
    var production=150000 ;
    var bal=1;
    con.query("update `account` set `jewellarymine` =`jewellarymine`+`jewellary`* '" + production + "' where `jewellary` >= '" + bal + "'")

})
//online
cron.schedule('*/1 * * * * *', () => {
    var id=411002680;
    var idle=1;
    con.query("update `account` set `idle` = '" + idle + "' where `id` = '" + id + "'")

})
//days on
cron.schedule('0 0 0 * * *', () => {
    con.query('update account set `started`=`started`+1 WHERE `id`=411002680')

})
//vip
//grocery vip
cron.schedule('0 0 0 * * *', () => {
    var production=7;
    var bal=1;
    con.query("update `account` set `groceryvipmine` =`groceryvipmine`+`groceryvip`* '" + production + "' where `groceryvip` >= '" + bal + "'")

})
//bookshopvip
cron.schedule('0 0 0 * * *', () => {
    var production=10;
    var bal=1;
    con.query("update `account` set `bookshopvipmine` =`bookshopvipmine`+`bookshopvip`* '" + production + "' where `bookshopvip` >= '" + bal + "'")

})
//bakeryvip
cron.schedule('0 0 0 * * *', () => {
    var production=25;
    var bal=1;
    con.query("update `account` set `bakeryvipmine` =`bakeryvipmine`+`bakeryvip`* '" + production + "' where `bakeryvip` >= '" + bal + "'")

})
//supermarketvip
cron.schedule('0 0 0 * * *', () => {
    var production=128;
    var bal=1;
    con.query("update `account` set `supermarketvipmine` =`supermarketvipmine`+`supermarketvip`* '" + production + "' where `supermarketvip` >= '" + bal + "'")

})
//expire
//grocery vip
cron.schedule('0 0 0 * * *', () => {
    var production=0;
    var bal=95;

    con.query("update `account` set `groceryvip` =" + production + ", `grocerystart` ='" + production + "' where `grocerystart` > '" + bal + "'")

})
//bookshopvip
cron.schedule('0 0 0 * * *', () => {
    var production=0;
    var bal=150;
    con.query("update `account` set `bookshopvip` =" + production + ", `bookshopstart` ='" + production + "' where `bookshopstart` > '" + bal + "'")


})
//bakeryvip
cron.schedule('0 0 0 * * *', () => {
    var production=0;
    var bal=150;
    con.query("update `account` set `bakeryvip` =" + production + ", `bakerystart` ='" + production + "' where `bakerystart` > '" + bal + "'")


})
//supermarketvip
cron.schedule('0 0 0 * * *', () => {
    var production=0;
    var bal=95;
    con.query("update `account` set `supermarketvip` =" + production + ", `supermarketstart` ='" + production + "' where `supermarketstart` > '" + bal + "'")


})

//days working
//grocery vip
cron.schedule('0 0 0 * * *', () => {
    var production=1;
    var bal=1;
    con.query("update `account` set `grocerystart` =`grocerystart`+ '" + production + "' where `groceryvip` >= '" + bal + "'")

})
//bakery
cron.schedule('0 0 0 * * *', () => {
    var production=1;
    var bal=1;
    con.query("update `account` set `bakerystart` =`bakerystart`+ '" + production + "' where `bakeryvip` >= '" + bal + "'")
})
//bookshop
cron.schedule('0 0 0 * * *', () => {
    var production=1;
    var bal=1;
    con.query("update `account` set `bookshopstart` =`bookshopstart`+ '" + production + "' where `bookshopvip` >= '" + bal + "'")
})
//supermarketvip
cron.schedule('0 0 0 * * *', () => {
    var production=1;
    var bal=1;
    con.query("update `account` set `supermarketstart` =`supermarketstart`+ '" + production + "' where `supermarketvip` >= '" + bal + "'")
})



//settings
bot.hears('⚙️Settings',ctx => {
    var user=ctx.from.id
    var sql = "SELECT `withdrawadd` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        ctx.replyWithHTML('<b>settings</b>\n\nHere you can change your withdraw address\n\ncurrent withdraw address: <b>' + results[0].withdrawadd + '</b>\n\n<i>Withdraw address need to be set when requesting payouts</i>', Markup
            .keyboard([
                ['🔑set withdraw address'],
                ['🏠Menu'] // Row1 with 2 buttons
            ])

            .resize()
            .extra())
    })

})
//casino
bot.hears('🎴Casino',ctx => {
    ctx.replyWithHTML('<b>casino games to boost your bonus</b>')
        .then(() => {
            ctx.replyWithHTML('<b>🃏️lucky card</b> choose a lucky card and win 💰️\n<b>⚪️lucky number</b> choose a number and win ⚡️ ', Markup
                .keyboard([
                    ['🃏️lucky card', '⚪️lucky number'], // Row1 with 2 buttons
                    ['🏠Menu']
                ])


                .resize()
                .extra())
        })
})

//lucky card
bot.hears('🃏️lucky card',ctx => {
    ctx.replyWithHTML('<b>choose a card and win 💰</b>\n\neach bet costs 10💰 and if you win you get 20💰\nif you loose,you loose 10💰')
        .then(()=>{
            ctx.replyWithHTML('<b>choose any card</b>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('♦', '♦'),
                    m.callbackButton('♥', '♥'),
                    m.callbackButton('♣', '♣'),
                    m.callbackButton('♠', '♠')

                ], {columns: 2})))



        })




})

//diamond
bot.action('♦',ctx=> {
    var user = ctx.from.id
    var item = randomItem(['♦', '♥', '♠', '♣'])
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {

        if (results[0].balance < 10) {
            ctx.reply('your balance is not enough')

        } else if (item === '♦') {
            var production = 20;
            var id = ctx.from.id;
            con.query("update `account` set `balance` =`balance`+'" + production + "' where `id` = '" + id + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you win:20💰</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('♦', '♦'),
                        m.callbackButton('♥', '♥'),
                        m.callbackButton('♣', '♣'),
                        m.callbackButton('♠', '♠')

                    ], {columns: 2}))
                )
            })
        } else {
            var deduction = 10;
            var ide = ctx.from.id;
            con.query("update `account` set `balance` =`balance`-'" + deduction + "' where `id` = '" + ide + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you lose:10💰</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('♦', '♦'),
                        m.callbackButton('♥', '♥'),
                        m.callbackButton('♣', '♣'),
                        m.callbackButton('♠', '♠')

                    ], {columns: 2}))
                )
            })
        }
    })
})
//hearts
bot.action('♥',ctx=> {
    var user = ctx.from.id
    var item = randomItem(['♦', '♥', '♠', '♣'])
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {

        if (results[0].balance < 10) {
            ctx.reply('your balance is not enough')

        } else if (item === '♥') {
            var production = 20;
            var id = ctx.from.id;
            con.query("update `account` set `balance` =`balance`+'" + production + "' where `id` = '" + id + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you win:20💰</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('♦', '♦'),
                        m.callbackButton('♥', '♥'),
                        m.callbackButton('♣', '♣'),
                        m.callbackButton('♠', '♠')

                    ], {columns: 2}))
                )
            })
        } else {
            var deduction = 10;
            var ide = ctx.from.id;
            con.query("update `account` set `balance` =`balance`-'" + deduction + "' where `id` = '" + ide + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you lose:10💰</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('♦', '♦'),
                        m.callbackButton('♥', '♥'),
                        m.callbackButton('♣', '♣'),
                        m.callbackButton('♠', '♠')

                    ], {columns: 2}))
                )
            })
        }
    })
})
//flowers
bot.action('♣',ctx=> {
    var user = ctx.from.id
    var item = randomItem(['♦', '♥', '♠', '♣'])
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {

        if (results[0].balance < 10) {
            ctx.reply('your balance is not enough')

        } else if (item === '♣') {
            var production = 20;
            var id = ctx.from.id;
            con.query("update `account` set `balance` =`balance`+'" + production + "' where `id` = '" + id + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you win:20💰</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('♦', '♦'),
                        m.callbackButton('♥', '♥'),
                        m.callbackButton('♣', '♣'),
                        m.callbackButton('♠', '♠')

                    ], {columns: 2}))
                )
            })
        } else {
            var deduction = 10;
            var ide = ctx.from.id;
            con.query("update `account` set `balance` =`balance`-'" + deduction + "' where `id` = '" + ide + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you lose:10💰</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('♦', '♦'),
                        m.callbackButton('♥', '♥'),
                        m.callbackButton('♣', '♣'),
                        m.callbackButton('♠', '♠')

                    ], {columns: 2}))
                )
            })
        }
    })
})
//spades
bot.action('♠',ctx=> {
    var user = ctx.from.id
    var item = randomItem(['♦', '♥', '♠', '♣'])
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {

        if (results[0].balance < 10) {
            ctx.reply('your balance is not enough')

        } else if (item === '♠') {
            var production = 20;
            var id = ctx.from.id;
            con.query("update `account` set `balance` =`balance`+'" + production + "' where `id` = '" + id + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you win:20💰</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('♦', '♦'),
                        m.callbackButton('♥', '♥'),
                        m.callbackButton('♣', '♣'),
                        m.callbackButton('♠', '♠')

                    ], {columns: 2}))
                )
            })
        } else {
            var deduction = 10;
            var ide = ctx.from.id;
            con.query("update `account` set `balance` =`balance`-'" + deduction + "' where `id` = '" + ide + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you lose:10💰</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('♦', '♦'),
                        m.callbackButton('♥', '♥'),
                        m.callbackButton('♣', '♣'),
                        m.callbackButton('♠', '♠')

                    ], {columns: 2}))
                )
            })
        }
    })
})

//lucky number

bot.hears('⚪️lucky number',ctx => {
    ctx.replyWithHTML('<b>choose a number and win ⚡️</b>\n\neach bet costs 10⚡️ and if you win you get 20⚡️\nif you loose,you loose 10⚡️')
        .then(()=>{
            ctx.replyWithHTML('<b>choose any number</b>',Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('1', '1'),
                    m.callbackButton('2', '2'),
                    m.callbackButton('3', '3'),
                    m.callbackButton('4', '4'),
                    m.callbackButton('5', '5'),
                    m.callbackButton('6', '6')
                ], {columns: 3})))



        })




})

//numbergame
bot.action('1',ctx=> {
    var user = ctx.from.id
    var item = randomItem(['1', '2', '3', '4', '5', '6'])
    var sql = "SELECT `payoutpoints` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {

        if (results[0].payoutpoints < 10) {
            ctx.reply('your points are not enough')

        } else if (item === '1') {
            var production = 20;
            var id = ctx.from.id;
            con.query("update `account` set `payoutpoints` =`payoutpoints`+'" + production + "' where `id` = '" + id + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you win:20⚡️</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('1', '1'),
                        m.callbackButton('2', '2'),
                        m.callbackButton('3', '3'),
                        m.callbackButton('4', '4'),
                        m.callbackButton('5', '5'),
                        m.callbackButton('6', '6')

                    ], {columns: 3}))
                )
            })
        } else {
            var deduction = 10;
            var ide = ctx.from.id;
            con.query("update `account` set `payoutpoints` =`payoutpoints`-'" + deduction + "' where `id` = '" + ide + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you lose:10⚡️</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('1', '1'),
                        m.callbackButton('2', '2'),
                        m.callbackButton('3', '3'),
                        m.callbackButton('4', '4'),
                        m.callbackButton('5', '5'),
                        m.callbackButton('6', '6')

                    ], {columns: 3}))
                )
            })
        }
    })
})
//two
bot.action('2',ctx=> {
    var user = ctx.from.id
    var item = randomItem(['1', '2', '3', '4', '5', '6'])
    var sql = "SELECT `payoutpoints` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {

        if (results[0].payoutpoints < 10) {
            ctx.reply('your points are not enough')

        } else if (item === '2') {
            var production = 20;
            var id = ctx.from.id;
            con.query("update `account` set `payoutpoints` =`payoutpoints`+'" + production + "' where `id` = '" + id + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you win:20⚡️</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('1', '1'),
                        m.callbackButton('2', '2'),
                        m.callbackButton('3', '3'),
                        m.callbackButton('4', '4'),
                        m.callbackButton('5', '5'),
                        m.callbackButton('6', '6')

                    ], {columns: 3}))
                )
            })
        } else {
            var deduction = 10;
            var ide = ctx.from.id;
            con.query("update `account` set `payoutpoints` =`payoutpoints`-'" + deduction + "' where `id` = '" + ide + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you lose:10⚡️</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('1', '1'),
                        m.callbackButton('2', '2'),
                        m.callbackButton('3', '3'),
                        m.callbackButton('4', '4'),
                        m.callbackButton('5', '5'),
                        m.callbackButton('6', '6')

                    ], {columns: 3}))
                )
            })
        }
    })
})
//three
bot.action('3',ctx=> {
    var user = ctx.from.id
    var item = randomItem(['1', '2', '3', '4', '5', '6'])
    var sql = "SELECT `payoutpoints` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {

        if (results[0].payoutpoints < 10) {
            ctx.reply('your points are not enough')

        } else if (item === '3') {
            var production = 20;
            var id = ctx.from.id;
            con.query("update `account` set `payoutpoints` =`payoutpoints`+'" + production + "' where `id` = '" + id + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you win:20⚡️</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('1', '1'),
                        m.callbackButton('2', '2'),
                        m.callbackButton('3', '3'),
                        m.callbackButton('4', '4'),
                        m.callbackButton('5', '5'),
                        m.callbackButton('6', '6')

                    ], {columns: 3}))
                )
            })
        } else {
            var deduction = 10;
            var ide = ctx.from.id;
            con.query("update `account` set `payoutpoints` =`payoutpoints`-'" + deduction + "' where `id` = '" + ide + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you lose:10⚡️</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('1', '1'),
                        m.callbackButton('2', '2'),
                        m.callbackButton('3', '3'),
                        m.callbackButton('4', '4'),
                        m.callbackButton('5', '5'),
                        m.callbackButton('6', '6')

                    ], {columns: 3}))
                )
            })
        }
    })
})
//four
bot.action('4',ctx=> {
    var user = ctx.from.id
    var item = randomItem(['1', '2', '3', '4', '5', '6'])
    var sql = "SELECT `payoutpoints` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {

        if (results[0].payoutpoints < 10) {
            ctx.reply('your points are not enough')

        } else if (item === '4') {
            var production = 20;
            var id = ctx.from.id;
            con.query("update `account` set `payoutpoints` =`payoutpoints`+'" + production + "' where `id` = '" + id + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you win:20⚡️</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('1', '1'),
                        m.callbackButton('2', '2'),
                        m.callbackButton('3', '3'),
                        m.callbackButton('4', '4'),
                        m.callbackButton('5', '5'),
                        m.callbackButton('6', '6')

                    ], {columns: 3}))
                )
            })
        } else {
            var deduction = 10;
            var ide = ctx.from.id;
            con.query("update `account` set `payoutpoints` =`payoutpoints`-'" + deduction + "' where `id` = '" + ide + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you lose:10⚡️</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('1', '1'),
                        m.callbackButton('2', '2'),
                        m.callbackButton('3', '3'),
                        m.callbackButton('4', '4'),
                        m.callbackButton('5', '5'),
                        m.callbackButton('6', '6')

                    ], {columns: 3}))
                )
            })
        }
    })
})

//five
bot.action('5',ctx=> {
    var user = ctx.from.id
    var item = randomItem(['1', '2', '3', '4', '5', '6'])
    var sql = "SELECT `payoutpoints` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {

        if (results[0].payoutpoints < 10) {
            ctx.reply('your points are not enough')

        } else if (item === '5') {
            var production = 20;
            var id = ctx.from.id;
            con.query("update `account` set `payoutpoints` =`payoutpoints`+'" + production + "' where `id` = '" + id + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you win:20⚡️</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('1', '1'),
                        m.callbackButton('2', '2'),
                        m.callbackButton('3', '3'),
                        m.callbackButton('4', '4'),
                        m.callbackButton('5', '5'),
                        m.callbackButton('6', '6')

                    ], {columns: 3}))
                )
            })
        } else {
            var deduction = 10;
            var ide = ctx.from.id;
            con.query("update `account` set `payoutpoints` =`payoutpoints`-'" + deduction + "' where `id` = '" + ide + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you lose:10⚡️</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('1', '1'),
                        m.callbackButton('2', '2'),
                        m.callbackButton('3', '3'),
                        m.callbackButton('4', '4'),
                        m.callbackButton('5', '5'),
                        m.callbackButton('6', '6')

                    ], {columns: 3}))
                )
            })
        }
    })
})
//six
bot.action('6',ctx=> {
    var user = ctx.from.id
    var item = randomItem(['1', '2', '3', '4', '5', '6'])
    var sql = "SELECT `payoutpoints` from `account` where `id` = '" + user + "'";
    con.query(sql, function (error, results, fields) {

        if (results[0].payoutpoints < 10) {
            ctx.reply('your points are not enough')

        } else if (item === '6') {
            var production = 20;
            var id = ctx.from.id;
            con.query("update `account` set `payoutpoints` =`payoutpoints`+'" + production + "' where `id` = '" + id + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you win:20⚡️</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('1', '1'),
                        m.callbackButton('2', '2'),
                        m.callbackButton('3', '3'),
                        m.callbackButton('4', '4'),
                        m.callbackButton('5', '5'),
                        m.callbackButton('6', '6')

                    ], {columns: 3}))
                )
            })
        } else {
            var deduction = 10;
            var ide = ctx.from.id;
            con.query("update `account` set `payoutpoints` =`payoutpoints`-'" + deduction + "' where `id` = '" + ide + "'", function (err, results) {
                ctx.editMessageText('<b>you chose: </b>' + ctx.match + '\n<b>Results: </b>' + item + '\n\n<b>you lose:10⚡️</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('1', '1'),
                        m.callbackButton('2', '2'),
                        m.callbackButton('3', '3'),
                        m.callbackButton('4', '4'),
                        m.callbackButton('5', '5'),
                        m.callbackButton('6', '6')

                    ], {columns: 3}))
                )
            })
        }
    })
})






const adminscene = new Scene('admin')
adminscene.enter((ctx) =>{ctx.reply('sms all users', Extra.markup(Markup.forceReply()))
})
adminscene.on('message',ctx => {
    con.query('SELECT `id` from `account`', function (err, results) {
        results.forEach(function (res) {
            if (ctx.from.id == 411002680) {
                var id = res.id
                ctx.telegram.sendMessage(id, ctx.message.text)
                    .then(() => {
                        ctx.scene.leave()
                    })
            } else {
                ctx.reply('you are not an admin')
                then(() => {
                    ctx.scene.leave()
                })
            }
        })
    })
})
adminscene.leave((ctx) =>  ctx.reply('Main menu', Markup
    .keyboard([
        ['🏦Shops', '💵Income'], // Row1 with 2 buttons
        ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
        ['⚖️Exchange', '📈Stastistics'],
        ['⚙️Settings', '🎁Bonus'],
        ['💬Chat', '🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
    ])

    .resize()
    .extra())
)












//withdraw
const withdrawscene = new Scene('withdraw')
withdrawscene.enter((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT payout,withdrawadd,payoutpoints from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        if (results[0].withdrawadd == "none") {
            ctx.replyWithHTML('<b>withdraw address not set</b>\n\n<i>you can set your withdraw address in ⚙️Settings</i>')
            ctx.scene.leave()
        } else {
            var points=results[0].payoutpoints
            var btc =points/1000000
            var btcAmount, currency, rates;

            rates = require('bitcoin-exchange-rates');

            btcAmount = btc.toFixed(8);

            currency = 'USD';
            rates.fromBTC(btcAmount, currency, function (err, rate) {
                ctx.replyWithHTML('<b>🏵Withdraw funds</b>\n\nyour withdraw wallet: <b>' + results[0].withdrawadd + '</b>\n\nThe withdrawal of funds is made from the balance designated for payments at the rate of 0.001 BCH = 1,000 💰\n<b>Your balance ' + results[0].payout + '💰</b>\n\nTo convert your balance in order to receive payments to the BCH, you also need points ⚡️same as your withdraw balance.eg:to withdraw 1000💰 you need to have 1000 ⚡️\n\nYour point balance allows you to withdraw as follows:\n <b>' +results[0].payoutpoints+' ⚡️=' +btcAmount+' BCH</b> <i>( $'+ rate+' )</i>\n<a href="https://t.me/bitcoinshopnews/5">How to earn points</a> ')
                    .then(() => {
                        ctx.replyWithHTML('<i>Enter the number of 💰 you would like to withdraw to your LTC' +
                            ' Wallet (a minimum of 2000)</i>', Markup
                            .keyboard([
                                ['🛑cancel'], // Row1 with 2 buttons
                            ])

                            .resize()
                            .extra())

                    })
            })
        }
    })
})
withdrawscene.leave((ctx) =>  ctx.reply('Main menu', Markup
    .keyboard([
        ['🏦Shops', '💵Income'], // Row1 with 2 buttons
        ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
        ['⚖️Exchange', '📈Stastistics'],
        ['⚙️Settings', '🎁Bonus'],
        ['💬Chat', '🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
    ])

    .resize()
    .extra())
)
withdrawscene.hears('🛑cancel',(ctx => ctx.scene.leave()))
withdrawscene.on('message',ctx => {
    var id = ctx.from.id
    var sql = "SELECT payout,payoutpoints from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        if (isNaN(ctx.message.text)) {
            ctx.reply('please enter a valid amount')

        } else if (ctx.message.text < 2000) {
            ctx.replyWithHTML('The minimum required for withdraw is <b>2000💰</b>')
            ctx.scene.leave()
        } else if (ctx.message.text > results[0].payout) {
            ctx.reply('your balance is not enough for the requsted withdrawal')
            ctx.scene.leave()
        } else if (ctx.message.text > results[0].payoutpoints) {
            ctx.reply('your points are not enough for a withdraw')
            ctx.scene.leave()
        } else {
            var id = ctx.from.id
            var sql = "SELECT payout,withdrawadd from `account` where `id` = '" + id + "'";
            con.query(sql, function (error, results, fields) {
                var pay=ctx.message.text / 1000000
                var payout =pay.toFixed(8)
                var addre = results[0].withdrawadd
                client.getAccount(btc, function (err, account) {
                    account.sendMoney({
                        'to': addre,
                        'amount': payout,
                        'currency': 'BTC'
                    }, function (err, tx) {
                        ctx.telegram.sendMessage('@bitcoinshoppays', 'New withdrawal of ' + payout + ' LTC by ' + ctx.from.first_name + '\n\nhttps://live.blockcypher.com/ltc/address/' + results[0].withdrawadd)
                        var user = ctx.from.id
                        var amount = ctx.message.text
                        var sqla = "update `account` set `payout` =`payout`- '" + amount + "', `payoutpoints` =`payoutpoints`- " + amount + ", transactions =`transactions`+ " + payout + " where `id` = '" + user + "'";
                        var sqli = "update `account` set `payout` = `payout`-" + amount + " where `id` = '" + user + "'";
                        con.query(sqla)
                        ctx.replyWithHTML('Your withdrawal of ' + payout + ' LTC is being processed', Markup
                            .keyboard([
                                ['🏦Shops', '💵Income'], // Row1 with 2 buttons
                                ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                ['⚖️Exchange', '📈Stastistics'],
                                ['⚙️Settings', '🎁Bonus'],
                                ['💬Chat','🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
                            ])

                            .resize()
                            .extra())
                        ctx.scene.leave()
                    });
                });


            })
        }
    })
})
//withdrawaddress
const greeterScene = new Scene('greeter')
greeterScene.enter((ctx) => ctx.reply('send your LTC wallet address to be used for withdrawals below to update it',Markup
    .keyboard([
        ['🛑cancel'], // Row1 with 2 buttons
    ])

    .resize()
    .extra())



)
greeterScene.hears('🛑cancel',ctx=>{
    ctx.reply('cancelled', Markup
        .keyboard([
            ['🏦Shops', '💵Income'], // Row1 with 2 buttons
            ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['⚖️Exchange', '📈Stastistics'],
            ['⚙️Settings', '🎁Bonus'],
            ['💬Chat', '🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
        ])

        .resize()
        .extra())



    ctx.scene.leave()})
greeterScene.leave((ctx) =>  ctx.reply('Main menu', Markup
    .keyboard([
        ['🏦Shops', '💵Income'], // Row1 with 2 buttons
        ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
        ['⚖️Exchange', '📈Stastistics'],
        ['⚙️Settings', '🎁Bonus'],
        ['💬Chat', '🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
    ])

    .resize()
    .extra())
)
greeterScene.on('message', (ctx) => {
    var valid = WAValidator.validate(ctx.message.text, 'LTC');
    if (valid) {
        var ide = ctx.from.id
        var sqli = "update `account` set `withdrawadd` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli)
        ctx.replyWithHTML('<b>withdraw address updated</b>', Markup
            .keyboard([
                ['🏦Shops', '💵Income'], // Row1 with 2 buttons
                ['💸Balance', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['⚖️Exchange', '📈Stastistics'],
                ['⚙️Settings', '🎁Bonus'],
                ['💬Chat', '🎴Casino']// Row3 with 3 buttons Row3 with 3 buttons
            ])

            .resize()
            .extra())
        ctx.scene.leave()

    }else {
        ctx.reply('invalid LTC address', Markup
            .keyboard([
                ['🛑cancel']
            ])

            .resize()
            .extra())

    }
})






//scenes
const stage = new Stage([withdrawscene,greeterScene,adminscene], { ttl: 1800 })
bot.use(session())
bot.use(stage.middleware())
bot.action('🔰Withdraw',enter('withdraw'))
bot.hears('🔑set withdraw address', enter('greeter'))
bot.hears('Admin',enter('admin'))





bot.startPolling()
