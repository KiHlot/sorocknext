import { ReactElement } from 'react';
import AeIcon from '@/images/flags/ae.svg';
import AfIcon from '@/images/flags/af.svg';
import AmIcon from '@/images/flags/am.svg';
import ArIcon from '@/images/flags/ar.svg';
import AtIcon from '@/images/flags/at.svg';
import AuIcon from '@/images/flags/au.svg';
import AzIcon from '@/images/flags/az.svg';
import BaIcon from '@/images/flags/ba.svg';
import BdIcon from '@/images/flags/bd.svg';
import BeIcon from '@/images/flags/be.svg';
import BgIcon from '@/images/flags/bg.svg';
import BhIcon from '@/images/flags/bh.svg';
import BoIcon from '@/images/flags/bo.svg';
import BrIcon from '@/images/flags/br.svg';
import BsIcon from '@/images/flags/bs.svg';
import BwIcon from '@/images/flags/bw.svg';
import ByIcon from '@/images/flags/by.svg';
import CaIcon from '@/images/flags/ca.svg';
import CgIcon from '@/images/flags/cg.svg';
import ChIcon from '@/images/flags/ch.svg';
import CiIcon from '@/images/flags/ci.svg';
import ClIcon from '@/images/flags/cl.svg';
import CmIcon from '@/images/flags/cm.svg';
import CnIcon from '@/images/flags/cn.svg';
import CoIcon from '@/images/flags/co.svg';
import CrIcon from '@/images/flags/cr.svg';
import CuIcon from '@/images/flags/cu.svg';
import CzIcon from '@/images/flags/cz.svg';
import DeIcon from '@/images/flags/de.svg';
import DkIcon from '@/images/flags/dk.svg';
import DzIcon from '@/images/flags/dz.svg';
import EeIcon from '@/images/flags/ee.svg';
import EgIcon from '@/images/flags/eg.svg';
import EsIcon from '@/images/flags/es.svg';
import FiIcon from '@/images/flags/fi.svg';
import FrIcon from '@/images/flags/fr.svg';
import GbIcon from '@/images/flags/gb.svg';
import GeIcon from '@/images/flags/ge.svg';
import GlIcon from '@/images/flags/gl.svg';
import GrIcon from '@/images/flags/gr.svg';
import HkIcon from '@/images/flags/hk.svg';
import HrIcon from '@/images/flags/hr.svg';
import HuIcon from '@/images/flags/hu.svg';
import IdIcon from '@/images/flags/id.svg';
import IeIcon from '@/images/flags/ie.svg';
import IlIcon from '@/images/flags/il.svg';
import InIcon from '@/images/flags/in.svg';
import IqIcon from '@/images/flags/iq.svg';
import IsIcon from '@/images/flags/is.svg';
import ItIcon from '@/images/flags/it.svg';
import JmIcon from '@/images/flags/jm.svg';
import JpIcon from '@/images/flags/jp.svg';
import KhIcon from '@/images/flags/kh.svg';
import KpIcon from '@/images/flags/kp.svg';
import KrIcon from '@/images/flags/kr.svg';
import KzIcon from '@/images/flags/kz.svg';
import LiIcon from '@/images/flags/li.svg';
import LtIcon from '@/images/flags/lt.svg';
import LuIcon from '@/images/flags/lu.svg';
import LvIcon from '@/images/flags/lv.svg';
import MaIcon from '@/images/flags/ma.svg';
import McIcon from '@/images/flags/mc.svg';
import MdIcon from '@/images/flags/md.svg';
import MeIcon from '@/images/flags/me.svg';
import MgIcon from '@/images/flags/mg.svg';
import MkIcon from '@/images/flags/mk.svg';
import MnIcon from '@/images/flags/mn.svg';
import MtIcon from '@/images/flags/mt.svg';
import MxIcon from '@/images/flags/mx.svg';
import MyIcon from '@/images/flags/my.svg';
import NeIcon from '@/images/flags/ne.svg';
import NgIcon from '@/images/flags/ng.svg';
import NlIcon from '@/images/flags/nl.svg';
import NoIcon from '@/images/flags/no.svg';
import NpIcon from '@/images/flags/np.svg';
import NzIcon from '@/images/flags/nz.svg';
import PaIcon from '@/images/flags/pa.svg';
import PeIcon from '@/images/flags/pe.svg';
import PhIcon from '@/images/flags/ph.svg';
import PlIcon from '@/images/flags/pl.svg';
import PrIcon from '@/images/flags/pr.svg';
import PsIcon from '@/images/flags/ps.svg';
import PtIcon from '@/images/flags/pt.svg';
import PyIcon from '@/images/flags/py.svg';
import QaIcon from '@/images/flags/qa.svg';
import RoIcon from '@/images/flags/ro.svg';
import RsIcon from '@/images/flags/rs.svg';
import RuIcon from '@/images/flags/ru.svg';
import SeIcon from '@/images/flags/se.svg';
import SfIcon from '@/images/flags/sf.svg';
import SgIcon from '@/images/flags/sg.svg';
import SiIcon from '@/images/flags/si.svg';
import SkIcon from '@/images/flags/sk.svg';
import SnIcon from '@/images/flags/sn.svg';
import SoIcon from '@/images/flags/so.svg';
import SyIcon from '@/images/flags/sy.svg';
import ThIcon from '@/images/flags/th.svg';
import TjIcon from '@/images/flags/tj.svg';
import TnIcon from '@/images/flags/tn.svg';
import TrIcon from '@/images/flags/tr.svg';
import TtIcon from '@/images/flags/tt.svg';
import TwIcon from '@/images/flags/tw.svg';
import TzIcon from '@/images/flags/tz.svg';
import UaIcon from '@/images/flags/ua.svg';
import UgIcon from '@/images/flags/ug.svg';
import UsIcon from '@/images/flags/us.svg';
import UyIcon from '@/images/flags/uy.svg';
import UzIcon from '@/images/flags/uz.svg';
import VeIcon from '@/images/flags/ve.svg';
import VnIcon from '@/images/flags/vn.svg';
import ZaIcon from '@/images/flags/za.svg';

export const getFlagIcon = (country: string): ReactElement => {
    switch (country) {
        case 'sf':
            return <SfIcon />;
        case 'us':
            return <UsIcon />;
        case 'gb':
            return <GbIcon />;
        case 'ua':
            return <UaIcon />;
        case 'ru':
            return <RuIcon />;
        case 'pl':
            return <PlIcon />;
        case 'ae':
            return <AeIcon />;
        case 'af':
            return <AfIcon />;
        case 'am':
            return <AmIcon />;
        case 'ar':
            return <ArIcon />;
        case 'at':
            return <AtIcon />;
        case 'au':
            return <AuIcon />;
        case 'az':
            return <AzIcon />;
        case 'ba':
            return <BaIcon />;
        case 'bd':
            return <BdIcon />;
        case 'be':
            return <BeIcon />;
        case 'bg':
            return <BgIcon />;
        case 'bh':
            return <BhIcon />;
        case 'bo':
            return <BoIcon />;
        case 'br':
            return <BrIcon />;
        case 'bs':
            return <BsIcon />;
        case 'by':
            return <ByIcon />;
        case 'bw':
            return <BwIcon />;
        case 'ca':
            return <CaIcon />;
        case 'cg':
            return <CgIcon />;
        case 'ch':
            return <ChIcon />;
        case 'ci':
            return <CiIcon />;
        case 'cl':
            return <ClIcon />;
        case 'cm':
            return <CmIcon />;
        case 'cn':
            return <CnIcon />;
        case 'co':
            return <CoIcon />;
        case 'cr':
            return <CrIcon />;
        case 'cu':
            return <CuIcon />;
        case 'cz':
            return <CzIcon />;
        case 'de':
            return <DeIcon />;
        case 'dk':
            return <DkIcon />;
        case 'dz':
            return <DzIcon />;
        case 'ee':
            return <EeIcon />;
        case 'eg':
            return <EgIcon />;
        case 'es':
            return <EsIcon />;
        case 'fi':
            return <FiIcon />;
        case 'fr':
            return <FrIcon />;
        case 'ge':
            return <GeIcon />;
        case 'gl':
            return <GlIcon />;
        case 'gr':
            return <GrIcon />;
        case 'hk':
            return <HkIcon />;
        case 'hr':
            return <HrIcon />;
        case 'hu':
            return <HuIcon />;
        case 'id':
            return <IdIcon />;
        case 'ie':
            return <IeIcon />;
        case 'il':
            return <IlIcon />;
        case 'in':
            return <InIcon />;
        case 'iq':
            return <IqIcon />;
        case 'is':
            return <IsIcon />;
        case 'it':
            return <ItIcon />;
        case 'jm':
            return <JmIcon />;
        case 'jp':
            return <JpIcon />;
        case 'kh':
            return <KhIcon />;
        case 'kp':
            return <KpIcon />;
        case 'kr':
            return <KrIcon />;
        case 'kz':
            return <KzIcon />;
        case 'li':
            return <LiIcon />;
        case 'lt':
            return <LtIcon />;
        case 'lu':
            return <LuIcon />;
        case 'lv':
            return <LvIcon />;
        case 'ma':
            return <MaIcon />;
        case 'mc':
            return <McIcon />;
        case 'md':
            return <MdIcon />;
        case 'me':
            return <MeIcon />;
        case 'mg':
            return <MgIcon />;
        case 'mk':
            return <MkIcon />;
        case 'mn':
            return <MnIcon />;
        case 'mt':
            return <MtIcon />;
        case 'mx':
            return <MxIcon />;
        case 'my':
            return <MyIcon />;
        case 'ne':
            return <NeIcon />;
        case 'ng':
            return <NgIcon />;
        case 'nl':
            return <NlIcon />;
        case 'no':
            return <NoIcon />;
        case 'np':
            return <NpIcon />;
        case 'nz':
            return <NzIcon />;
        case 'pa':
            return <PaIcon />;
        case 'pe':
            return <PeIcon />;
        case 'ph':
            return <PhIcon />;
        case 'pr':
            return <PrIcon />;
        case 'ps':
            return <PsIcon />;
        case 'pt':
            return <PtIcon />;
        case 'py':
            return <PyIcon />;
        case 'qa':
            return <QaIcon />;
        case 'ro':
            return <RoIcon />;
        case 'rs':
            return <RsIcon />;
        case 'se':
            return <SeIcon />;
        case 'sg':
            return <SgIcon />;
        case 'si':
            return <SiIcon />;
        case 'sk':
            return <SkIcon />;
        case 'sn':
            return <SnIcon />;
        case 'so':
            return <SoIcon />;
        case 'sy':
            return <SyIcon />;
        case 'th':
            return <ThIcon />;
        case 'tj':
            return <TjIcon />;
        case 'tn':
            return <TnIcon />;
        case 'tr':
            return <TrIcon />;
        case 'tt':
            return <TtIcon />;
        case 'tw':
            return <TwIcon />;
        case 'tz':
            return <TzIcon />;
        case 'ug':
            return <UgIcon />;
        case 'uy':
            return <UyIcon />;
        case 'uz':
            return <UzIcon />;
        case 've':
            return <VeIcon />;
        case 'vn':
            return <VnIcon />;
        case 'za':
            return <ZaIcon />;
        default:
            return <SfIcon />;
    }
};

export function getSelectCountryData(): any[] {
    return [
        { key: 'sf', icon: <SfIcon />, value: 'World' },
        { key: 'us', icon: <UsIcon />, value: 'США' },
        { key: 'gb', icon: <GbIcon />, value: 'Великобритания' },
        { key: 'ua', icon: <UaIcon />, value: 'Украина' },
        { key: 'ru', icon: <RuIcon />, value: 'Россия' },
        { key: 'pl', icon: <PlIcon />, value: 'Польша' },
        { key: 'ae', icon: <AeIcon />, value: 'ОАЭ' },
        { key: 'af', icon: <AfIcon />, value: 'Афганистан' },
        { key: 'am', icon: <AmIcon />, value: 'Армения' },
        { key: 'ar', icon: <ArIcon />, value: 'Аргентина' },
        { key: 'at', icon: <AtIcon />, value: 'Австрия' },
        { key: 'au', icon: <AuIcon />, value: 'Австралия' },
        { key: 'az', icon: <AzIcon />, value: 'Азербайджан' },
        { key: 'ba', icon: <BaIcon />, value: 'Босния и Герцеговина' },
        { key: 'bd', icon: <BdIcon />, value: 'Бангладеш' },
        { key: 'be', icon: <BeIcon />, value: 'Бельгия' },
        { key: 'bg', icon: <BgIcon />, value: 'Болгария' },
        { key: 'bh', icon: <BhIcon />, value: 'Бахрейн' },
        { key: 'bo', icon: <BoIcon />, value: 'Боливия' },
        { key: 'br', icon: <BrIcon />, value: 'Бразилия' },
        { key: 'bs', icon: <BsIcon />, value: 'Багамы' },
        { key: 'by', icon: <ByIcon />, value: 'Беларусь' },
        { key: 'bw', icon: <BwIcon />, value: 'Ботсвана' },
        { key: 'ca', icon: <CaIcon />, value: 'Канада' },
        { key: 'cg', icon: <CgIcon />, value: 'Конго' },
        { key: 'ch', icon: <ChIcon />, value: 'Швейцария' },
        { key: 'ci', icon: <CiIcon />, value: "Кот-д'Ивуар" },
        { key: 'cl', icon: <ClIcon />, value: 'Чили' },
        { key: 'cm', icon: <CmIcon />, value: 'Камерун' },
        { key: 'cn', icon: <CnIcon />, value: 'Китай' },
        { key: 'co', icon: <CoIcon />, value: 'Колумбия' },
        { key: 'cr', icon: <CrIcon />, value: 'Коста-Рика' },
        { key: 'cu', icon: <CuIcon />, value: 'Куба' },
        { key: 'cz', icon: <CzIcon />, value: 'Чехия' },
        { key: 'de', icon: <DeIcon />, value: 'Германия' },
        { key: 'dk', icon: <DkIcon />, value: 'Дания' },
        { key: 'dz', icon: <DzIcon />, value: 'Алжир' },
        { key: 'ee', icon: <EeIcon />, value: 'Эстония' },
        { key: 'eg', icon: <EgIcon />, value: 'Египет' },
        { key: 'es', icon: <EsIcon />, value: 'Испания' },
        { key: 'fi', icon: <FiIcon />, value: 'Финляндия' },
        { key: 'fr', icon: <FrIcon />, value: 'Франция' },
        { key: 'ge', icon: <GeIcon />, value: 'Грузия' },
        { key: 'gl', icon: <GlIcon />, value: 'Гренландия' },
        { key: 'gr', icon: <GrIcon />, value: 'Греция' },
        { key: 'hk', icon: <HkIcon />, value: 'Гонконг' },
        { key: 'hr', icon: <HrIcon />, value: 'Хорватия' },
        { key: 'hu', icon: <HuIcon />, value: 'Венгрия' },
        { key: 'id', icon: <IdIcon />, value: 'Индонезия' },
        { key: 'ie', icon: <IeIcon />, value: 'Ирландия' },
        { key: 'il', icon: <IlIcon />, value: 'Израиль' },
        { key: 'in', icon: <InIcon />, value: 'Индия' },
        { key: 'iq', icon: <IqIcon />, value: 'Ирак' },
        { key: 'is', icon: <IsIcon />, value: 'Исландия' },
        { key: 'it', icon: <ItIcon />, value: 'Италия' },
        { key: 'jm', icon: <JmIcon />, value: 'Ямайка' },
        { key: 'jp', icon: <JpIcon />, value: 'Япония' },
        { key: 'kh', icon: <KhIcon />, value: 'Камбоджа' },
        { key: 'kp', icon: <KpIcon />, value: 'Северная Корея' },
        { key: 'kr', icon: <KrIcon />, value: 'Южная Корея' },
        { key: 'kz', icon: <KzIcon />, value: 'Казахстан' },
        { key: 'li', icon: <LiIcon />, value: 'Лихтенштейн' },
        { key: 'lt', icon: <LtIcon />, value: 'Литва' },
        { key: 'lu', icon: <LuIcon />, value: 'Люксембург' },
        { key: 'lv', icon: <LvIcon />, value: 'Латвия' },
        { key: 'ma', icon: <MaIcon />, value: 'Марокко' },
        { key: 'mc', icon: <McIcon />, value: 'Монако' },
        { key: 'md', icon: <MdIcon />, value: 'Молдова' },
        { key: 'me', icon: <MeIcon />, value: 'Черногория' },
        { key: 'mg', icon: <MgIcon />, value: 'Мадагаскар' },
        { key: 'mk', icon: <MkIcon />, value: 'Македония' },
        { key: 'mn', icon: <MnIcon />, value: 'Монголия' },
        { key: 'mt', icon: <MtIcon />, value: 'Мальта' },
        { key: 'mx', icon: <MxIcon />, value: 'Мексика' },
        { key: 'my', icon: <MyIcon />, value: 'Малайзия' },
        { key: 'ne', icon: <NeIcon />, value: 'Нигер' },
        { key: 'ng', icon: <NgIcon />, value: 'Нигерия' },
        { key: 'nl', icon: <NlIcon />, value: 'Нидерланды' },
        { key: 'no', icon: <NoIcon />, value: 'Норвегия' },
        { key: 'np', icon: <NpIcon />, value: 'Непал' },
        { key: 'nz', icon: <NzIcon />, value: 'Новая Зеландия' },
        { key: 'pa', icon: <PaIcon />, value: 'Панама' },
        { key: 'pe', icon: <PeIcon />, value: 'Перу' },
        { key: 'ph', icon: <PhIcon />, value: 'Филиппины' },
        { key: 'pr', icon: <PrIcon />, value: 'Пуэрто-Рико' },
        { key: 'ps', icon: <PsIcon />, value: 'Палестина' },
        { key: 'pt', icon: <PtIcon />, value: 'Португалия' },
        { key: 'py', icon: <PyIcon />, value: 'Парагвай' },
        { key: 'qa', icon: <QaIcon />, value: 'Катар' },
        { key: 'ro', icon: <RoIcon />, value: 'Румыния' },
        { key: 'rs', icon: <RsIcon />, value: 'Сербия' },
        { key: 'se', icon: <SeIcon />, value: 'Швеция' },
        { key: 'sg', icon: <SgIcon />, value: 'Сингапур' },
        { key: 'si', icon: <SiIcon />, value: 'Словения' },
        { key: 'sk', icon: <SkIcon />, value: 'Словакия' },
        { key: 'sn', icon: <SnIcon />, value: 'Сенегал' },
        { key: 'so', icon: <SoIcon />, value: 'Сомали' },
        { key: 'sy', icon: <SyIcon />, value: 'Сирия' },
        { key: 'th', icon: <ThIcon />, value: 'Таиланд' },
        { key: 'tj', icon: <TjIcon />, value: 'Таджикистан' },
        { key: 'tn', icon: <TnIcon />, value: 'Тунис' },
        { key: 'tr', icon: <TrIcon />, value: 'Турция' },
        { key: 'tt', icon: <TtIcon />, value: 'Тринидад и Тобаго' },
        { key: 'tw', icon: <TwIcon />, value: 'Тайвань' },
        { key: 'tz', icon: <TzIcon />, value: 'Танзания' },
        { key: 'ug', icon: <UgIcon />, value: 'Уганда' },
        { key: 'uy', icon: <UyIcon />, value: 'Уругвай' },
        { key: 'uz', icon: <UzIcon />, value: 'Узбекистан' },
        { key: 've', icon: <VeIcon />, value: 'Венесуэла' },
        { key: 'vn', icon: <VnIcon />, value: 'Вьетнам' },
        { key: 'za', icon: <ZaIcon />, value: 'Южная Африка' },
    ];
}
