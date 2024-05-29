'use server'

import { postgres } from "app/db"
import { serverToast } from "lib/actions"
import { cookies } from "next/headers"

export const profileAction: any = async(formData: any) => {
    const jwt = cookies().get('jwt')?.value
    const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [jwt])
    const student_id = jwtQuery.rows[0].student_id
    

    const profile = {
        first_name: formData.get('first_name'),
        middle_name: formData.get('middle_name'),
        last_name: formData.get('last_name'),
        date_of_birth: new Date(formData.get('date_of_birth')).toISOString(),
        gender: formData.get('gender'),
        nationality: formData.get('nationality'),
        marital_status: formData.get('marital_status'),
        contact_no: formData.get('contact_no'),
        street: formData.get('street'),
        brgy: formData.get('brgy'),
        city: formData.get('city'),
        country: formData.get('country'),
        zipcode: formData.get('zipcode')
    }

    if(student_id) {
        const res = await postgres.query(`
            UPDATE student_profiles 
            SET ${Object.keys(profile).map((item, i) => `${item} = $${i + 2}`).join(', ')} 
            WHERE student_id = $1 
            RETURNING *;
        `, [student_id, ...Object.values(profile)])
        if(res.rows.length) {
            serverToast('Profile', 'Changes saved', 'success')
        } else {
            serverToast('Profile', `Couldn't save changes`, 'error')
        }
    }
}