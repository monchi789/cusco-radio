import { Router } from 'express';
import {  } from 'node-fetch';

const router = Router();


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
}); 

router.get('/blogs', (req, res) => {
    
    const url = 'http://localhost:3000/api/posts/';
    
    try {
        fetch(url)
        .then(res => res.json())
        .then(data => res.render('blogs', {post: data}));

    } catch (error) {
        console.log(error);
    }
});

export default router;