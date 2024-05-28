export const errors = {
    DEFAULT: 'Oops! Something unexpected happened.',
    REGISTER_PASS_NOT_MATCH: 'Password and confirmation do not match. Please try again.',
    INSTANT_LOGIN_INVALID: 'Instant login request is invalid or has expired',
    OTP_LENGTH: 'One-Time Password (OTP) should be 6 digits in length.',
    OTP_INVALID: 'The One-Time Password (OTP) pin you entered is invalid.',
    OTP_PROMPT: 'A One-Time Password (OTP) prompt is still active, either complete or reset the confirmation.',
    OTP_ERROR: 'The One-Time Password (OTP) prompt is invalid or the 15 minutes limit has expired.',
    MISSING_AUTHORIZATION_HEADER: 'You are not authorized to make that request.',
    AUTHENTICATION_ERROR: 'Something went wrong with authentication. Please try again.',
    UNAUTHORIZED: 'You have to login to do that.',
    FORBIDDEN: "You don't have permission to do that.",
    INVALID_PASSWORD: 'The password you entered is invalid.',
    INVALID_USERNAME: 'The username you entered is invalid.',
    INVALID_COOKIE_FORMAT:
        'The cookie you entered is invalid. Make sure to paste your full cookie, including the warning message.',
    INVALID_COOKIE: 'The cookie you entered is invalid.',
    EXPIRED_SESSION: 'You took too long to do that. Please try again.',
    INVALID_2FA: 'The 2FA code you entered is invalid.',
    ALREADY_LINKED: 'You already linked your Discord account.',
    NOT_LINKED: 'You need to link your Discord account to do that.',
    CAPTCHA_REQUIRED: 'You need to solve the captcha to continue.',
    JOINED_TOO_MANY_RAINS: "You've joined too many rains recently, try again later.",
    ALREADY_JOINED_RAIN: "You've already joined this rain.",
    RAIN_NOT_FOUND: "The rain you're trying to join doesn't exist.",
    CANNOT_JOIN_OWN_RAIN: "You can't join your own rain.",
    INVALID_AMOUNT: 'The amount you entered is invalid.',
    INVALID_CAPTCHA: 'Invalid captcha. Try again.',
    CODE_ALREADY_EXISTS: 'This code is already being used.',
    CODE_NOT_FOUND: "This code doesn't exist.",
    INSUFFICIENT_BALANCE: "You don't have enough balance to do that.",
    ALREADY_STARTED: 'This game has already started.',
    NO_BOTS_AVAILABLE: 'There are no bots available to play.',
    ALREADY_IN_BATTLE: "You've already joined this battle.",
    SLOT_TAKEN: 'This slot is already taken.',
    DISABLED: 'This feature is disabled.',
    MAINTENANCE: 'This feature is disabled for maintenance.',
    NOT_FOUND: 'Not found.',
    LISTING_PENDING: 'Someone else is already buying this listing.',
    TOO_MANY_TRADES: "You've did too many trades recently, try again later.",
    INVALID_ROBLOX_COOKIE: 'Your Roblox session expired. Please login again.',
    NOT_PREMIUM: 'You need to have Roblox premium to do that.',
    INVALID_TOTAL: 'The prices have updated. Please try again.',
    INVALID_CREDENTIALS: 'The username or password you entered is invalid.',
    INVALID_CODE: 'The code you entered is invalid.',
    MISSING_CODE: 'The code you entered is invalid.',
    AMOUNT_TOO_LOW: 'The amount you entered is too low.',
    ALREADY_AFFILIATED: 'You have already used an affiliate code.',
    NOT_ENOUGH_DEPOSITS: 'You need to deposit more to do this.',
    NOT_ENOUGH_BETS: 'You dont have enough affiliate earnings to claim.',
    RAIN_BANNED: "You can't join rains.",
    SERVER_ERROR: 'There was an error processing your request. Please try again later.',
    INTERNAL_SERVER_ERROR: 'There was an error processing your request. Please try again later.',
    INTERNAL_ERROR: 'There was an error processing your request. Please try again later.',
    UNKNOWN_ERROR: 'There was an error processing your request. Please try again later.',
    EXCEEDED_MAX_TIP: "You've exceeded the maximum amount you are allowed to tip.",
    PAGE_NOT_FOUND: "The page you're looking for doesn't exist.",
    TRANSACTION_NOT_FOUND: "The transaction you're looking for doesn't exist.",
    TRANSACTION_NOT_PENDING: "This transaction isn't pending.",
    TRANSACTION_IN_PROGRESS: 'This transaction is already being processed.',
    INVALID_TOKEN: 'The 2fa token you entered is invalid.',
    '2FA_REQUIRED': 'You need to supply your 2FA code to do that.',
    PHRASE_ALREADY_EXISTS: 'This phrase already exists.',
    INVALID_PHRASE: 'Invalid phrase.',
    PHRASE_NOT_FOUND: 'Phrase not found.',
    INVALID_SEARCH: 'Invalid search.',
    RAIN_ENDED: 'Rain has already ended.',
    OUT_OF_BOUNDS: 'The amount you entered is out of bounds.',
    USER_NOT_FOUND: 'User not found.',
    INVALID_EARNINGS: 'Invalid earnings.',
    INVALID_ROLE: 'Invalid role.',
    CANNOT_SET_HIGHER_ROLE: 'You cannot set a role higher than your own.',
    CANNOT_EDIT_USER: 'You cannot edit this user.',
    SLOW_DOWN: 'Please wait a second before doing that again.',
    INVALID_EMAIL: 'The email you entered is invalid.',
    INVALID_LOGINID: 'Your login has expired. Please try again.',
    INVALID_OTP: 'The OTP code you entered is invalid.',
    TOO_MANY_ATTEMPTS: 'You have tried too many times. Please try again later.',
    ROBLOX_ERROR: 'There was an error processing your request. Please try again later.',
    INSUFFICIENT_LEVEL: "You don't have a high enough level to do that.",
    MISSING_DUMMY_ITEM:
        "You don't have a dummy item on your Roblox inventory. It has to be worth less than the listing price or R$200.",
    SELLER_INVALID_ROBLOX_COOKIE: 'This listing is not available anymore.',
    SELLER_NOT_PREMIUM: 'This listing is not available anymore.',
    SELLER_INVALID_INVENTORY: 'This listing is not available anymore.',
    ITEM_ALREADY_LISTED: 'You already have a listing for this item.',
    ITEM_ON_HOLD: 'One of the items you are trying to sell is on hold.',
    INVALID_INVENTORY: 'Your inventory is out of sync. Try again.',
    MIN_ROBUX_DEPOSIT: 'The minimum amount you can deposit is R$10.',
    AMOUNT_TOO_HIGH: 'The amount you entered is too high.',
    MISSING_ITEMS: 'Please select at least one item.',
    CANNOT_BUY_OWN_LISTING: "You can't buy your own listing",
    INSUFFICIENT_XP: 'You need at least 5000 xp to be able to withdraw.',
    INSUFFICIENT_DEPOSITS: 'You need to have deposited at least R$500 in the last two weeks to be able to withdraw.',
    NOT_ENOUGH_WAGERED: 'You need to have wagered at least R$2.500 to be able to join rains.',
    SECURITY_QUESTION: "You aren't eligible to login using credentials. You can only login with cookie.",
    MAX_UNFILLED: 'You can only have a maximum of R$25.000 at once unfilled in the withdraw queue.',
    AFFILIATE_DEPOSIT_REQUIREMENT: 'You need to have deposited at least R$10 to set an affiliate code.',
    TIP_DEPOSIT_REQUIREMENT: 'You need to have deposited at least R$200 to tip.',
    AUTHENTICATOR_NOT_ENABLED: 'You need to enable authenticator on your Roblox account to do that.',
    LISTING_REMOVED: 'This listing has been removed.',
    ALREADY_USED_CODE: "You've already used this code.",
    ROBLOX_ACCOUNT_AGE_AFFILIATE: 'Your Roblox account needs to be at least 90 days old to use an affiliate code.',
    ACCOUNT_AGE_AFFILIATE: 'Your BloxClash account has to be less than 30 days old to use an affiliate code.',
    INSUFFICIENT_DEPOSIT_PROMO: 'You need to deposit at least R$50 redeem promo codes.',
    MIN_WITHDRAW_ROBUX: 'The minimum amount you can withdraw is R$50.',
    CANT_REDEEM_OWN_CODE: "You can't redeem your own code.",
    CODE_EXPIRED: "This code has reached it's maximum uses.",
    MAX_BET_ROULETTE: 'You can only bet a maximum of R$100.000 per color on roulette.',
    MIN_BET_JACKPOT: 'Minimum bet on jackpot is of R$5.',
    MAX_BET_JACKPOT: 'You can only bet a maximum of R$150.000 on jackpot.',
    SPONSOR_LOCK: 'This feature is disabled for sponsored users.',
    SPONSOR_LOCK_FUNDING: "You can't fund battles as a sponsor.",
    SPONSOR_ONLY_CASES: 'This battle contains cases that are only available for sponsored users.',
    MIN_RAIN_TIP: 'The minimum amount you can tip to rain is R$25.',
    MIN_DEPOSIT_CC: 'The amount is below the minimum deposit.',
    MAX_DEPOSIT_CC: 'The amount exceeds the maximum deposit.',
    MIN_LISTING_PRICE: 'Minimum listing price is R$300.',
    HOT_WALLET_BALANCE: "This amount exceeds our hot wallet's limit, try again later.",
    MIN_CRYPTO_WITHDRAWAL: 'The amount is below the minimum withdrawal.',
    MAX_CRYPTO_WITHDRAWAL: 'The amount exceeds the maximum withdrawal.',
    PENDING_WITHDRAWAL: 'You can only have one pending withdrawal at a time.',
    EXCEEDED_MAX_CRYPTO: 'This amount exceeds your maximum crypto withdrawal allowance.',
    NOT_ENOUGH_WAGERED_CRYPTO: 'You need to wager at least 50% of your deposits to be able to withdraw crypto.',
    ACCOUNT_LOCKED: 'Your account has been locked. Please contact support.',
    TRADE_QUALITY_FILTER: 'You need to set "Trade quality filter" to "None" on your Roblox.com privacy settings.',
    INVENTORY_PRIVACY: 'You need to set "Who can see my inventory?" to "Everyone" on your Roblox.com privacy settings.',
    TRADE_PRIVACY: 'You need to set "Who can trade with me?" to "Everyone" on your Roblox.com privacy settings.',
    MINES_MIN_BET: 'The minimum bet is R$10.',
    MINES_MAX_BET: 'The maximum bet is R$100.000.',
    MINES_GAME_ACTIVE: 'You already have an active game.',
    INVALID_MINES_COUNT: 'The amount of mines you entered is invalid.',
    NO_MINES_GAME_ACTIVE: "You don't have an active game.",
    ALREADY_REVEALED: 'This tile has already been revealed.',
    NO_REVEALED_TILES: 'You need to reveal at least one tile.',
}
