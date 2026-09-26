import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';
import { TIME_FORMATS } from '@/configs/timeFormats.config';
import { ROCK_DATES_LEAP_YEAR_ANCHOR } from '@/components/sections/RockDatesSection/RockDatesSection.config';
import { RockDateEventIF } from '@/components/sections/RockDatesSection/RockDatesSection.types';

const ROCK_DATE_EVENT_CATALOG: Omit<RockDateEventIF, 'id' | 'monthDay'>[] = [
    {
        title: 'The Beatles — «Abbey Road» (альбом, 1969)',
        text: 'Общепринятое мнение гласит, что Битлз (the Beatles) задумали «Abbey Road» как грандиозное прощание, и это подозрение, по-видимому, подтверждается элегической нотой, которую Пол Маккартни (Paul McCartney) делает в конце заключительной сюиты. Трудно не интерпретировать финал как прощание группы с десятилетием, которое она сама и определила.',
        authorName: 'Диана Курочкина',
        tags: ['The Beatles', 'альбом', '1969'],
        country: 'gb',
        cover: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1400&q=80',
        url: '#abbey-road',
    },
    {
        title: 'Nirvana — «Nevermind» (альбом, 1991)',
        text: '«Nevermind» вытащил альтернативный рок из подвалов Сиэтла на мировую сцену. Грязный гитарный звук и мелодии, которые запоминаются с первого припева, до сих пор звучат как точка, после которой мейнстрим уже не мог делать вид, что гранжа не существует.',
        authorName: 'Анна Соколова',
        tags: ['Nirvana', 'альбом', '1991'],
        country: 'us',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80',
        url: '#nevermind',
    },
    {
        title: 'Pink Floyd — «The Dark Side of the Moon» (альбом, 1973)',
        text: 'Пластинка о времени, деньгах и тишине между ними держалась в чартах годами. Звук собран так плотно, что даже короткая пауза кажется частью аранжировки, а обложка с призмой давно живёт отдельно от самих песен.',
        authorName: 'Игорь Лебедев',
        tags: ['Pink Floyd', 'альбом', '1973'],
        country: 'gb',
        cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=80',
        url: '#dark-side',
    },
    {
        title: 'Queen — «A Night at the Opera» (альбом, 1975)',
        text: 'От оперного многоголосия до жёсткого рока на одной пластинке — Queen собрали альбом как спектакль. «Bohemian Rhapsody» здесь не единственный ход, но именно она показывает, насколько далеко группа готова была зайти ради одной песни.',
        authorName: 'Мария Орлова',
        tags: ['Queen', 'альбом', '1975'],
        country: 'gb',
        cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80',
        url: '#night-at-the-opera',
    },
    {
        title: 'Кино — «Группа крови» (альбом, 1988)',
        text: 'Восьмой альбом Цоя звучит собраннее ранних записей: короткие песни, прямой ритм и тексты, которые до сих пор цитируют целиком. «Группа крови» стала визитной карточкой группы ещё до того, как её начали ставить на каждом сборнике.',
        authorName: 'Павел Никитин',
        tags: ['Кино', 'альбом', '1988'],
        country: 'ru',
        cover: 'https://images.unsplash.com/photo-1459749411177-04de2d2b7b8a?auto=format&fit=crop&w=1400&q=80',
        url: '#gruppa-krovi',
    },
];

const createDayEvents = (
    monthDay: string,
    sequenceStart: number,
): RockDateEventIF[] => {
    const [firstCatalogItem] = ROCK_DATE_EVENT_CATALOG;

    if (!firstCatalogItem) {
        return [];
    }

    return Array.from(
        { length: MAGIC_NUMBERS.RockDatesEventsPerDay },
        (_, eventIndex): RockDateEventIF => {
            const catalogItem =
                ROCK_DATE_EVENT_CATALOG[
                    (sequenceStart + eventIndex) %
                        ROCK_DATE_EVENT_CATALOG.length
                ] ?? firstCatalogItem;
            const order = eventIndex + 1;

            return {
                id: `${monthDay}-${order}`,
                monthDay,
                ...catalogItem,
            };
        },
    );
};

export const ROCK_DATE_EVENTS: RockDateEventIF[] = Array.from(
    { length: MAGIC_NUMBERS.MonthsInYear },
    (_, monthIndex) => {
        const monthStart = dayjs(ROCK_DATES_LEAP_YEAR_ANCHOR).add(
            monthIndex,
            'month',
        );
        const daysInMonth = monthStart.daysInMonth();

        return Array.from({ length: daysInMonth }, (_, dayIndex) => {
            const date = monthStart.add(dayIndex, 'day').locale('ru');
            const monthDay = date.format(TIME_FORMATS.MonthDay);
            const sequenceStart =
                date.diff(dayjs(ROCK_DATES_LEAP_YEAR_ANCHOR), 'day') *
                MAGIC_NUMBERS.RockDatesEventsPerDay;

            return createDayEvents(monthDay, sequenceStart);
        }).flat();
    },
).flat();
