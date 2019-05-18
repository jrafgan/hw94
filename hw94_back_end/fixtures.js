const mongoose = require('mongoose');
const config = require('./config');
const Album = require('./models/Album');
const Artist = require('./models/Artist');
const Track = require('./models/Track');
const User = require('./models/User');
const nanoid = require('nanoid');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [user2, user1, admin] = await User.create(
        {
            username: 'John',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'Alan',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'admin',
            password: '123',
            role: 'admin',
            token: nanoid()
        }
    );

    const [tsoi, cranberries, ennio] = await Artist.create(
        {
            name: 'В. Цой',
            description: '«Кино́» — одна из самых популярных советских рок-групп 1980-х годов. Лидером и автором практически всех текстов и музыки неизменно оставался Виктор Цой, после смерти которого коллектив, выпустивший в общей сложности за девять лет на студийных альбомах более ста песен, несколько сборников и концертных записей, а также большое количество неофициальных бутлегов, прекратил существование.',
            image: 'kino.jpg',
            published: true,
            user: user2._id
        },
        {
            name: 'Cranberries',
            description: 'The Cranberries — ирландская рок-группа, созданная в Лимерике в 1989 году, под названием The Cranberry Saw Us. The Cranberries выпустила семь студийных альбомов, два мини-альбома и двадцать два сингла.\n' +
                '\n' +
                'Дебютным альбомом The Cranberries стал Everybody Else Is Doing It, So Why Can’t We?, который был успешным и получил статусы (2× платиновый в Великобритании и 5× платиновый в США). Их следующий альбом No Need to Argue стал самым продаваемым студийным альбомом группы. Коллектив достиг 1 места в UK Albums Chart (Everybody Else Is Doing It, So Why Can’t We?) и 2 места в чарте Modern Rock Tracks («Zombie» и «Salvation»). Последний студийный альбом группы Something Else был выпущен 28 апреля 2017 года на лейбле BMG[1].',
            image: 'cranberries.jpg',
            published: true,
            user: user1._id
        },
        {
            name: 'Ennio Morricone',
            description: 'Э́ннио Моррико́не (итал. Ennio Morricone; род. 10 ноября 1928, Рим) — итальянский композитор, аранжировщик и дирижёр. В основном пишет музыку для кино и телевидения. Великий офицер ордена «За заслуги перед Итальянской Республикой». Обладатель двух премий «Оскар»: за выдающиеся заслуги в кинематографе (2007) и за лучшую музыку — к «Омерзительной восьмёрке» (2016), 9-кратный лауреат национальной кинопремии Италии «Давид ди Донателло» за лучшую музыку к фильму, трёхкратный лауреат премии «Золотой глобус», 6-кратный лауреат премии BAFTA и многих других.',
            image: 'ennio.jpg',
            published: true,
            user: admin._id
        },
    );

    const [tsoi_45, tsoi_gruppa, tsoi_zvezda, cranberries_no_argue, cranberries_bury, cranberries_in_the_end, ennio_good_bad, ennio_once_upon, ennio_fistful] = await Album.create(
        {
            title: '«45»',
            artist: tsoi._id,
            year: '1982',
            image: '45_kino.jpg',
            published: true,
            user: user2._id
        },
        {
            title: '«Группа крови»',
            artist: tsoi._id,
            year: '1988',
            image: 'gruppa_krovi.jpg',
            published: true,
            user: user2._id
        },
        {
            title: '«Звезда по имени Солнце»',
            artist: tsoi._id,
            year: '1989',
            image: 'zvezda_solnce.jpg',
            published: false,
            user: user1._id
        },
        {
            title: 'No Need to Argue',
            artist: cranberries._id,
            year: '1994',
            image: 'no_need_argue.jpeg',
            published: true,
            user: user1._id
        },
        {
            title: 'Bury the Hatchet',
            artist: cranberries._id,
            year: '1999',
            image: 'bury_the_hatchet.jpg',
            published: true,
            user: user1._id
        },
        {
            title: 'In the End',
            artist: cranberries._id,
            year: '2019',
            image: 'in_the_end.jpeg',
            published: false,
            user: admin._id
        },
        {
            title: 'The Good, The Bad & The Ugly',
            artist: ennio._id,
            year: '1967',
            image: 'good_bad_ugly.jpg',
            published: true,
            user: admin._id
        },
        {
            title: 'Once Upon a Time in the West',
            artist: ennio._id,
            year: '1969',
            image: 'once_upon_atime.jpg',
            published: true,
            user: admin._id
        },
        {
            title: 'A Fistful Of Dollars',
            artist: ennio._id,
            year: '1967',
            image: 'fistful.jpg',
            published: false,
            user: user2._id
        }
    );

    await Track.create(
        {
            title: 'Аллюминевые огурцы',
            album: tsoi_45._id,
            duration: '2:56',
            number: 1,
            youtube: 'https://www.youtube.com/embed/HtMmBXhwnog',
            published: true,
            user: user2._id
        },
        {
            title: 'Электричка',
            album: tsoi_45._id,
            duration: '2:34',
            number: 2,
            youtube: 'https://www.youtube.com/embed/omwTglnuXt8',
            published: true,
            user: user1._id
        },
        {
            title: 'Восьмиклассница',
            album: tsoi_45._id,
            duration: '2:44',
            number: 3,
            youtube: 'https://www.youtube.com/embed/w5jU_lVQt4o',
            published: true,
            user: user1._id
        },
        {
            title: 'Солнечные дни',
            album: tsoi_45._id,
            duration: '3:12',
            number: 4,
            youtube: 'https://www.youtube.com/embed/xczmvmTpGlU',
            published: true,
            user: user1._id
        },
        {
            title: 'Ситар играл',
            album: tsoi_45._id,
            duration: '1:34',
            number: 5,
            youtube: 'https://www.youtube.com/embed/8K7mdiJuEzo',
            published: true,
            user: user2._id
        },
        {
            title: 'Дерево',
            album: tsoi_45._id,
            duration: '1:43',
            number: 6,
            youtube: 'https://www.youtube.com/embed/3k5Fbsroxzs',
            published: true,
            user: user2._id
        },
        {
            title: 'Просто хочешь ты знать',
            album: tsoi_45._id,
            duration: '3:29',
            number: 7,
            youtube: 'https://www.youtube.com/embed/JiwTj1facoU',
            published: false,
            user: user2._id
        },
        {
            title: 'Группа крови',
            album: tsoi_gruppa._id,
            duration: '4:44',
            number: 1,
            youtube: 'https://www.youtube.com/embed/6C2ti3x9OAA',
            published: true,
            user: admin._id
        },
        {
            title: 'Закрой за мной дверь',
            album: tsoi_gruppa._id,
            duration: '4:16',
            number: 2,
            youtube: 'https://www.youtube.com/embed/zumiGPNp9_o',
            published: true,
            user: admin._id
        },
        {
            title: 'Прохожий',
            album: tsoi_gruppa._id,
            duration: '3:38',
            number: 3,
            youtube: 'https://www.youtube.com/embed/l8VsBP0lwY8',
            published: true,
            user: admin._id
        },
        {
            title: 'Война',
            album: tsoi_gruppa._id,
            duration: '4:05',
            number: 4,
            youtube: 'https://www.youtube.com/embed/CUPH5il-Cf0',
            published: true,
            user: admin._id
        },
        {
            title: 'Спокойная ночь',
            album: tsoi_gruppa._id,
            duration: '6:08',
            number: 5,
            youtube: 'https://www.youtube.com/embed/-PGP5vshfbQ',
            published: true,
            user: user1._id
        },
        {
            title: 'Бошетунмай',
            album: tsoi_gruppa._id,
            duration: '4:09',
            number: 6,
            youtube: 'https://www.youtube.com/embed/yog3lgCui7g',
            published: true,
            user: user1._id
        },
        {
            title: 'В наших глазах',
            album: tsoi_gruppa._id,
            duration: '3:34',
            number: 7,
            youtube: 'https://www.youtube.com/embed/N4CDtjeZ7DI',
            published: false,
            user: user1._id
        },
        {
            title: 'Звезда по имени Солнце',
            album: tsoi_zvezda._id,
            duration: '3:46',
            number: 1,
            youtube: 'https://www.youtube.com/embed/GNpy6PQJpXE',
            published: true,
            user: user1._id
        },
        {
            title: 'Пачка сигарет',
            album: tsoi_zvezda._id,
            duration: '4:28',
            number: 2,
            youtube: 'https://www.youtube.com/embed/v0uSOjnRm3U',
            published: true,
            user: user2._id
        },
        {
            title: 'Печаль',
            album: tsoi_zvezda._id,
            duration: '5:32',
            number: 3,
            youtube: 'https://www.youtube.com/embed/gE988aZM2Cs',
            published: true,
            user: user2._id
        },
        {
            title: 'Песня без слов',
            album: tsoi_zvezda._id,
            duration: '5:07',
            number: 4,
            youtube: 'https://www.youtube.com/embed/ZoXLYsrmQK0',
            published: true,
            user: user2._id
        },
        {
            title: 'Невесёлая песня',
            album: tsoi_zvezda._id,
            duration: '4:18',
            number: 5,
            youtube: 'https://www.youtube.com/embed/TkOmp-FwhQI',
            published: true,
            user: user2._id
        },
        {
            title: 'Место для шага вперёд',
            album: tsoi_zvezda._id,
            duration: '3:40',
            number: 6,
            youtube: 'https://www.youtube.com/embed/6JJw-ntEG_0',
            published: true,
            user: admin._id
        },
        {
            title: 'Апрель',
            album: tsoi_zvezda._id,
            duration: '4:41',
            number: 7,
            youtube: 'https://www.youtube.com/embed/wKxYPPXwZQQ',
            published: false,
            user: admin._id
        },
        {
            title: 'Ode to My Family',
            album: cranberries_no_argue._id,
            duration: '4:31',
            number: 1,
            youtube: 'https://www.youtube.com/embed/Zz-DJr1Qs54',
            published: true,
            user: admin._id
        },
        {
            title: 'Zombie',
            album: cranberries_no_argue._id,
            duration: '5:07',
            number: 2,
            youtube: 'https://www.youtube.com/embed/6Ejga4kJUts',
            published: true,
            user: admin._id
        },
        {
            title: 'No need to argue',
            album: cranberries_no_argue._id,
            duration: '2:54',
            number: 3,
            youtube: 'https://www.youtube.com/embed/MEaxoSMUgXI',
            published: true,
            user: user1._id
        },
        {
            title: 'I Can\'t Be with You',
            album: cranberries_no_argue._id,
            duration: '3:07',
            number: 4,
            youtube: 'https://www.youtube.com/embed/JIlg0yM0XKg',
            published: true,
            user: user1._id
        },
        {
            title: 'Twenty One',
            album: cranberries_no_argue._id,
            duration: '3:07',
            number: 5,
            youtube: 'https://www.youtube.com/embed/nzpLMD1xb0Q',
            published: true,
            user: user1._id
        },
        {
            title: 'Empty',
            album: cranberries_no_argue._id,
            duration: '3:26',
            number: 6,
            youtube: 'https://www.youtube.com/embed/IVNCmQFjCZQ',
            published: true,
            user: user1._id
        },
        {
            title: 'Dreaming My Dreams',
            album: cranberries_no_argue._id,
            duration: '3:37',
            number: 7,
            youtube: 'https://www.youtube.com/embed/gWSjksHySAk',
            published: false,
            user: user2._id
        },
        {
            title: 'Animal Instinct',
            album: cranberries_bury._id,
            duration: '3:31',
            number: 1,
            youtube: 'https://www.youtube.com/embed/ky4CdN0x58A',
            published: true,
            user: user2._id
        },
        {
            title: 'Loud and clear',
            album: cranberries_bury._id,
            duration: '2:45',
            number: 2,
            youtube: 'https://www.youtube.com/embed/RZWr4Qr10YM',
            published: true,
            user: user2._id
        },
        {
            title: 'Linger',
            album: cranberries_bury._id,
            duration: '4:38',
            number: 3,
            youtube: 'https://www.youtube.com/embed/G6Kspj3OO0s',
            published: true,
            user: user2._id
        },
        {
            title: 'Promises',
            album: cranberries_bury._id,
            duration: '5:27',
            number: 4,
            youtube: 'https://www.youtube.com/embed/hUFPooqKllA',
            published: true,
            user: user1._id
        },
        {
            title: 'You and Me',
            album: cranberries_bury._id,
            duration: '3:35',
            number: 5,
            youtube: 'https://www.youtube.com/embed/84zVbHX7lVw',
            published: true,
            user: user1._id
        },
        {
            title: 'Just My Imagination',
            album: cranberries_bury._id,
            duration: '3:41',
            number: 6,
            youtube: 'https://www.youtube.com/embed/SHoHIL2ABVQ',
            published: true,
            user: user1._id
        },
        {
            title: 'Delilah',
            album: cranberries_bury._id,
            duration: '3:32',
            number: 7,
            youtube: 'https://www.youtube.com/embed/9RlE3OMfUTY',
            published: false,
            user: user1._id
        },
        {
            title: 'All Over Now',
            album: cranberries_in_the_end._id,
            duration: '4:15',
            number: 1,
            youtube: 'https://www.youtube.com/embed/h1lMxX8doSU',
            published: true,
            user: user2._id
        },
        {
            title: 'Wake Me When It\'s Over',
            album: cranberries_in_the_end._id,
            duration: '4:11',
            number: 2,
            youtube: 'https://www.youtube.com/embed/jKPDNCBtsCw',
            published: true,
            user: user2._id
        },
        {
            title: 'In the End',
            album: cranberries_in_the_end._id,
            duration: '4:26',
            number: 3,
            youtube: 'https://www.youtube.com/embed/iKPNEpSIi3g',
            published: true,
            user: user2._id
        },
        {
            title: 'Lost',
            album: cranberries_in_the_end._id,
            duration: '4:00',
            number: 4,
            youtube: 'https://www.youtube.com/embed/_y8gNZYR3HM',
            published: true,
            user: user2._id
        },
        {
            title: 'A place I know',
            album: cranberries_in_the_end._id,
            duration: '4:26',
            number: 5,
            youtube: 'https://www.youtube.com/embed/5_jtr5aoedo',
            published: true,
            user: admin._id
        },
        {
            title: 'Got it',
            album: cranberries_in_the_end._id,
            duration: '4:03',
            number: 6,
            youtube: 'https://www.youtube.com/embed/5uYKdq8oj1o',
            published: true,
            user: admin._id
        },
        {
            title: 'Illusion',
            album: cranberries_in_the_end._id,
            duration: '4:08',
            number: 7,
            youtube: 'https://www.youtube.com/embed/u5TlYMazia4',
            published: false,
            user: admin._id
        },
        {
            title: 'The good, the bad and the ugly',
            album: ennio_good_bad._id,
            duration: '2:38',
            number: 1,
            youtube: 'https://www.youtube.com/embed/enuOArEfqGo',
            published: true,
            user: admin._id
        },
        {
            title: 'The Desert',
            album: ennio_good_bad._id,
            duration: '5:11',
            number: 2,
            youtube: 'https://www.youtube.com/embed/1Q-kVNHwIuY',
            published: true,
            user: user1._id
        },
        {
            title: 'Marcia',
            album: ennio_good_bad._id,
            duration: '2:49',
            number: 3,
            youtube: 'https://www.youtube.com/embed/jvU1dOvq608',
            published: true,
            user: user1._id
        },
        {
            title: 'Sentenza',
            album: ennio_good_bad._id,
            duration: '1:49',
            number: 4,
            youtube: 'https://www.youtube.com/embed/0d_JPZCk_BI',
            published: true,
            user: user1._id
        },
        {
            title: 'Fuga A Cavallo',
            album: ennio_good_bad._id,
            duration: '1:07',
            number: 5,
            youtube: 'https://www.youtube.com/embed/crlXpuUp-VQ',
            published: true,
            user: user1._id
        },
        {
            title: 'Il Ponte Di Corde',
            album: ennio_good_bad._id,
            duration: '1:51',
            number: 6,
            youtube: 'https://www.youtube.com/embed/TqnvIMzHohc',
            published: true,
            user: user2._id
        },
        {
            title: 'The Strong',
            album: ennio_good_bad._id,
            duration: '2:22',
            number: 7,
            youtube: 'https://www.youtube.com/embed/QtMmKZye1YY',
            published: false,
            user: user2._id
        },
        {
            title: 'Once Upon a Time in the West',
            album: ennio_once_upon._id,
            duration: '3:43',
            number: 1,
            youtube: 'https://www.youtube.com/embed/we53TOJyt78',
            published: true,
            user: user2._id
        },
        {
            title: 'Farewell to Cheyenne',
            album: ennio_once_upon._id,
            duration: '2:37',
            number: 2,
            youtube: 'https://www.youtube.com/embed/u5IpN3grKDI',
            published: true,
            user: user2._id
        },
        {
            title: 'The Transgression',
            album: ennio_once_upon._id,
            duration: '4:40',
            number: 3,
            youtube: 'https://www.youtube.com/embed/n6Z1mBjhBm0',
            published: true,
            user: user1._id
        },
        {
            title: 'Epilogue',
            album: ennio_once_upon._id,
            duration: '7:18',
            number: 4,
            youtube: 'https://www.youtube.com/embed/xFfmJG2cVs0',
            published: true,
            user: user1._id
        },
        {
            title: 'A dimly lit room',
            album: ennio_once_upon._id,
            duration: '11:57',
            number: 5,
            youtube: 'https://www.youtube.com/embed/VOWN5C31h4A',
            published: true,
            user: user1._id
        },
        {
            title: 'As a Judgment',
            album: ennio_once_upon._id,
            duration: '3:07',
            number: 6,
            youtube: 'https://www.youtube.com/embed/FS2-CktchfM',
            published: true,
            user: user1._id
        },
        {
            title: 'Finale',
            album: ennio_once_upon._id,
            duration: '4:18',
            number: 7,
            youtube: 'https://www.youtube.com/embed/PbLwhekwj5E',
            published: false,
            user: user2._id
        },
        {
            title: 'Theme from A Fistful of Dollars',
            album: ennio_fistful._id,
            duration: '1:48',
            number: 1,
            youtube: 'https://www.youtube.com/embed/HjjDOdaFZg0',
            published: true,
            user: user2._id
        },
        {
            title: 'The Result',
            album: ennio_fistful._id,
            duration: '2:36',
            number: 2,
            youtube: 'https://www.youtube.com/embed/o-9cShCrcwk',
            published: true,
            user: user2._id
        },
        {
            title: 'The Chase',
            album: ennio_fistful._id,
            duration: '2:25',
            number: 3,
            youtube: 'https://www.youtube.com/embed/u0MdKdsoYIo',
            published: true,
            user: user2._id
        },
        {
            title: 'Alla ricerca dell\'evaso',
            album: ennio_fistful._id,
            duration: '1:22',
            number: 4,
            youtube: 'https://www.youtube.com/embed/qj5Ow2Warks',
            published: true,
            user: admin._id
        },
        {
            title: 'Tortura',
            album: ennio_fistful._id,
            duration: '9:32',
            number: 5,
            youtube: 'https://www.youtube.com/embed/x6t2l07M50U',
            published: true,
            user: admin._id
        },
        {
            title: 'Cavalcata ',
            album: ennio_fistful._id,
            duration: '3:29',
            number: 7,
            youtube: 'https://www.youtube.com/embed/yss4S-mzSt8',
            published: true,
            user: admin._id
        },
        {
            title: 'Square dance',
            album: ennio_fistful._id,
            duration: '5:07',
            number: 3,
            youtube: 'https://www.youtube.com/embed/Izf0BJBQ5e8',
            published: false,
            user: admin._id
        }
    );

    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});