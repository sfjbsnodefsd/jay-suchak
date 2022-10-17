const {
    add,
    app
} = require('../app');
const request = require('supertest')
test('toBe', () => {
    expect(add(1, 2)).toBe(3)
})


test('toEqual', () => {
    expect(add(1, 2)).toEqual(3)
})

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

describe('Get Test Endpoints', () => {
    it('should get data test', async () => {
        const res = await request(app)
            .get('/test')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatch(/hello world/)
    })
})

describe('Get test subject Endpoints', () => {
    it('should get data test subject', async () => {
        const res = await request(app)
            .get('/test/subject')
            // .send({
            //     userId: 1,
            //     title: 'test is cool',
            // })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(['hello', 'world'])
    })
})