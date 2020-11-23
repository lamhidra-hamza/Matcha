var express = require('express');
var router = express.Router();
var uuid = require('uuid');

let members = [
    {
        index: 1,
        name: 'aymen',
        email: 'aymen@gmail.com'
    },
    {
        index: 2,
        name: 'hamza',
        email: 'hamza@gmail.com'
    },
    {
        index: 3,
        name: 'zakaria',
        email: 'zakaria@gmail.com'
    },
    {
        index: 4,
        name: 'youness',
        email: 'youness@gmail.com'
    }
]

router.get('/', (req, res) => {
    res.json(members);
});

router.get('/:id', (req, res) => {
    const found = members.some(member => member.index === parseInt(req.params.id));
    {found ?
        res.json(members.filter(member => member.index === parseInt(req.params.id))) :
        res.status(400).json({msg: `Member not found with id == ${req.params.id}`})
    };
});


router.post('/', (req, res) => {
    const newMember = {
        index: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
    }

    if (!newMember.name || !newMember.email){
       return res.status(400).json({msg: "please include a name and email !"});
    }
    members.push(newMember);
    res.json(members);
});

router.delete('/:id', (req, res) => {
    const found = members.some(member => member.index === parseInt(req.params.id));
    {found ?
        res.json(members = members.filter(member => member.index !== parseInt(req.params.id))
        ) :
        res.status(400).json({msg: `Member not found with id == ${req.params.id}`})
    };
    console.log(members);
});

module.exports = router;