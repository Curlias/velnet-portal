export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { user, password, ap, mac, essid, cmd, url, ...otherParams } = req.body;

    const arubaUrl = 'https://10.0.0.60:4343/auth/index.html/u';

    const formData = new URLSearchParams();
    formData.append('user', user);
    formData.append('password', password);
    formData.append('cmd', cmd || 'authenticate');
    formData.append('url', url || 'http://www.msftconnecttest.com/redirect');
    
    if (ap) formData.append('ap', ap);
    if (mac) formData.append('mac', mac);
    if (essid) formData.append('essid', essid);
    
    Object.keys(otherParams).forEach(key => {
        if (otherParams[key]) {
            formData.append(key, otherParams[key]);
        }
    });

    try {
        const response = await fetch(arubaUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
            redirect: 'manual'
        });

        if (response.status === 302 || response.status === 301) {
            const location = response.headers.get('location');
            return res.redirect(302, location || url || 'http://www.msftconnecttest.com/redirect');
        }

        const text = await response.text();
        
        if (text.includes('Authentication failed') || text.includes('Invalid')) {
            return res.redirect(302, '/?error=1');
        }

        return res.redirect(302, url || 'http://www.msftconnecttest.com/redirect');

    } catch (error) {
        console.error('Error:', error);
        return res.redirect(302, '/?error=1');
    }
}
