import { asyncHandler } from '../utils/asyncHandler.js';
import pool from '../config/db.js';

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await pool.query(`
        select * from users;
    `)
    
    res.status(200).json({
        success: true,
        message:'users data fecthed success',
        users: users.rows[0]
    })
})

export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await pool.query(`
        select * from users where id=$1
    `,[id]);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `No user with this id=${id}`
        })
    }

    return res.status(200).json({
        success:true,
        message: 'user found',
        user
    })
})

export const createUser = asyncHandler(async (req, res) => {
    const {name, mobile_no, email}=req.body;
    const result = await pool.query(`
        insert into users(name, mobile_no, email) values($1,$2,$3) returning *
    `,[name, mobile_no, email]);

    res.status(201).json({
        message: 'user created.',
        user: result.rows[0]
    })
})

export const updateUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const user = await pool.query(`select * from users where id=$1`,[id]);
    if(!user.rows.length){
        return res.status(404).json({
            message: `user not found with this ${id}`
        })
    }

    const {name, email, mobile_no} = req.body;
    
    const fields=[];
    const values=[];

    if(name){
        fields.push(`name=$${values.length+1}`);
        values.push(name);
    }

    if(email){
        fields.push(`email=$${values.length+1}`);
        values.push(email);
    }

    if(mobile_no){
        fields.push(`mobile_no=$${values.length+1}`);
        values.push(mobile_no);
    }

    values.push(id);

    const result = await pool.query(`
        update users
            set ${fields.join(',')}
        where id=$${values.length} returning *
    `,values)

    return res.status(201).json({
        success: true,
        message: 'user updated successfully.',
        user: result.rows[0]
    })
})