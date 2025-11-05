export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { user, password } = req.body;

    const validUsers = {
        'admin': 'velnet2025',
        'usuario1': 'pass123',
        'guest': 'guest123'
    };

    if (validUsers[user] && validUsers[user] === password) {
        return res.redirect(302, 'http://www.msftconnecttest.com/redirect');
    } else {
        return res.redirect(302, '/?error=1');
    }
}
