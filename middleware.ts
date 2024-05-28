import { NextFetchEvent, NextRequest } from 'next/server'
import { authedAPI, parseTab } from 'lib/utils'
import { privatePaths, privateTabs, publicPaths, publicTabs } from 'lib/resources'
import { NextResponse } from 'next/server'
import { cookeys } from 'lib/resources'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    // Default to /_next stuffs
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.startsWith('/assets') ||
        req.nextUrl.pathname.startsWith('/api')
    )
        return NextResponse.next()

    // Middleware variables
    const params = new URLSearchParams(req.nextUrl.searchParams)
    const tab = parseTab(req.nextUrl.searchParams.get('tab'))
    const otpJwt = req.cookies.get(cookeys.OTP_JWT)?.value
    const token = req.nextUrl.searchParams.get('token')
    const otp = req.nextUrl.searchParams.get('otp')
    const jwt = req.cookies.get(cookeys.JWT)?.value

    if (!jwt && !req.nextUrl.pathname.startsWith('/portal'))
        return NextResponse.redirect(
            req.nextUrl.origin + '/portal' + (params.toString() ? `?${params.toString()}` : ''),
        )
    else if (jwt && req.nextUrl.pathname === '/app/post')
        return NextResponse.redirect(req.nextUrl.origin + '/app' + (params.toString() ? `?${params.toString()}` : ''))
    else if (jwt && !req.nextUrl.pathname.startsWith('/app'))
        return NextResponse.redirect(req.nextUrl.origin + '/app' + (params.toString() ? `?${params.toString()}` : ''))
    else return NextResponse.next()

    // Middleware variable cleanup
    if (jwt && (token || otp || otpJwt)) {
        params.delete('token')
        params.delete('otp')
        const res = nextRedirect()
        res.cookies.delete(cookeys.OTP_JWT)
        return res
    }

    // Instant login condition
    if (token && otp) {
        const data = await authedAPI('/auth/login/otp', 'POST', JSON.stringify({ otp }), false, `. ${token}`)
        params.delete('token')
        params.delete('otp')
        if (data?.error || !data?.token) {
            params.set('err', 'INSTANT_LOGIN_INVALID')
            return nextRedirect()
        }
        if (data?.firstLogin) params.set('note', 'FIRST_LOGIN')
        const res = nextRedirect()
        res.cookies.set(cookeys.JWT, data.token)
        return res
        // OTP session handler if otpJwt exists
    } else if (otpJwt) {
        if (['login', 'join', 'forgot', 'reset'].includes(tab.query)) {
            params.set('tab', 'otp')
            params.set('err', 'OTP_PROMPT')
            return nextRedirect()
        } else if (!req.headers.get('referer') && tab.query !== 'otp') {
            params.set('tab', 'otp')
            params.set('note', 'OTP_SENT')
            return nextRedirect()
        }
        // OTP tab handler w/ or w/o otpJwt
    } else if (!jwt && tab.query === 'otp') {
        if (!otpJwt) {
            params.set('tab', 'login')
            return nextRedirect()
        } else if (!params.has('note') && !params.has('err')) {
            params.set('note', 'OTP_SENT')
            return nextRedirect()
        }
    }

    // Path & tab restriction test
    const restricted = (jwt && !!publicTest().length) || (!jwt && !!privateTest().length)
    return restricted ? nextRedirect() : NextResponse.next()

    // Middleware dynamic utils
    function nextRedirect() {
        let pathname = ''
        const publics = publicTest()
        const privates = privateTest()

        if (jwt) {
            if (publics.includes('tab')) params.delete('tab')
            if (publics.includes('path')) pathname = '/'
        } else {
            if (privates.includes('tab')) params.delete('tab')
            if (privates.includes('path')) pathname = '/'
        }

        return NextResponse.redirect(
            req.nextUrl.origin +
                (pathname || req.nextUrl.pathname) +
                (params.toString() ? `?${params.toString()}` : ''),
        )
    }

    function publicTest() {
        return [
            publicTabs.includes(parseTab(params.get('tab')).query) ? 'tab' : '',
            publicPaths.includes(req.nextUrl.pathname) ? 'path' : '',
        ].filter((_) => _)
    }

    function privateTest() {
        return [
            privateTabs.includes(parseTab(params.get('tab')).query) ? 'tab' : '',
            privatePaths.includes(req.nextUrl.pathname) ? 'path' : '',
        ].filter((_) => _)
    }
}

export const config = {
    unstable_allowDynamic: [
        '/node_modules/.pnpm/engine.io-client@6.5.3/node_modules/engine.io-client/build/esm/globalThis.browser.js',
        '/node_modules/.pnpm/engine.io-client@6.5.3/node_modules/engine.io-client/build/esm/util.js',
        '/node_modules/.pnpm/engine.io-client@6.5.3/node_modules/engine.io-client/build/esm/index.js',
        '/node_modules/.pnpm/socket.io-client@4.7.5/node_modules/socket.io-client/build/esm/url.js',
        '/node_modules/.pnpm/socket.io-client@4.7.5/node_modules/socket.io-client/build/esm/index.js',
    ],
}
