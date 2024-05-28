import depositItem08 from '../images/deposit-item_08.png'
import depositItem07 from '../images/deposit-item_07.png'
import depositItem06 from '../images/deposit-item_06.png'
import depositItem05 from '../images/deposit-item_05.png'
import depositItem04 from '../images/deposit-item_04.png'
import depositItem03 from '../images/deposit-item_03.png'
import depositItem02 from '../images/deposit-item_02.png'
import depositItem01 from '../images/deposit-item_01.png'
import depositItem from '../images/deposit-item.png'

// [ ] TODO: Delete oncfe integrated deposit items to frontend

export const depositItems = [
    {
        abbr: 'cc',
        src: depositItem,
        uid: 'credit-card',
        title: 'Credit Cards',
        type: 'fiat',
    },
    { abbr: 'g2a', src: depositItem01, uid: 'g2a', title: 'G2A', type: 'fiat' },
    //    { abbr: 'kinguin', src: depositItem02, uid: 'kinguin', title: 'Kinguin', type: 'fiat' },
    {
        abbr: 'eth',
        src: depositItem03,
        uid: 'ethereum',
        title: 'Ethereum',
        cryptoPerBux: 1.40740741e-7,
        type: 'crypto',
    },
    {
        abbr: 'btc',
        src: depositItem04,
        uid: 'bitcoin',
        title: 'Bitcoin',
        cryptoPerBux: 7.407407407407408e-9,
        type: 'crypto',
    },
    {
        abbr: 'ltc',
        src: depositItem05,
        uid: 'litecoin',
        title: 'Litecoin',
        cryptoPerBux: 0.00000548148,
        type: 'crypto',
    },
    {
        abbr: 'sol',
        src: depositItem06,
        uid: 'solana',
        title: 'Solana',
        cryptoPerBux: 0.00147925925,
        type: 'crypto',
    },
    {
        abbr: 'xrp',
        src: depositItem07,
        uid: 'xrp',
        title: 'XRP',
        cryptoPerBux: 0.00068962962,
        type: 'crypto',
    },
    {
        abbr: 'usdt',
        src: depositItem08,
        uid: 'tether',
        title: 'Tether',
        cryptoPerBux: 0.003,
        type: 'crypto',
    },
]
