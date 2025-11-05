import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_KEY || ''
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { user, password, ...otherParams } = req.body;

    if (!user || !password) {
        return res.redirect(302, '/?error=1');
    }

    try {
        const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', user)
            .eq('active', true)
            .single();

        if (error || !userData) {
            console.log('Usuario no encontrado:', user);
            return res.redirect(302, '/?error=1');
        }

        const passwordMatch = await bcrypt.compare(password, userData.password);

        if (!passwordMatch) {
            console.log('Contraseña incorrecta para usuario:', user);
            return res.redirect(302, '/?error=1');
        }

        if (userData.expires_at && new Date(userData.expires_at) < new Date()) {
            console.log('Usuario expirado:', user);
            return res.redirect(302, '/?error=2');
        }

        await supabase
            .from('sessions')
            .insert({
                user_id: userData.id,
                username: user,
                mac_address: otherParams.mac || null,
                ap_name: otherParams.ap || null,
                connected_at: new Date().toISOString()
            });

        const redirectUrl = otherParams.url || 'http://www.msftconnecttest.com/redirect';
        return res.redirect(302, redirectUrl);

    } catch (error) {
        console.error('Error en autenticación:', error);
        return res.redirect(302, '/?error=1');
    }
}
