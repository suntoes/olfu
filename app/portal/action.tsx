'use server'

import { serverToast } from 'lib/actions'
import { cookies } from 'next/headers'
import { postgres } from 'app/db'

export const portalAction: any = async (formData: any) => {
    'use server'

    const confirmPassword = formData?.get('confirm-password')
    const password = formData?.get('password')
    const username = formData?.get('username')
    const portal = formData?.get('portal')
    const email = formData?.get('email')

    if (portal === 'join') {
        if (password !== confirmPassword) {
            serverToast('Confirmation', 'Password and confirm password are not the same', 'error')
        } else {
            try {
                const usernameQuery = await postgres.query(
                    `SELECT * FROM student_profiles WHERE username = $1 LIMIT 1;`,
                    [username],
                )
                const emailQuery = await postgres.query(`SELECT * FROM student_users WHERE email = $1 LIMIT 1;`, [
                    email,
                ])
                if (emailQuery.rows.length) {
                    serverToast('Invalid Email', 'This email is already used', 'error')
                } else if (usernameQuery.rows.length) {
                    serverToast('Invalid Username', 'This username is already used', 'error')
                } else {
                    const insertResult = await postgres.query(
                        `INSERT INTO student_users (email, password) VALUES ($1, $2) RETURNING *;`,
                        [email, password],
                    )
                    const profileResult = await postgres.query(
                        `INSERT INTO student_profiles (student_id, username) VALUES ($1, $2) RETURNING *;`,
                        [insertResult.rows[0].student_id, username],
                    )
                    const jwtResult = await postgres.query(`INSERT INTO jwt (student_id) VALUES ($1) RETURNING *;`, [
                        profileResult.rows[0].student_id,
                    ])
                    if (jwtResult.rows[0].id) cookies().set('jwt', jwtResult.rows[0].id)
                }
            } catch (e) {
                serverToast('Error', 'Something went wrong 01', 'error')
            }
        }
    } else if (portal === 'login') {
        try {
            const query = await postgres.query(`SELECT * FROM student_users WHERE email = $1 LIMIT 1;`, [email])

            if (!query.rows.length) serverToast('Confirmation', `Account doesn't exist`, 'error')
            else if (query.rows[0].password === password) {
                const jwtResult = await postgres.query(`INSERT INTO jwt (student_id) VALUES ($1) RETURNING *;`, [
                    query.rows[0].student_id,
                ])
                if (jwtResult.rows[0].id) cookies().set('jwt', jwtResult.rows[0].id)
                else serverToast('Error', 'Something went wrong 02', 'error')
            } else {
                serverToast('Confirmation', `Wrong password`, 'error')
            }
        } catch (e) {
            console.log(e)
            serverToast('Error', 'Something went wrong 03', 'error')
        }
    }

    return {}
}
