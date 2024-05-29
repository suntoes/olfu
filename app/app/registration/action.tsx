'use server'

import { postgres } from "app/db"
import { serverToast } from "lib/actions"
import { cookies } from "next/headers"

export const registerAction: any = async(formData: any) => {
    const jwt = cookies().get('jwt')?.value
    const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [jwt])
    const student_id = jwtQuery.rows[0].student_id
    
    const year_level = formData.get('year_level')
    const course = formData.get('course')

    if(!year_level) {
        serverToast('Registration', 'Please select year level', 'error')
    } else if (!course) {
        serverToast('Registration', 'Please pick a course', 'error')
    } else if (year_level && course && student_id) {
        const res = await postgres.query(`UPDATE student_profiles SET year_level = $1, course = $2 WHERE student_id = $3 RETURNING *;`, [year_level, course, student_id])
        if(res.rows.length) {
            serverToast('Registration', 'You are now enrolled to selected course', 'success')
        } else {
            serverToast('Registration', 'Something went wrong with enrollment', 'error')
        }
    }
}