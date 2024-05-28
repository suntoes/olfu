import pg from 'pg'

const PGHOST = 'ep-sparkling-grass-a1it3naj.ap-southeast-1.aws.neon.tech'
const PGDATABASE = 'olfudb'
const PGUSER = 'olfudb_owner'
const PGPASSWORD = 'xMeqNzDK49vB'

export const postgres = new pg.Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: true,
})
