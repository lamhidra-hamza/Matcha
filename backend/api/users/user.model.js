var connection = require("../../utils/db");
var uuid = require("uuid");
const bcrypt = require("bcrypt");
const e = require("express");

class User {

    async create(data) {
        let info = {
            id: uuid.v4(),
            username: data.username,
            email: data.email,
            password: await bcrypt.hash(data.password, 11),
            biography: "",
            gender: "men",
            job: "",
            firstName: data.firstName,
            lastName: data.lastName,
            minAge: 18,
            maxAge: 30,
            maxDistance: 150,
            lastConnection: new Date().toISOString().slice(0, 19).replace("T", " "),
            lastNotification: new Date().toISOString().slice(0, 19).replace("T", " "),
            interessted: "both",
            verified: false,
            infoCompleted: false,
            bornDate: data.bornDate.slice(0, 19).replace("T", " "),
            frameRate: 1
        };
        await connection.promise().query("INSERT INTO users SET ?", info);

        return { id: info.id };
    }

    async updateRefreshToken(userId, refreshToken) {
        const sql = `UPDATE users SET
            refreshToken = '${refreshToken}'
            WHERE id = '${userId}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }


    async findall(userId, filters) {
        let joinTagsTable = '';
        let tagsQuery = '';
        let tagsCount = '';
        let filterGender = '';
        let n_tags = '';
        let orderBy = '';
        let limit = filters.numberOfItem * filters.page;
        let distanceBetween = `CEILING(111.111 *
            DEGREES(ACOS(LEAST(1.0, COS(RADIANS((SELECT location.latitude from location WHERE location.user_id = '${userId}')))
             * COS(RADIANS(location.latitude))
             * COS(RADIANS((SELECT location.longitude from location WHERE location.user_id = '${userId}') - location.longitude))
             + SIN(RADIANS((SELECT location.latitude from location WHERE location.user_id = '${userId}')))
             * SIN(RADIANS(location.latitude)))))) AS distance_in_km`
        const injectedString = filters.tags ? filters.tags.map(c => `'${c}'`).join(', ') : '';
        if (filters.sortedBy === 'distance')
            orderBy = 'ORDER by distance_in_km';
        if (filters.sortedBy === 'age')
            orderBy = 'ORDER by age';
        if (filters.sortedBy === 'frameRate')
            orderBy = '';

        if (filters.tags && filters.tags != []) {
            joinTagsTable = `INNER JOIN tags ON tags.user_id=users.id
            INNER JOIN tag_content ON tag_content.id=tags.tag_id `;
            tagsQuery = `AND tag_content.tag IN (${injectedString}) `;
            tagsCount = `AND COUNT(tag) > 0 `;
            n_tags = `COUNT(tag) as n_tags,`
            if (filters.sortedBy === 'tags')
                orderBy = 'ORDER by n_tags DESC';
        }

        if (filters.interessted === 'both' && filters.gender === 'man')
            filterGender = `WHERE (users.gender='woman' OR users.gender='man')
                AND (users.interessted='both' OR users.interessted='men')`;
        if (filters.interessted === 'both' && filters.gender === 'woman')
            filterGender = `WHERE (users.gender='woman' OR users.gender='man')
                AND (users.interessted='both' OR users.interessted='women')`;
        if (filters.interessted === 'men' && filters.gender === 'man')
            filterGender = `WHERE users.gender='man' AND
                (users.interessted='both' OR users.interessted='men')`;
        if (filters.interessted === 'women' && filters.gender === 'man')
            filterGender = `WHERE users.gender='woman' AND
                (users.interessted='both' OR users.interessted='men')`;
        if (filters.interessted === 'women' && filters.gender === 'woman')
            filterGender = `WHERE users.gender='woman' AND
                (users.interessted='both' OR users.interessted='women')`;
        if (filters.interessted === 'men' && filters.gender === 'woman')
            filterGender = `WHERE users.gender='man' AND
                (users.interessted='both' OR users.interessted='women')`;


        const joinTablesQuery = `SELECT users.id,
                    users.firstName,
                    TIMESTAMPDIFF (YEAR, users.bornDate, CURDATE()) AS age,
                    pictures.picture_1,
                    location.longitude,
                    location.latitude,
                    users.frameRate as rate,
                    ${n_tags}
                    ${distanceBetween}
                    from users
                    ${joinTagsTable}
                    INNER JOIN pictures ON pictures.user_id=users.id
                    INNER JOIN location ON location.user_id=users.id
                    ${filterGender} `;


        const sql = `${joinTablesQuery} ${tagsQuery} 
                     GROUP BY users.id, pictures.picture_1, users.firstName, location.longitude, location.latitude
                    HAVING age BETWEEN ${filters.minAge} AND ${filters.maxAge}
                    AND distance_in_km < ${filters.maxDistance} AND rate >= ${filters.frameRate}
                    ${tagsCount}
                    AND users.id !='${userId}'
                    AND users.id NOT IN (SELECT liked_user FROM likes WHERE user_id='${userId}')
                    AND users.id NOT IN (SELECT blocked_user FROM block WHERE user_id='${userId}')
                    ${orderBy}
                    LIMIT ${limit}, ${filters.numberOfItem} `;

        console.log(sql);
        const [result, fields] = await connection
            .promise()
            .query(sql);
        return result;
    }

    async findOneInfoCard(userId, id) {
        let distanceBetween = `CEILING(111.111 *
            DEGREES(ACOS(LEAST(1.0, COS(RADIANS((SELECT location.latitude from location WHERE location.user_id = '${userId}')))
             * COS(RADIANS(location.latitude))
             * COS(RADIANS((SELECT location.longitude from location WHERE location.user_id = '${userId}') - location.longitude))
             + SIN(RADIANS((SELECT location.latitude from location WHERE location.user_id = '${userId}')))
             * SIN(RADIANS(location.latitude)))))) AS distance_in_km`

        const sql = `SELECT users.id,
            users.firstName,
            TIMESTAMPDIFF (YEAR, users.bornDate, CURDATE()) AS age,
            location.longitude,
            location.latitude,
            users.biography,
            users.frameRate as rate,
            pictures.picture_1,
            pictures.picture_2,
            pictures.picture_3,
            pictures.picture_4,
            pictures.picture_5,
            ${distanceBetween}
            FROM users
            
            INNER JOIN pictures ON pictures.user_id=users.id
            INNER JOIN location ON location.user_id=users.id
            
            WHERE users.id = '${id}'
            `;

        const [result, fields] = await connection
            .promise()
            .query(sql);
        return result;
    }


    async findallLikedMe(userId, filters) {
        const limit = filters.numberOfItem * filters.page;
        const sql = `SELECT users.id,
            users.firstName,
            TIMESTAMPDIFF (YEAR, users.bornDate, CURDATE()) AS age,
            pictures.picture_1,
            location.longitude,
            location.latitude,

            CEILING(111.111 *
            DEGREES(ACOS(LEAST(1.0, COS(RADIANS((SELECT location.latitude from location WHERE location.user_id = '${userId}')))
            * COS(RADIANS(location.latitude))
            * COS(RADIANS((SELECT location.longitude from location WHERE location.user_id = '${userId}') - location.longitude))
            + SIN(RADIANS((SELECT location.latitude from location WHERE location.user_id = '${userId}')))
            * SIN(RADIANS(location.latitude)))))) AS distance_in_km
            from users

            INNER JOIN pictures ON pictures.user_id=users.id
            INNER JOIN location ON location.user_id=users.id
            INNER JOIN likes ON likes.user_id=users.id
                                            
            GROUP BY users.id, pictures.picture_1, users.firstName, location.longitude, location.latitude, age
                                
            HAVING users.id !='${userId}'
            AND users.id NOT IN (SELECT blocked_user FROM block WHERE user_id='${userId}')
            AND '${userId}' IN (SELECT liked_user FROM likes WHERE user_id=users.id)
            LIMIT ${limit}, ${filters.numberOfItem} `;

        const [result, fields] = await connection
            .promise()
            .query(sql);
        return result;
    }

    async findallViewedMe(userId, filters) {
        const limit = filters.numberOfItem * filters.page;
        const sql = `SELECT users.id,
            users.firstName,
            TIMESTAMPDIFF (YEAR, users.bornDate, CURDATE()) AS age,
            pictures.picture_1,
            location.longitude,
            location.latitude,

            CEILING(111.111 *
            DEGREES(ACOS(LEAST(1.0, COS(RADIANS((SELECT location.latitude from location WHERE location.user_id = '${userId}')))
            * COS(RADIANS(location.latitude))
            * COS(RADIANS((SELECT location.longitude from location WHERE location.user_id = '${userId}') - location.longitude))
            + SIN(RADIANS((SELECT location.latitude from location WHERE location.user_id = '${userId}')))
            * SIN(RADIANS(location.latitude)))))) AS distance_in_km
            from users

            INNER JOIN pictures ON pictures.user_id=users.id
            INNER JOIN location ON location.user_id=users.id

            GROUP BY users.id, pictures.picture_1, users.firstName, location.longitude, location.latitude, age
                                
            HAVING users.id !='${userId}'
            AND users.id NOT IN (SELECT blocked_user FROM block WHERE user_id='${userId}')
            AND '${userId}' IN (SELECT viewed_user FROM views WHERE user_id=users.id)
            LIMIT ${limit}, ${filters.numberOfItem} `;

        // console.log(sql);

        const [result, fields] = await connection
            .promise()
            .query(sql);
        return result;
    }


    async findOneById(userId) {
        const [result, fields] = await connection
            .promise()
            .query(`SELECT * FROM users INNER JOIN pictures on pictures.user_id = users.id WHERE users.id = '${userId}'`);
        return result;
    }

    async findOne(userId, id) {
        const sql = `SELECT * FROM users WHERE id='${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneByEmail(userId, email) {
        const sql = userId ? `SELECT * FROM users WHERE id='${userId}'` : `SELECT * FROM users WHERE email='${email}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }

    async findOneAndUpdate(userId, id, data) {
        const sql = `UPDATE users SET ? WHERE id = '${id}'`;
        const info = {
            username: data.username,
            email: data.email,
            password: data.password,
            biography: data.biography,
            gender: data.gender,
            interessted: data.interessted,
            firstName: data.firstName,
            lastName: data.lastName,
            minAge: data.minAge,
            maxAge: data.maxAge,
            maxDistance: data.maxDistance,
            refreshToken: data.refreshToken,
            verified: data.verified,
            job: data.job,
        }
        const [result, filed] = await connection.promise().query(sql, info);
        return result;
    }

    async findOneAndRemove(userId, id) {
        const sql = `DELETE FROM users WHERE id = '${id}'`;
        const [result, filed] = await connection.promise().query(sql);
        return result;
    }
}

module.exports = new User();