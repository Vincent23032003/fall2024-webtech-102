const db = {
    articles: [
        {
            id: '1',
            title: 'My article',
            content: 'Content of the article.',
            date: '04/10/2022',
            author: 'Liz Gringer',
        },
        {
            id: '2',
            title: 'Second article',
            content: 'Another interesting content.',
            date: '05/10/2022',
            author: 'John Doe',
        },
    ],
    comments: [
        {
            id: '1',
            timestamp: 1664835049,
            content: 'Content of the comment.',
            articleId: '1',
            author: 'Bob McLaren',
        },
    ],
};

module.exports = db;
